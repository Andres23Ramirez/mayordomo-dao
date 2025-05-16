import { useEffect, useState, useRef } from 'react';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';

interface ProjectMapProps {
  location: string;
}

const containerStyle = {
  width: '100%',
  height: '300px'
};

const defaultCenter = { lat: 4.5709, lng: -74.2973 }; // Colombia

const mapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: true,
  streetViewControl: false,
  rotateControl: false,
  fullscreenControl: true,
  styles: [
    {
      featureType: 'all',
      elementType: 'all',
      stylers: [
        { saturation: -100 },
        { lightness: 0 }
      ]
    }
  ]
};

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

export default function ProjectMap({ location }: ProjectMapProps) {
  const [coordinates, setCoordinates] = useState(defaultCenter);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  const { isLoaded, loadError: scriptLoadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
    preventGoogleFontsLoading: true,
    version: "weekly"
  });

  useEffect(() => {
    const geocodeLocation = async () => {
      if (!location) return;
      
      try {
        console.log('Geocoding location:', location);
        console.log('Using API Key:', GOOGLE_MAPS_API_KEY.substring(0, 8) + '...');
        
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location + ', Colombia')}&key=${GOOGLE_MAPS_API_KEY}`
        );
        
        if (!response.ok) {
          throw new Error(`Error de HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Geocoding response:', data);
        
        if (data.status === 'REQUEST_DENIED') {
          throw new Error('La clave de API no tiene acceso al servicio de Geocoding');
        }
        
        if (data.status !== 'OK') {
          throw new Error(`Error de Geocoding: ${data.status}`);
        }
        
        if (data.results && data.results[0]) {
          const { lat, lng } = data.results[0].geometry.location;
          setCoordinates({ lat, lng });
        } else {
          setLoadError('No se encontró la ubicación especificada');
        }
      } catch (error) {
        console.error('Error geocoding location:', error);
        setLoadError(typeof error === 'string' ? error : (error as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    geocodeLocation();
  }, [location]);

  const onLoad = (map: google.maps.Map) => {
    mapRef.current = map;
  };

  const onUnmount = () => {
    mapRef.current = null;
  };

  if (scriptLoadError) {
    return (
      <div className="h-[300px] flex items-center justify-center bg-card rounded-lg">
        <p className="text-red-500">Error al cargar el mapa: {String(scriptLoadError)}</p>
      </div>
    );
  }

  if (!isLoaded || isLoading) {
    return (
      <div className="h-[300px] flex items-center justify-center bg-card rounded-lg">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-colombia-green"></div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="h-[300px] flex items-center justify-center bg-card rounded-lg">
        <p className="text-red-500">{loadError}</p>
      </div>
    );
  }

  return (
    <div className="relative rounded-lg overflow-hidden">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={coordinates}
        zoom={8}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={mapOptions}
      >
        <MarkerF
          position={coordinates}
          icon={{
            url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
            scaledSize: new window.google.maps.Size(40, 40)
          }}
        />
      </GoogleMap>
    </div>
  );
} 