"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/format-currency";
import { formatDate } from "@/lib/format-date";
import { useFindGoalTransactions } from "../../hooks/use-goals-queries";
import { Goal } from "../../interfaces/ goals.interface";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface GoalTransactionsListProps {
  goal: Goal;
}

const GoalTransactionsList = ({ goal }: GoalTransactionsListProps) => {
  const { data: transactions = [], isLoading } = useFindGoalTransactions(
    goal.id.toString()
  );

  if (isLoading) {
    return <LoadingSpinner className="mx-auto" />;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Transacciones de la Meta</CardTitle>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No hay transacciones registradas para esta meta.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Monto</TableHead>
                <TableHead>Tipo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    {formatDate(new Date(transaction.date), "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell>{transaction.description || "—"}</TableCell>
                  <TableCell>
                    {transaction.category?.name || "Sin categoría"}
                  </TableCell>
                  <TableCell className="font-medium">
                    {formatCurrency(transaction.amount)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        transaction.type === "INCOME"
                          ? "default"
                          : "destructive"
                      }
                    >
                      {transaction.type === "INCOME" ? "Ingreso" : "Gasto"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default GoalTransactionsList;
