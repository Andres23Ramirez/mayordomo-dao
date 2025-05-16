'use client';

import { useParams } from 'next/navigation';
import Navbar from "../../components/Navbar";
import { useFarmingProjects } from '../../hooks/useFarmingProjects';
import { formatEther, parseEther } from 'viem';
import { useState, useEffect } from 'react';

export default function ProjectPage() {
  const params = useParams();
  const projectId = typeof params.id === 'string' ? parseInt(params.id) : 0;
  const { loading, error: contractError, projectDetails, investInProjectFn } = useFarmingProjects();
  const [investing, setInvesting] = useState(false);
  const [transactionError, setTransactionError] = useState<string | null>(null);
  
  // Encontrar el proyecto correcto usando el ID
  const project = projectDetails.find(p => p.id === projectId);
  
  // Calcular el monto restante disponible para invertir
  const remainingAmount = project ? project.targetAmount - project.currentAmount : BigInt(0);
  
  // Actualizar el monto de inversión cuando el proyecto se carga
  const [investmentAmount, setInvestmentAmount] = useState('');

  useEffect(() => {
    if (project) {
      setInvestmentAmount(formatEther(remainingAmount));
    }
  }, [project, remainingAmount]);

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

  if (contractError || !project) {
    return (
      <main className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-foreground">
            {contractError ? 'Error al cargar el proyecto' : 'Proyecto no encontrado'}
          </h1>
          <p className="text-muted-foreground mt-4">
            {contractError || 'El proyecto que buscas no existe o ha sido eliminado.'}
          </p>
        </div>
      </main>
    );
  }

  const handleInvest = async () => {
    setTransactionError(null);
    
    if (!investmentAmount || parseFloat(investmentAmount) <= 0) {
      setTransactionError('Por favor ingresa un monto válido');
      return;
    }

    try {
      setInvesting(true);
      const amountInWei = parseEther(investmentAmount);
      const result = await investInProjectFn(projectId, amountInWei);
      if (result) {
        alert('Inversión realizada con éxito');
        // El monto se actualizará automáticamente cuando se actualicen los datos del proyecto
      }
    } catch (error: any) {
      console.error('Error al invertir:', error);
      if (error.message.includes('User denied transaction') || 
          error.message.includes('User rejected') ||
          error.message.includes('rejected the request')) {
        setTransactionError('Transacción cancelada por el usuario');
      } else {
        setTransactionError('Error al realizar la inversión. Por favor intenta de nuevo.');
      }
    } finally {
      setInvesting(false);
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
                
                {transactionError && (
                  <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-800 rounded-lg">
                    {transactionError}
                  </div>
                )}
                
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
                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-1">
                      <label htmlFor="investment" className="block text-sm text-muted-foreground">
                        Monto a invertir
                      </label>
                      <span className="text-sm font-medium text-foreground">
                        {investmentAmount || '0.00'} ETH
                      </span>
                    </div>
                    <div className="relative h-6">
                      <input
                        id="investment"
                        type="range"
                        min="0"
                        max={formatEther(remainingAmount)}
                        step="0.01"
                        value={investmentAmount}
                        onChange={(e) => setInvestmentAmount(e.target.value)}
                        className="absolute top-2 inset-x-0 w-full h-1.5 appearance-none cursor-pointer bg-transparent z-30
                          [&::-webkit-slider-thumb]:appearance-none 
                          [&::-webkit-slider-thumb]:h-3 
                          [&::-webkit-slider-thumb]:w-3 
                          [&::-webkit-slider-thumb]:rounded-full 
                          [&::-webkit-slider-thumb]:bg-colombia-green 
                          [&::-webkit-slider-thumb]:cursor-pointer
                          [&::-webkit-slider-thumb]:shadow-md
                          [&::-webkit-slider-thumb]:shadow-colombia-green/20
                          [&::-webkit-slider-thumb]:border
                          [&::-webkit-slider-thumb]:border-white
                          [&::-moz-range-thumb]:h-3
                          [&::-moz-range-thumb]:w-3
                          [&::-moz-range-thumb]:rounded-full 
                          [&::-moz-range-thumb]:bg-colombia-green
                          [&::-moz-range-thumb]:border
                          [&::-moz-range-thumb]:border-white
                          [&::-moz-range-thumb]:cursor-pointer
                          [&::-moz-range-thumb]:shadow-md
                          [&::-moz-range-thumb]:shadow-colombia-green/20"
                        disabled={!project.isActive || investing}
                      />
                      <div className="absolute top-2 inset-x-0 bg-muted rounded-md h-1.5 z-10" />
                      <div 
                        className="absolute top-2 inset-x-0 bg-colombia-green rounded-md h-1.5 z-20" 
                        style={{ 
                          width: `${(parseFloat(investmentAmount || '0') / parseFloat(formatEther(remainingAmount))) * 100}%`,
                          maxWidth: '100%'
                        }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-3">
                      <span>0 ETH</span>
                      <span>{formatEther(remainingAmount)} ETH</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleInvest}
                  disabled={!project.isActive || investing || !investmentAmount}
                  className={`w-full mt-6 py-3 px-4 rounded-lg font-medium transition-colors
                    ${project.isActive && !investing && investmentAmount
                      ? 'bg-colombia-green text-background hover:bg-colombia-yellow hover:text-colombia-green'
                      : 'bg-muted text-muted-foreground cursor-not-allowed'}`}
                >
                  {!project.isActive 
                    ? 'Proyecto no disponible'
                    : investing
                      ? 'Procesando inversión...'
                      : 'Invertir en este proyecto'
                  }
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 