import Image from 'next/image';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ProjectDetails } from '../hooks/useFarmingProjects';
import { formatEther } from 'viem';
import { useState } from 'react';
import { InvestmentDialog } from './InvestmentDialog';

interface ProjectCardProps {
  project: ProjectDetails;
  onInvest: (amount: bigint) => Promise<void>;
  isLoading: boolean;
}

export function ProjectCard({ project, onInvest, isLoading }: ProjectCardProps) {
  const [showInvestDialog, setShowInvestDialog] = useState(false);

  const progress = Number(project.currentAmount) / Number(project.targetAmount) * 100;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-verde-campo/10">
      <div className="relative h-48 pattern-wayuu">
        <Image
          src={project.imageUrl || '/placeholder-farm.jpg'}
          alt={project.title}
          fill
          className="object-cover"
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-verde-campo dark:text-colombia-yellow">
          {project.title}
        </h3>
        
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          {project.description}
        </p>

        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          <span>{project.location}</span>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600 dark:text-gray-300">Progreso</span>
            <span className="text-verde-campo dark:text-colombia-yellow font-medium">
              {progress.toFixed(1)}%
            </span>
          </div>
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
            <div
              className="h-full bg-verde-campo dark:bg-colombia-yellow rounded-full transition-all duration-300"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Recaudado</p>
            <p className="text-lg font-bold text-verde-campo dark:text-colombia-yellow">
              {formatEther(project.currentAmount)} ETH
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500 dark:text-gray-400">Objetivo</p>
            <p className="text-lg font-bold text-verde-campo dark:text-colombia-yellow">
              {formatEther(project.targetAmount)} ETH
            </p>
          </div>
        </div>

        <Button
          onClick={() => setShowInvestDialog(true)}
          className="w-full bg-verde-campo hover:bg-verde-hoja text-white"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              Procesando...
            </div>
          ) : (
            'Invertir en este proyecto'
          )}
        </Button>
      </div>

      {showInvestDialog && (
        <InvestmentDialog
          projectTitle={project.title}
          onInvest={onInvest}
          onClose={() => setShowInvestDialog(false)}
        />
      )}
    </Card>
  );
} 