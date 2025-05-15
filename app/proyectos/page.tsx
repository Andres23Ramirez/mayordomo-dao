'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useFarmingProjects } from '../hooks/useFarmingProjects';
import Navbar from "../components/Navbar";
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { formatEther } from 'viem';

export default function ProjectsPage() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { address } = useAccount();
  const { loading, error, projectDetails, createNewProject, investInProjectFn } = useFarmingProjects();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get('create') === 'true' && address) {
      setShowCreateForm(true);
    }
  }, [searchParams, address]);

  const handleCreateProject = async (formData: FormData) => {
    try {
      const title = formData.get('title') as string;
      const description = formData.get('description') as string;
      const location = formData.get('location') as string;
      const imageUrl = formData.get('imageUrl') as string;
      const targetAmount = BigInt(formData.get('targetAmount') as string);

      await createNewProject(title, description, location, imageUrl, targetAmount);
      setShowCreateForm(false);
      // Aquí podrías agregar una notificación de éxito
    } catch (error) {
      console.error('Error al crear el proyecto:', error);
      // Aquí podrías agregar una notificación de error
    }
  };

  const handleInvest = async (projectId: number, amount: bigint) => {
    await investInProjectFn(projectId, amount);
  };

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Projects Header */}
      <section className="bg-colombia-green px-4 py-16">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-5xl font-bold text-background mb-4">Proyectos Agrícolas</h1>
              <p className="text-background/90 text-xl max-w-2xl">
                Descubre y apoya iniciativas agrícolas que están transformando el campo colombiano. 
                Cada proyecto representa una oportunidad única de inversión y desarrollo rural.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Create Project Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-background rounded-xl p-8 max-w-2xl w-full">
            <h2 className="text-2xl font-bold text-foreground mb-6">Crear Nuevo Proyecto</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleCreateProject(new FormData(e.currentTarget));
            }}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-foreground mb-1">
                    Título del Proyecto
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground"
                    placeholder="Ej: Café Especial Alto de los Andes"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-foreground mb-1">
                    Descripción
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground"
                    placeholder="Describe tu proyecto agrícola..."
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-foreground mb-1">
                    Ubicación
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground"
                    placeholder="Ej: Huila"
                  />
                </div>

                <div>
                  <label htmlFor="imageUrl" className="block text-sm font-medium text-foreground mb-1">
                    URL de la Imagen
                  </label>
                  <input
                    type="url"
                    id="imageUrl"
                    name="imageUrl"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground"
                    placeholder="https://ejemplo.com/imagen.jpg"
                  />
                </div>

                <div>
                  <label htmlFor="targetAmount" className="block text-sm font-medium text-foreground mb-1">
                    Meta de Inversión (ETH)
                  </label>
                  <input
                    type="number"
                    id="targetAmount"
                    name="targetAmount"
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground"
                    placeholder="15"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-8">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="px-6 py-2 rounded-lg border border-border text-foreground hover:bg-card transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-colombia-green text-background hover:bg-colombia-yellow hover:text-colombia-green transition-colors"
                >
                  Crear Proyecto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Projects Grid */}
      <section className="bg-background px-4 py-16">
        <div className="container mx-auto">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-colombia-green"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500">{error}</p>
            </div>
          ) : projectDetails.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No hay proyectos disponibles aún.</p>
              {address && (
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="mt-4 bg-colombia-green text-background px-6 py-3 rounded-lg hover:bg-colombia-yellow hover:text-colombia-green transition-colors"
                >
                  Crear el primer proyecto
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectDetails.map((project, index) => (
                <div key={index} className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <div 
                    className="h-48 bg-cover bg-center" 
                    style={{ backgroundImage: `url(${project.imageUrl})` }}
                  />
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <span className="bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full">
                        {project.location}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{project.title}</h3>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">Meta de inversión</p>
                        <p className="text-lg font-bold text-foreground">
                          {formatEther(project.targetAmount)} ETH
                        </p>
                      </div>
                      <Link 
                        href={`/proyectos/${index + 1}`}
                        className="bg-colombia-green text-background px-4 py-2 rounded-lg hover:bg-colombia-yellow hover:text-colombia-green transition-colors"
                      >
                        Ver detalles
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
} 