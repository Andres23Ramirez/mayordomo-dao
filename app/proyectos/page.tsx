'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { useFarmingProjects } from '../hooks/useFarmingProjects';
import Navbar from "../components/Navbar";

export default function ProjectsPage() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { address } = useAccount();
  const { loading, error, projectDetails, createNewProject, investInProjectFn } = useFarmingProjects();

  const handleCreateProject = async (
    title: string,
    description: string,
    location: string,
    imageUrl: string,
    targetAmount: bigint
  ) => {
    const tx = await createNewProject(title, description, location, imageUrl, targetAmount);
    if (tx) {
      setShowCreateForm(false);
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
          <h1 className="text-5xl font-bold text-background mb-4">Proyectos Agrícolas</h1>
          <p className="text-background/90 text-xl max-w-2xl">
            Descubre y apoya iniciativas agrícolas que están transformando el campo colombiano. 
            Cada proyecto representa una oportunidad única de inversión y desarrollo rural.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="bg-background px-4 py-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Proyecto 1 */}
            <div className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-48 bg-[url('https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center" />
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
                  <button className="bg-colombia-green text-background px-4 py-2 rounded-lg hover:bg-colombia-yellow hover:text-colombia-green transition-colors">
                    Ver detalles
                  </button>
                </div>
              </div>
            </div>

            {/* Proyecto 2 */}
            <div className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-48 bg-[url('https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center" />
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
                  <button className="bg-colombia-green text-background px-4 py-2 rounded-lg hover:bg-colombia-yellow hover:text-colombia-green transition-colors">
                    Ver detalles
                  </button>
                </div>
              </div>
            </div>

            {/* Proyecto 3 */}
            <div className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-48 bg-[url('https://images.unsplash.com/photo-1589923158776-cb4485d99fd6?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center" />
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
                  <button className="bg-colombia-green text-background px-4 py-2 rounded-lg hover:bg-colombia-yellow hover:text-colombia-green transition-colors">
                    Ver detalles
                  </button>
                </div>
              </div>
            </div>

            {/* Proyecto 4 */}
            <div className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-48 bg-[url('https://images.unsplash.com/photo-1595475207225-428b62bda831?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center" />
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <span className="bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full">Flores</span>
                  <span className="ml-2 text-sm text-muted-foreground">Cundinamarca</span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Flores del Amanecer</h3>
                <p className="text-muted-foreground mb-4">Cultivo sostenible de flores exóticas para exportación por la cooperativa floricultora de la Sabana.</p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Meta de inversión</p>
                    <p className="text-lg font-bold text-foreground">18 ETH</p>
                  </div>
                  <button className="bg-colombia-green text-background px-4 py-2 rounded-lg hover:bg-colombia-yellow hover:text-colombia-green transition-colors">
                    Ver detalles
                  </button>
                </div>
              </div>
            </div>

            {/* Proyecto 5 */}
            <div className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-48 bg-[url('https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center" />
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <span className="bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full">Frutas</span>
                  <span className="ml-2 text-sm text-muted-foreground">Valle del Cauca</span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Frutas del Pacífico</h3>
                <p className="text-muted-foreground mb-4">Producción de frutas tropicales orgánicas por la asociación de agricultores del Valle.</p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Meta de inversión</p>
                    <p className="text-lg font-bold text-foreground">25 ETH</p>
                  </div>
                  <button className="bg-colombia-green text-background px-4 py-2 rounded-lg hover:bg-colombia-yellow hover:text-colombia-green transition-colors">
                    Ver detalles
                  </button>
                </div>
              </div>
            </div>

            {/* Proyecto 6 */}
            <div className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-48 bg-[url('https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center" />
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <span className="bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full">Arroz</span>
                  <span className="ml-2 text-sm text-muted-foreground">Tolima</span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Arrozales del Tolima</h3>
                <p className="text-muted-foreground mb-4">Cultivo tecnificado de arroz premium por la cooperativa arrocera del Tolima Grande.</p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Meta de inversión</p>
                    <p className="text-lg font-bold text-foreground">30 ETH</p>
                  </div>
                  <button className="bg-colombia-green text-background px-4 py-2 rounded-lg hover:bg-colombia-yellow hover:text-colombia-green transition-colors">
                    Ver detalles
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 