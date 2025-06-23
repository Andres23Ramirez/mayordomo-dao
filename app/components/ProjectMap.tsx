'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

interface ProjectMapProps {
  location: string;
}

const defaultCenter = { lat: 4.5709, lng: -74.2973 }; // Colombia

const ProjectMapLeaflet = dynamic(() => import('./ProjectMapLeaflet'), {
  ssr: false,
});

// Normaliza errores comunes de ortografía en departamentos/ciudades
function normalizeLocation(location: string) {
  return location
    .replace(/Qundio/gi, 'Quindío')
    .replace(/Quindio/gi, 'Quindío')
    // Puedes agregar más reemplazos aquí si lo necesitas
}

export default function ProjectMap({ location }: ProjectMapProps) {
  const [coordinates, setCoordinates] = useState(defaultCenter);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    const geocodeLocation = async () => {
      if (!location) {
        setCoordinates(defaultCenter);
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      setLoadError(null);

      // Intenta con la dirección completa, luego con menos detalles si falla
      const attempts = [
        normalizeLocation(location),
        normalizeLocation(location.split(',').slice(1).join(',')),
        normalizeLocation(location.split(',').slice(2).join(',')),
      ];

      let found = false;
      for (const attempt of attempts) {
        const query = attempt.trim();
        if (!query) continue;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
          );
          if (!response.ok) continue;
          const data = await response.json();
          if (data && data.length > 0) {
            const { lat, lon } = data[0];
            setCoordinates({ lat: parseFloat(lat), lng: parseFloat(lon) });
            found = true;
            break;
          }
        } catch (e) {
          // ignora y prueba el siguiente intento
        }
      }
      if (!found) {
        setLoadError('No se encontró la ubicación especificada');
      }
      setIsLoading(false);
    };
    geocodeLocation();
  }, [location]);

  if (isLoading) {
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
    <ProjectMapLeaflet coordinates={coordinates} location={location} />
  );
} 