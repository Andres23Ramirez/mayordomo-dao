'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useFarmingProjects, type ProjectDetails } from '../hooks/useFarmingProjects';
import Navbar from "../components/Navbar";
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { formatEther, parseEther } from 'viem';
import ProjectMap from '../components/ProjectMap';
import { MapPin } from "lucide-react";
import Image from 'next/image';
import { Progress } from "../components/ui/progress";

// Componente para mostrar la ubicación
const LocationDisplay = ({ project, preview = false }: { project: ProjectDetails, preview?: boolean }) => {
  // Si es vista previa, mostrar solo ciudad y departamento
  if (preview) {
    return (
      <div className="flex items-center gap-1 text-muted-foreground">
        <MapPin className="w-4 h-4" />
        <span>{`${project.city}, ${project.department}`}</span>
      </div>
    );
  }

  // Vista completa para detalles
  return (
    <div className="flex items-center gap-2">
      <MapPin className="w-5 h-5 text-colombia-green" />
      <span className="text-foreground">
        {[project.specificAddress, project.city, project.department, project.country]
          .filter(part => part && part.trim() !== '')
          .join(', ')}
      </span>
    </div>
  );
};

export default function ProjectsPage() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [specificAddress, setSpecificAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('Colombia');
  const [fullAddress, setFullAddress] = useState('');
  const { address: walletAddress } = useAccount();
  const { loading, error, projectDetails, createNewProject } = useFarmingProjects();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get('create') === 'true' && walletAddress) {
      setShowCreateForm(true);
    }
  }, [searchParams, walletAddress]);

  // Actualizar la dirección completa cuando cambien los campos
  useEffect(() => {
    const composedAddress = [specificAddress, city, country]
      .filter(part => part.trim() !== '')
      .join(', ');
    setFullAddress(composedAddress);
  }, [specificAddress, city, country]);

  const handleCreateProject = async (formData: FormData) => {
    try {
      setFormError(null);
      const title = formData.get('title') as string;
      const description = formData.get('description') as string;
      const specificAddress = formData.get('specificAddress') as string;
      const city = formData.get('city') as string;
      const department = formData.get('department') as string;
      const country = formData.get('country') as string;
      const imageUrl = formData.get('imageUrl') as string;
      const targetAmountEth = formData.get('targetAmount') as string;

      // Validar que el monto sea un número válido y mayor que 0
      const amount = parseFloat(targetAmountEth);
      if (isNaN(amount) || amount <= 0) {
        setFormError('El monto debe ser un número válido mayor que 0');
        return;
      }

      // Validar que el monto tenga máximo 18 decimales
      const decimals = targetAmountEth.includes('.') ? targetAmountEth.split('.')[1].length : 0;
      if (decimals > 18) {
        setFormError('El monto no puede tener más de 18 decimales');
        return;
      }

      console.log("Monto en ETH:", targetAmountEth);
      const amountInWei = parseEther(targetAmountEth);
      console.log("Monto en Wei:", amountInWei.toString());
      console.log("Ubicación:", { specificAddress, city, department, country });

      await createNewProject(
        title,
        description,
        specificAddress,
        city,
        department,
        country,
        imageUrl,
        amountInWei.toString()
      );
      setShowCreateForm(false);
    } catch (error) {
      console.error('Error al crear el proyecto:', error);
      setFormError(error instanceof Error ? error.message : 'Error al crear el proyecto');
    }
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
            {walletAddress && (
              <button
                onClick={() => setShowCreateForm(true)}
                className="bg-colombia-yellow text-colombia-green px-6 py-3 rounded-lg hover:bg-background hover:text-colombia-green transition-colors font-semibold"
              >
                Crear Proyecto
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Create Project Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-background rounded-xl p-8 max-w-2xl w-full my-8 relative max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button
              onClick={() => setShowCreateForm(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <h2 className="text-2xl font-bold text-foreground mb-6">Crear Nuevo Proyecto</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleCreateProject(new FormData(e.currentTarget));
            }}>
              {formError && (
                <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                  {formError}
                </div>
              )}
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
                  <label htmlFor="department" className="block text-sm font-medium text-foreground mb-1">
                    Departamento
                  </label>
                  <input
                    type="text"
                    id="department"
                    name="department"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground"
                    placeholder="Ej: Huila"
                  />
                </div>

                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-foreground mb-1">
                    Ciudad
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground"
                    placeholder="Ej: Pitalito"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-foreground mb-1">
                    País
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground"
                    placeholder="Ej: Colombia"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="specificAddress" className="block text-sm font-medium text-foreground mb-1">
                    Dirección Específica
                  </label>
                  <input
                    type="text"
                    id="specificAddress"
                    name="specificAddress"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground"
                    placeholder="Ej: Vereda El Progreso"
                    value={specificAddress}
                    onChange={(e) => setSpecificAddress(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Ubicación en el Mapa
                  </label>
                  <div className="rounded-lg overflow-hidden">
                    <ProjectMap location={fullAddress} />
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    La ubicación se actualizará automáticamente al completar los campos de dirección
                  </p>
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
                    type="text"
                    inputMode="decimal"
                    pattern="^\d*\.?\d*$"
                    id="targetAmount"
                    name="targetAmount"
                    required
                    min="0"
                    step="any"
                    className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground"
                    placeholder="Ej: 3.5"
                    onChange={(e) => {
                      // Solo permitir números y un punto decimal
                      const value = e.target.value.replace(/[^0-9.]/g, '');
                      // Evitar múltiples puntos decimales
                      if (value === '.' || (value.match(/\./g) || []).length <= 1) {
                        e.target.value = value;
                      }
                    }}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Ingresa el monto en ETH (ejemplo: 3.5)
                  </p>
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-8 sticky bottom-0 bg-background py-4 border-t border-border">
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
              {walletAddress && (
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
              {projectDetails.map((project) => (
                <div
                  key={project.id}
                  className="bg-card rounded-xl border border-border p-6 space-y-4"
                >
                  <div className="aspect-video relative rounded-lg overflow-hidden">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-foreground">
                      {project.title}
                    </h3>
                    <LocationDisplay project={project} preview />
                  </div>

                  <p className="text-muted-foreground line-clamp-2">
                    {project.description}
                  </p>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Recaudado</span>
                        <span className="font-medium">
                          {formatEther(project.currentAmount)} ETH
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Objetivo</span>
                        <span className="font-medium">
                          {formatEther(project.targetAmount)} ETH
                        </span>
                      </div>
                      <Progress
                        value={
                          (Number(project.currentAmount) /
                            Number(project.targetAmount)) *
                          100
                        }
                      />
                    </div>

                    <div className="flex justify-end">
                      <Link
                        href={`/proyectos/${project.id}`}
                        className="px-4 py-2 bg-colombia-green text-background rounded-lg hover:bg-colombia-yellow hover:text-colombia-green transition-colors"
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