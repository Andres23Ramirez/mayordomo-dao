'use client';

import { useRouter } from 'next/navigation';
import Navbar from './components/Navbar';
import Link from 'next/link';
import { useAccount } from 'wagmi';

export default function Home() {
  const router = useRouter();
  const { address } = useAccount();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <div className="flex flex-col min-h-screen">
          {/* Hero Section */}
          <section className="relative h-[calc(100vh-4rem)] flex items-center">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center">
              <div className="absolute inset-0 bg-black/50" />
            </div>
            
            <div className="container mx-auto px-4 relative">
              <div className="max-w-3xl">
                <h1 className="text-6xl font-bold text-background mb-6">
                  Invierte en el Futuro del Campo Colombiano
                </h1>
                <p className="text-xl text-background/90 mb-8">
                  Conectamos inversores con proyectos agrícolas sostenibles. 
                  Apoya directamente a los agricultores y participa en el crecimiento del sector rural.
                </p>
                <div className="flex gap-4 items-center">
                  <Link 
                    href="/proyectos" 
                    className="bg-colombia-green text-background px-8 py-4 rounded-lg text-lg font-medium hover:bg-colombia-yellow hover:text-colombia-green transition-colors"
                  >
                    Ver todos los proyectos
                  </Link>
                  <div className="relative">
                    {address ? (
                      <Link 
                        href="/proyectos?create=true" 
                        className="bg-colombia-yellow text-colombia-green px-8 py-4 rounded-lg text-lg font-medium hover:bg-background transition-colors"
                      >
                        Crear Proyecto
                      </Link>
                    ) : (
                      <span className="bg-background text-colombia-green px-8 py-4 rounded-lg text-lg font-medium">
                        Conecta tu wallet para crear un proyecto
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section className="bg-background px-4 py-16">
            <div className="container mx-auto">
              <h2 className="text-4xl font-bold text-foreground mb-2">Proyectos Destacados</h2>
              <p className="text-muted-foreground mb-8">Descubre iniciativas agrícolas que están transformando el campo colombiano</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Proyecto 1 */}
                <div className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <div className="h-48 bg-[url('/images/cafe.png')] bg-cover bg-center" />
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <span className="bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full">Café</span>
                      <span className="ml-2 text-sm text-muted-foreground">Huila</span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Café Especial Alto de los Andes</h3>
                    <p className="text-muted-foreground mb-4">Producción de café especial a 1,800 msnm por la cooperativa de caficultores del Alto Huila.</p>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">Meta de inversión</p>
                        <p className="text-lg font-bold text-foreground">15 ETH</p>
                      </div>
                      <Link 
                        href="/proyectos/1"
                        className="bg-colombia-green text-background px-4 py-2 rounded-lg hover:bg-colombia-yellow hover:text-colombia-green transition-colors"
                      >
                        Ver detalles
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Proyecto 2 */}
                <div className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <div className="h-48 bg-[url('/images/aguacate.png')] bg-cover bg-center" />
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <span className="bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full">Aguacate</span>
                      <span className="ml-2 text-sm text-muted-foreground">Antioquia</span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Aguacate Hass Premium</h3>
                    <p className="text-muted-foreground mb-4">Cultivo tecnificado de aguacate Hass para exportación por la asociación de agricultores de Urrao.</p>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">Meta de inversión</p>
                        <p className="text-lg font-bold text-foreground">20 ETH</p>
                      </div>
                      <Link 
                        href="/proyectos/2"
                        className="bg-colombia-green text-background px-4 py-2 rounded-lg hover:bg-colombia-yellow hover:text-colombia-green transition-colors"
                      >
                        Ver detalles
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Proyecto 3 */}
                <div className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <div className="h-48 bg-[url('/images/cacao.png')] bg-cover bg-center" />
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <span className="bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full">Cacao</span>
                      <span className="ml-2 text-sm text-muted-foreground">Santander</span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Cacao Orgánico del Magdalena</h3>
                    <p className="text-muted-foreground mb-4">Producción de cacao fino de aroma certificado orgánico por familias cacaoteras de San Vicente.</p>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">Meta de inversión</p>
                        <p className="text-lg font-bold text-foreground">12 ETH</p>
                      </div>
                      <Link 
                        href="/proyectos/3"
                        className="bg-colombia-green text-background px-4 py-2 rounded-lg hover:bg-colombia-yellow hover:text-colombia-green transition-colors"
                      >
                        Ver detalles
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center mt-12">
                <Link 
                  href="/proyectos"
                  className="bg-colombia-green text-background font-semibold px-8 py-3 rounded-lg hover:bg-colombia-yellow hover:text-colombia-green transition-all duration-300 inline-flex items-center"
                >
                  Ver todos los proyectos
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </Link>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section className="bg-colombia-green px-4 py-16 patron-wave">
            <div className="container mx-auto max-w-6xl">
              <div className="flex flex-col items-center text-center">
                <h2 className="text-3xl md:text-5xl font-bold text-background mb-6">
                  Mayordomo
                </h2>
                <p className="text-xl text-background max-w-2xl mb-8">
                  Somos una plataforma que conecta agricultores colombianos con inversionistas 
                  comprometidos con el desarrollo rural. A través de nuestra tecnología blockchain, 
                  garantizamos transparencia y seguridad en cada inversión.
                </p>
                <a
                  href="mailto:contacto@mayordomo.com"
                  className="bg-colombia-yellow text-colombia-green font-semibold px-8 py-3 rounded-lg hover:bg-background hover:text-colombia-green transition-all duration-300"
                >
                  Contáctanos
                </a>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-colombia-yellow px-4 py-16">
            <div className="container mx-auto max-w-6xl">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-8 md:mb-0">
                  <h2 className="text-3xl md:text-4xl font-bold text-colombia-green mb-4">
                    ¿Listo para ser parte del cambio?
                  </h2>
                  <p className="text-xl text-colombia-green">
                    Regístrate gratis y comienza a invertir en el campo colombiano
                  </p>
                </div>
                <button
                  onClick={() => router.push('/proyectos')}
                  className="bg-colombia-green text-background font-semibold px-8 py-3 rounded-lg hover:bg-background hover:text-colombia-green transition-all duration-300"
                >
                  Comenzar Ahora
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* WhatsApp Button */}
      <div style={{ position: 'fixed', bottom: '25px', right: '25px', zIndex: 100 }}>
        <div style={{
          position: 'absolute',
          right: '70px',
          backgroundColor: '#333',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '4px',
          fontSize: '14px',
          whiteSpace: 'nowrap',
          opacity: 0,
          transition: 'opacity 0.3s ease',
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
        }}>
          Contáctanos por WhatsApp
        </div>
        <a
          href="https://wa.me/573117296555?text=Hola%20Lucho%2C%20%C2%BFpodr%C3%ADas%20ayudarme%3F"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: 'fixed',
            bottom: '25px',
            right: '25px',
            zIndex: 100,
            backgroundColor: '#25D366',
            color: 'white',
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
            transition: 'all 0.3s ease',
            padding: '10px'
          }}
          aria-label="Contactar por WhatsApp"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ width: '100%', height: '100%', fill: 'white' }}>
            <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.274-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345m-5.446 7.443h-.016c-1.77 0-3.524-.48-5.055-1.38l-.36-.214-3.75.975 1.005-3.645-.239-.375c-.99-1.576-1.516-3.391-1.516-5.26 0-5.445 4.455-9.885 9.942-9.885 2.654 0 5.145 1.035 7.021 2.91 1.875 1.859 2.909 4.35 2.909 6.99-.004 5.444-4.46 9.885-9.935 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.495-8.411" />
          </svg>
        </a>
      </div>

      {/* Footer */}
      <footer className="bg-colombia-green text-background px-4 py-8 patron-ruana">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p>&copy; 2024 Mayordomo. Todos los derechos reservados.</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-colombia-yellow transition-colors duration-300">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="hover:text-colombia-yellow transition-colors duration-300">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="hover:text-colombia-yellow transition-colors duration-300">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
