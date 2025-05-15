import { useState, ChangeEvent } from 'react';
import { parseEther } from 'viem';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

interface CreateProjectFormProps {
  onSubmit: (
    title: string,
    description: string,
    location: string,
    imageUrl: string,
    targetAmount: bigint
  ) => Promise<void>;
  onCancel: () => void;
  isLoading: boolean;
}

export function CreateProjectForm({ onSubmit, onCancel, isLoading }: CreateProjectFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    imageUrl: '',
    targetAmount: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.targetAmount) return;

    await onSubmit(
      formData.title,
      formData.description,
      formData.location,
      formData.imageUrl,
      parseEther(formData.targetAmount)
    );
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-verde-campo dark:text-colombia-yellow mb-4">
          Crear Nuevo Proyecto
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Comparte los detalles de tu proyecto agrícola para recibir inversión
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Título del Proyecto
          </label>
          <Input
            id="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Ej: Cultivo de Café Orgánico"
            required
            className="w-full"
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Ubicación
          </label>
          <Input
            id="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="Ej: Quindío, Colombia"
            required
            className="w-full"
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          Descripción
        </label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Describe tu proyecto, sus objetivos y cómo se utilizará la inversión..."
          required
          className="w-full min-h-[100px]"
          disabled={isLoading}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label
            htmlFor="imageUrl"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            URL de la Imagen
          </label>
          <Input
            id="imageUrl"
            type="url"
            value={formData.imageUrl}
            onChange={handleInputChange}
            placeholder="https://ejemplo.com/imagen.jpg"
            required
            className="w-full"
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="targetAmount"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Monto Objetivo (ETH)
          </label>
          <Input
            id="targetAmount"
            type="number"
            step="0.01"
            min="0"
            value={formData.targetAmount}
            onChange={handleInputChange}
            placeholder="0.0"
            required
            className="w-full"
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
          className="border-verde-campo text-verde-campo hover:bg-verde-campo/10
                   dark:border-colombia-yellow dark:text-colombia-yellow dark:hover:bg-colombia-yellow/10"
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-verde-campo hover:bg-verde-hoja text-white
                   dark:bg-colombia-yellow dark:hover:bg-colombia-yellow/90 dark:text-verde-campo"
        >
          {isLoading ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              Procesando...
            </div>
          ) : (
            'Crear Proyecto'
          )}
        </Button>
      </div>
    </form>
  );
} 