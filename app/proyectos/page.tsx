'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { ProjectCard } from '../components/ProjectCard';
import { CreateProjectForm } from '../components/CreateProjectForm';
import { useFarmingProjects } from '../hooks/useFarmingProjects';
import { Button } from '../components/ui/button';
import { ConnectButton } from '@rainbow-me/rainbowkit';

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
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-verde-campo dark:text-colombia-yellow mb-2">
            Proyectos Agrícolas
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Invierte en el futuro de la agricultura colombiana
          </p>
        </div>
        <div className="flex items-center gap-4">
          <ConnectButton />
          {address && (
            <Button
              onClick={() => setShowCreateForm(true)}
              className="bg-verde-campo hover:bg-verde-hoja text-white"
            >
              Crear Proyecto
            </Button>
          )}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-4">
          {error}
        </div>
      )}

      {showCreateForm && (
        <div className="mb-8 bg-white dark:bg-verde-campo/10 rounded-lg p-6 shadow-lg">
          <CreateProjectForm
            onSubmit={handleCreateProject}
            onCancel={() => setShowCreateForm(false)}
            isLoading={loading}
          />
        </div>
      )}

      {loading && projectDetails.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-verde-campo dark:border-colombia-yellow mb-4" />
          <p className="text-gray-600 dark:text-gray-300">Cargando proyectos...</p>
        </div>
      ) : projectDetails.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-verde-campo dark:text-colombia-yellow mb-2">
            No hay proyectos aún
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Sé el primero en crear un proyecto agrícola
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectDetails.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              onInvest={(amount) => handleInvest(index, amount)}
              isLoading={loading}
            />
          ))}
        </div>
      )}
    </main>
  );
} 