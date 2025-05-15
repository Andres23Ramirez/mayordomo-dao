'use client';

import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';
import { CreateProjectForm } from '../components/CreateProjectForm';
import { useFarmingProjects } from '../hooks/useFarmingProjects';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function CreateProjectPage() {
  const router = useRouter();
  const { address } = useAccount();
  const { loading, createNewProject } = useFarmingProjects();

  const handleCreateProject = async (
    title: string,
    description: string,
    location: string,
    imageUrl: string,
    targetAmount: bigint
  ) => {
    const tx = await createNewProject(title, description, location, imageUrl, targetAmount);
    if (tx) {
      router.push('/proyectos');
    }
  };

  if (!address) {
    return (
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-verde-campo dark:text-colombia-yellow mb-6">
            Conecta tu Billetera
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Para crear un proyecto, necesitas conectar tu billetera primero
          </p>
          <div className="flex justify-center">
            <ConnectButton />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-verde-campo dark:text-colombia-yellow mb-2">
            Crear Nuevo Proyecto
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Comparte tu proyecto agrícola con la comunidad y recibe inversión
          </p>
        </div>

        <div className="bg-white dark:bg-verde-campo/10 rounded-lg p-6 shadow-lg">
          <CreateProjectForm
            onSubmit={handleCreateProject}
            onCancel={() => router.push('/proyectos')}
            isLoading={loading}
          />
        </div>
      </div>
    </main>
  );
} 