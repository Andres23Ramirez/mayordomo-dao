'use client';

import { useParams } from 'next/navigation';
import Navbar from "../../components/Navbar";
import { useFarmingProjects } from '../../hooks/useFarmingProjects';

// Datos de ejemplo - En producción esto vendría de la blockchain o una API
const projectsData = {
  1: {
    title: "Café Especial Alto de los Andes",
    type: "Café",
    location: "Huila",
    description: "Producción de café especial a 1,800 msnm por la cooperativa de caficultores del Alto Huila.",
    targetAmount: "15 ETH",
    image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=800&q=80"
  },
  2: {
    title: "Aguacate Hass Premium",
    type: "Aguacate",
    location: "Antioquia",
    description: "Cultivo tecnificado de aguacate Hass para exportación por la asociación de agricultores de Urrao.",
    targetAmount: "20 ETH",
    image: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80"
  },
  3: {
    title: "Cacao Orgánico del Magdalena",
    type: "Cacao",
    location: "Santander",
    description: "Producción de cacao fino de aroma certificado orgánico por familias cacaoteras de San Vicente.",
    targetAmount: "12 ETH",
    image: "https://images.unsplash.com/photo-1589923158776-cb4485d99fd6?auto=format&fit=crop&w=800&q=80"
  },
  4: {
    title: "Flores del Amanecer",
    type: "Flores",
    location: "Cundinamarca",
    description: "Cultivo sostenible de flores exóticas para exportación por la cooperativa floricultora de la Sabana.",
    targetAmount: "18 ETH",
    image: "https://images.unsplash.com/photo-1595475207225-428b62bda831?auto=format&fit=crop&w=800&q=80"
  },
  5: {
    title: "Frutas del Pacífico",
    type: "Frutas",
    location: "Valle del Cauca",
    description: "Producción de frutas tropicales orgánicas por la asociación de agricultores del Valle.",
    targetAmount: "25 ETH",
    image: "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80"
  },
  6: {
    title: "Arrozales del Tolima",
    type: "Arroz",
    location: "Tolima",
    description: "Cultivo tecnificado de arroz premium por la cooperativa arrocera del Tolima Grande.",
    targetAmount: "30 ETH",
    image: "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&w=800&q=80"
  }
};

export default function ProjectPage() {
  const params = useParams();
  const projectId = typeof params.id === 'string' ? parseInt(params.id) : 0;
  const project = projectsData[projectId as keyof typeof projectsData];
  const { investInProjectFn } = useFarmingProjects();

  if (!project) {
    return (
      <main className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-foreground">Proyecto no encontrado</h1>
        </div>
      </main>
    );
  }

  const handleInvest = async () => {
    // Aquí implementarías la lógica de inversión
    try {
      await investInProjectFn(projectId, BigInt(project.targetAmount));
      alert('Inversión realizada con éxito');
    } catch (error) {
      console.error('Error al invertir:', error);
      alert('Error al realizar la inversión');
    }
  };

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="bg-card rounded-xl overflow-hidden shadow-xl">
          <div className="h-96 relative">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${project.image})` }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <div className="flex items-center mb-4">
                <span className="bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full backdrop-blur-sm">
                  {project.type}
                </span>
                <span className="ml-2 text-sm text-background/90">{project.location}</span>
              </div>
              <h1 className="text-5xl font-bold text-background mb-2">{project.title}</h1>
            </div>
          </div>
          
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold text-foreground mb-4">Descripción del Proyecto</h2>
                <p className="text-muted-foreground text-lg">{project.description}</p>
              </div>
              
              <div className="bg-card rounded-lg p-6 border border-border">
                <h3 className="text-xl font-bold text-foreground mb-4">Detalles de Inversión</h3>
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground">Meta de inversión</p>
                  <p className="text-3xl font-bold text-foreground">{project.targetAmount}</p>
                </div>
                <button
                  onClick={handleInvest}
                  className="w-full bg-colombia-green text-background py-3 px-4 rounded-lg hover:bg-colombia-yellow hover:text-colombia-green transition-colors font-medium"
                >
                  Invertir en este proyecto
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 