"use client";

import RHFInput from "@/components/rhf/RHFInput";
import { useBudgetTransactionForm } from "../../hooks/use-budget-transaction-form";
import { FormProvider } from "react-hook-form";
import { DollarSign } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Button } from "@/components/ui/button";
import { Budget } from "../../interfaces/budgets.interface";
import { formatCurrency } from "@/lib/format-currency";
import RHFSelect from "@/components/rhf/RHFSelect";
import { Textarea } from "@/components/ui/textarea";
import { useFindAllPaymentMethods } from "@/features/payment-methods/hooks/use-payment-methods-queries";
import { useCategories } from "@/features/categories/hooks/use-categories-queries";
import { Label } from "@/components/ui/label";
import { TRANSACTION_TYPES } from "@/features/transactions/interfaces/transactions.interface";
import { Badge } from "@/components/ui/badge";
import { Category } from "@/features/categories/interfaces/categories.interface";

interface BudgetTransactionFormProps {
  budget: Budget;
}

export default function BudgetTransactionForm({
  budget,
}: BudgetTransactionFormProps) {
  const { methods, onSubmit, isLoading, isError, error } =
    useBudgetTransactionForm(budget);
  const { data: paymentMethods = [] } = useFindAllPaymentMethods();
  const { data: categories = [] } = useCategories();

  const paymentMethodOptions = paymentMethods.map((method) => ({
    value: method.id.toString(),
    label: method.name,
  }));

  const categoryOptions = categories.map((category: Category) => ({
    value: category.id.toString(),
    label: category.name,
  }));

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg space-y-2 mb-4">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg">{budget.category?.name}</h3>
            <Badge variant="secondary">
              {budget.month &&
                new Date(budget.month).toLocaleDateString("es-ES", {
                  month: "long",
                  year: "numeric",
                })}
            </Badge>
          </div>
          <div className="grid grid-cols-2 text-sm">
            <span className="text-gray-500">Límite:</span>
            <span className="font-medium">
              {formatCurrency(budget.limit_amount)}
            </span>
            <span className="text-gray-500">Gastado:</span>
            <span className="font-medium text-red-600">
              {formatCurrency(budget.current_amount)}
            </span>
            <span className="text-gray-500">Disponible:</span>
            <span className="font-medium text-green-600">
              {formatCurrency(budget.limit_amount - budget.current_amount)}
            </span>
          </div>
        </div>

        <RHFSelect
          name="type"
          label="Tipo de Transacción"
          options={TRANSACTION_TYPES}
        />

        <RHFInput
          name="amount"
          label="Monto"
          type="number"
          placeholder="0.00"
        />

        <RHFSelect
          name="payment_method_id"
          label="Método de Pago (opcional)"
          placeholder="Selecciona un método de pago"
          options={paymentMethodOptions}
        />

        <RHFSelect
          name="category_id"
          label="Categoría (opcional)"
          placeholder="Selecciona una categoría"
          options={categoryOptions}
        />

        <div className="space-y-2">
          <Label htmlFor="description">Descripción (opcional)</Label>
          <Textarea
            id="description"
            placeholder="Añade una descripción para esta transacción..."
            {...methods.register("description")}
          />
        </div>

        {isError && (
          <div className="p-3 bg-red-50 text-red-500 rounded-md text-sm">
            {error?.message || "Ocurrió un error al procesar la transacción"}
          </div>
        )}

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            {isLoading ? (
              <LoadingSpinner size={16} />
            ) : (
              <DollarSign className="h-4 w-4" />
            )}
            <span>Realizar Transacción</span>
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
