"use client";

import RHFInput from "@/components/rhf/RHFInput";
import { useDebtPaymentForm } from "../../hooks/use-debt-payment-form";
import { FormProvider } from "react-hook-form";
import { DollarSign } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Button } from "@/components/ui/button";
import { Debt } from "../../interfaces/debts.interface";
import { formatCurrency } from "@/lib/format-currency";

interface DebtPaymentFormProps {
  debt: Debt;
}

export default function DebtPaymentForm({ debt }: DebtPaymentFormProps) {
  const { methods, onSubmit, isLoading, isError, error } =
    useDebtPaymentForm(debt);

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg space-y-2 mb-4">
          <h3 className="font-semibold text-lg">{debt.description}</h3>
          <div className="grid grid-cols-2 text-sm">
            <span className="text-gray-500">Monto original:</span>
            <span className="font-medium">
              {formatCurrency(debt.original_amount)}
            </span>
            <span className="text-gray-500">Monto pendiente:</span>
            <span className="font-medium text-red-600">
              {formatCurrency(debt.pending_amount)}
            </span>
          </div>
        </div>

        <RHFInput
          name="amount"
          label="Monto a Pagar"
          type="number"
          placeholder="0.00"
        />

        {isError && (
          <div className="p-3 bg-red-50 text-red-500 rounded-md text-sm">
            {error?.message || "Ocurrió un error al procesar el pago"}
          </div>
        )}

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isLoading || debt.pending_amount <= 0}
            className="flex items-center gap-2"
          >
            {isLoading ? (
              <LoadingSpinner size={16} />
            ) : (
              <DollarSign className="h-4 w-4" />
            )}
            <span>Realizar Pago</span>
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
