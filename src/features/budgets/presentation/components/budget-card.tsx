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
import { DollarSign, Edit, Eye, Plus, Trash } from "lucide-react";
import { Budget } from "../../interfaces/budgets.interface";
import { useRouter } from "next/navigation";
import { useDeleteBudget } from "../../hooks/use-budgets-queries";

interface BudgetCardProps {
  budget: Budget;
}

const BudgetCard = ({ budget }: BudgetCardProps) => {
  const router = useRouter();
  const deleteBudget = useDeleteBudget();

  const progress = Math.min(
    (budget.current_amount / budget.limit_amount) * 100,
    100
  );
  const isOverBudget = budget.current_amount > budget.limit_amount;

  const handleEdit = () => {
    router.push(`/management/budgets/edit/${budget.id}`);
  };

  const handleDelete = async () => {
    if (confirm("¿Estás seguro de eliminar este presupuesto?")) {
      await deleteBudget.mutateAsync(budget.id);
    }
  };

  const handleAddAmount = () => {
    router.push(`/management/budgets/amount/${budget.id}`);
  };

  const handleViewTransactions = () => {
    router.push(`/management/budgets/transactions/${budget.id}`);
  };

  const handleAddTransaction = () => {
    router.push(`/management/budgets/transaction/${budget.id}`);
  };

  return (
    <Card
      className={`w-full shadow-md hover:shadow-lg transition-shadow ${
        isOverBudget ? "border-destructive" : ""
      }`}
    >
      <CardHeader className={isOverBudget ? "bg-destructive/10" : ""}>
        <CardTitle className="flex justify-between items-center">
          <span>{budget.category?.name}</span>
          <span className="text-sm font-normal">
            {budget.month &&
              new Date(budget.month).toLocaleDateString("es-ES", {
                month: "long",
                year: "numeric",
              })}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Uso del presupuesto
          </span>
          <span
            className={`font-bold ${isOverBudget ? "text-destructive" : ""}`}
          >
            {formatCurrency(budget.current_amount)} /{" "}
            {formatCurrency(budget.limit_amount)}
          </span>
        </div>
        <Progress
          value={progress}
          className={`h-2 w-full ${isOverBudget ? "bg-red-200" : ""}`}
        />
        <div
          className={`text-right text-sm ${
            isOverBudget ? "text-destructive" : ""
          }`}
        >
          {progress.toFixed(0)}% utilizado
          {isOverBudget && " (Excedido)"}
        </div>

        {budget.shared_user_id && (
          <div className="text-sm text-blue-500 mt-2">
            Presupuesto compartido con otro usuario
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-wrap justify-end gap-2 pt-0">
        <Button
          size="sm"
          variant="ghost"
          className="flex items-center gap-1"
          onClick={handleViewTransactions}
        >
          <Eye className="h-4 w-4" />
          <span>Ver Transacciones</span>
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="flex items-center gap-1"
          onClick={handleAddTransaction}
        >
          <DollarSign className="h-4 w-4" />
          <span>Añadir Transacción</span>
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="flex items-center gap-1"
          onClick={handleAddAmount}
        >
          <Plus className="h-4 w-4" />
          <span>Actualizar</span>
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

export default BudgetCard;
