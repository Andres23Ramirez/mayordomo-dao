'use client';

import { useParams } from 'next/navigation';
import Navbar from "../../components/Navbar";
import { useFarmingProjects } from '../../hooks/useFarmingProjects';
import { formatEther } from 'viem';

export default function ProjectPage() {
  const params = useParams();
  const projectId = typeof params.id === 'string' ? parseInt(params.id) : 0;
  const { loading, error, projectDetails, investInProjectFn } = useFarmingProjects();

  // Encontrar el proyecto correcto usando el ID
  const project = projectDetails.find(p => p.id === projectId);

  if (loading) {
    return (
      <main className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-16 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-colombia-green mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Cargando proyecto...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error || !project) {
    return (
      <main className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-foreground">
            {error ? 'Error al cargar el proyecto' : 'Proyecto no encontrado'}
          </h1>
          <p className="text-muted-foreground mt-4">
            {error || 'El proyecto que buscas no existe o ha sido eliminado.'}
          </p>
        </div>
      </main>
    );
  }

  const handleInvest = async () => {
    try {
      const result = await investInProjectFn(projectId, project.targetAmount);
      if (result) {
        alert('Inversión realizada con éxito');
      }
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
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${project.imageUrl})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <div className="flex items-center mb-4">
                <span className="bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full backdrop-blur-sm">
                  Agricultura
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

                <div className="mt-8">
                  <h3 className="text-xl font-bold text-foreground mb-4">Detalles Adicionales</h3>
                  <div className="space-y-6">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Creador del Proyecto</p>
                      <p className="text-foreground font-mono text-sm break-all">{project.owner}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Estado</p>
                      <p className="text-foreground">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${
                          project.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {project.isActive ? 'Activo' : 'Inactivo'}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-lg p-6 border border-border">
                <h3 className="text-xl font-bold text-foreground mb-4">Detalles de Inversión</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Meta de inversión</p>
                    <p className="text-3xl font-bold text-foreground">
                      {formatEther(project.targetAmount)} ETH
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Inversión actual</p>
                    <p className="text-xl font-bold text-foreground">
                      {formatEther(project.currentAmount)} ETH
                    </p>
                    <div className="w-full bg-muted rounded-full h-2 mt-2">
                      <div
                        className="bg-colombia-green h-2 rounded-full"
                        style={{
                          width: `${Math.min(
                            (Number(project.currentAmount) / Number(project.targetAmount)) * 100,
                            100
                          )}%`
                        }}
                      />
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleInvest}
                  disabled={!project.isActive}
                  className={`w-full mt-6 py-3 px-4 rounded-lg font-medium transition-colors
                    ${project.isActive
                      ? 'bg-colombia-green text-background hover:bg-colombia-yellow hover:text-colombia-green'
                      : 'bg-muted text-muted-foreground cursor-not-allowed'}`}
                >
                  {project.isActive ? 'Invertir en este proyecto' : 'Proyecto no disponible'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 