import { useState } from 'react';
import { parseEther } from 'viem';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Input } from './ui/input';

export interface InvestmentDialogProps {
  projectTitle: string;
  onInvest: (amount: bigint) => Promise<void>;
  onClose: () => void;
}

export function InvestmentDialog({ projectTitle, onInvest, onClose }: InvestmentDialogProps) {
  const [amount, setAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;

    try {
      setIsSubmitting(true);
      await onInvest(parseEther(amount));
      onClose();
    } catch (error) {
      console.error('Error al invertir:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="max-w-md w-full bg-white dark:bg-verde-campo/90">
        <CardHeader>
          <CardTitle className="text-verde-campo dark:text-colombia-yellow">
            Invertir en {projectTitle}
          </CardTitle>
          <CardDescription className="dark:text-gray-300">
            Ingresa la cantidad que deseas invertir en ETH
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="amount"
                  className="text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Cantidad en ETH
                </label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.0"
                  step="0.01"
                  min="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full"
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="border-verde-campo text-verde-campo hover:bg-verde-campo/10
                       dark:border-colombia-yellow dark:text-colombia-yellow dark:hover:bg-colombia-yellow/10"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={!amount || isSubmitting}
              className="bg-verde-campo hover:bg-verde-hoja text-white
                       dark:bg-colombia-yellow dark:hover:bg-colombia-yellow/90 dark:text-verde-campo"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Procesando...
                </div>
              ) : (
                'Confirmar Inversión'
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
} 