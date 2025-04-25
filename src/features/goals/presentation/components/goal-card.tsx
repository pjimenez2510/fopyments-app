"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "@/lib/format-currency";
import { formatDate } from "@/lib/format-date";
import { Edit, Trash, CreditCard, List } from "lucide-react";
import { Goal } from "../../interfaces/ goals.interface";
import { useRouter } from "next/navigation";
import { useDeleteGoal } from "../../hooks/use-goals-queries";

interface GoalCardProps {
  goal: Goal;
}

const GoalCard = ({ goal }: GoalCardProps) => {
  const router = useRouter();
  const deleteGoal = useDeleteGoal();

  console.log(goal);

  const progress = (goal.current_amount / goal.target_amount) * 100;

  const handleEdit = () => {
    router.push(`/management/goals/edit/${goal.id}`);
  };

  const handleDelete = async () => {
    if (confirm("¿Estás seguro de eliminar esta meta?")) {
      await deleteGoal.mutateAsync(goal.id);
    }
  };

  const handleAddContribution = () => {
    router.push(`/management/goals/contribution/${goal.id}`);
  };

  const handleViewTransactions = () => {
    router.push(`/management/goals/transactions/${goal.id}`);
  };

  return (
    <Card className="w-full shadow-md hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{goal.name}</span>
          <span className="text-sm font-normal">
            Fecha límite: {formatDate(new Date(goal.end_date), "dd/MM/yyyy")}
          </span>
        </CardTitle>
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
      </CardContent>
      <CardFooter className="flex flex-wrap justify-end gap-2 pt-0">
        <Button
          size="sm"
          variant="ghost"
          className="flex items-center gap-1"
          onClick={handleAddContribution}
        >
          <CreditCard className="h-4 w-4" />
          <span>Contribuir</span>
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="flex items-center gap-1"
          onClick={handleViewTransactions}
        >
          <List className="h-4 w-4" />
          <span>Transacciones</span>
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="flex items-center gap-1"
          onClick={handleEdit}
        >
          <Edit className="h-4 w-4" />
          <span>Editar</span>
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="flex items-center gap-1 text-destructive"
          onClick={handleDelete}
        >
          <Trash className="h-4 w-4" />
          <span>Eliminar</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GoalCard;
