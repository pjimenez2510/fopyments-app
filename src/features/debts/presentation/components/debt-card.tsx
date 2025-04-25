"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/format-currency";
import { formatDate } from "@/lib/format-date";
import { Edit, DollarSign, Trash, ListFilter } from "lucide-react";
import { Debt } from "../../interfaces/debts.interface";
import { useRouter } from "next/navigation";
import { useDeleteDebt } from "../../hooks/use-debts-queries";

interface DebtCardProps {
  debt: Debt;
}

export default function DebtCard({ debt }: DebtCardProps) {
  const router = useRouter();
  const deleteDebtMutation = useDeleteDebt();

  const handleEdit = () => {
    router.push(`/management/debts/edit/${debt.id}`);
  };

  const handleDelete = () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta deuda?")) {
      deleteDebtMutation.mutate(debt.id);
    }
  };

  const handlePayment = () => {
    router.push(`/management/debts/pay/${debt.id}`);
  };

  const handleViewTransactions = () => {
    router.push(`/management/debts/transactions/${debt.id}`);
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{debt.description}</CardTitle>
          <Badge variant={debt.paid ? "outline" : "destructive"}>
            {debt.paid ? "Pagada" : "Pendiente"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-muted-foreground">Monto original:</div>
            <div className="font-medium text-right">
              {formatCurrency(debt.original_amount)}
            </div>
            <div className="text-muted-foreground">Monto pendiente:</div>
            <div className="font-medium text-right">
              {formatCurrency(debt.pending_amount)}
            </div>
            <div className="text-muted-foreground">Fecha de vencimiento:</div>
            <div className="font-medium text-right">
              {debt.due_date ? formatDate(new Date(debt.due_date)) : "N/A"}
            </div>
            {debt.category && (
              <>
                <div className="text-muted-foreground">Categoría:</div>
                <div className="font-medium text-right">
                  {debt.category.name}
                </div>
              </>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between flex-wrap gap-2">
        <div className="flex gap-2 flex-wrap">
          <Button onClick={handleEdit} size="sm" variant="outline">
            <Edit className="h-4 w-4 mr-1" />
            Editar
          </Button>
          <Button onClick={handleViewTransactions} size="sm" variant="outline">
            <ListFilter className="h-4 w-4 mr-1" />
            Transacciones
          </Button>
          <Button onClick={handleDelete} size="sm" variant="destructive">
            <Trash className="h-4 w-4 mr-1" />
            Eliminar
          </Button>
        </div>
        {!debt.paid && (
          <Button onClick={handlePayment} size="sm" variant="default">
            <DollarSign className="h-4 w-4 mr-1" />
            Pagar
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
