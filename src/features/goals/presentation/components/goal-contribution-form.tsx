"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/format-currency";
import { Progress } from "@/components/ui/progress";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Goal } from "../../interfaces/ goals.interface";
import { useCreateGoalContribution } from "../../hooks/use-goals-queries";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFindAllPaymentMethods } from "@/features/payment-methods/hooks/use-payment-methods-queries";
import { Textarea } from "@/components/ui/textarea";

interface GoalContributionFormProps {
  goal: Goal;
}

const GoalContributionForm = ({ goal }: GoalContributionFormProps) => {
  const [amount, setAmount] = useState<number>(0);
  const [paymentMethodId, setPaymentMethodId] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const { data } = useSession();
  const user = data?.user;
  const createContribution = useCreateGoalContribution();
  const router = useRouter();
  const progress = (goal.current_amount / goal.target_amount) * 100;
  const { data: paymentMethods = [] } = useFindAllPaymentMethods();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;

    await createContribution.mutateAsync({
      goalId: goal.id,
      userId: Number(user.id),
      amount,
      paymentMethodId: paymentMethodId ? Number(paymentMethodId) : undefined,
      description: description || undefined,
    });

    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{goal.name}</CardTitle>
      </CardHeader>
      <CardContent className="pt-4 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Progreso actual
          </span>
          <span className="font-bold">
            {formatCurrency(goal.current_amount)} /{" "}
            {formatCurrency(goal.target_amount)}
          </span>
        </div>
        <Progress value={progress} className="h-2 w-full" />
        <div className="text-right text-sm">
          {progress.toFixed(0)}% completado
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <label htmlFor="amount" className="block text-sm font-medium">
              Cantidad a contribuir
            </label>
            <Input
              id="amount"
              type="number"
              min={0}
              step="0.01"
              value={amount || ""}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="0.00"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="paymentMethod"
              className="block text-sm font-medium"
            >
              Método de pago (opcional)
            </label>
            <Select value={paymentMethodId} onValueChange={setPaymentMethodId}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar método de pago" />
              </SelectTrigger>
              <SelectContent>
                {paymentMethods.map((method) => (
                  <SelectItem key={method.id} value={method.id.toString()}>
                    {method.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium">
              Descripción (opcional)
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Contribución para..."
            />
          </div>

          <div className="pt-2 flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="flex items-center gap-1"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Volver</span>
            </Button>
            <Button
              type="submit"
              disabled={createContribution.isPending || amount <= 0}
              className="flex items-center gap-1"
            >
              {createContribution.isPending ? (
                <LoadingSpinner />
              ) : (
                <Save className="h-4 w-4" />
              )}
              <span>Guardar Contribución</span>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default GoalContributionForm;
