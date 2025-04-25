"use client";

import { ContentLayout } from "@/core/layout/content/content-layout";
import BudgetTransactionForm from "../components/budget-transaction-form";
import { useFindBudgetById } from "../../hooks/use-budgets-queries";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface BudgetTransactionFormViewProps {
  budgetId: string;
}

export default function BudgetTransactionFormView({
  budgetId,
}: BudgetTransactionFormViewProps) {
  const { data: budget, isLoading } = useFindBudgetById(budgetId);
  const router = useRouter();

  if (isLoading || !budget) {
    return (
      <ContentLayout title="Cargando...">
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
        </div>
      </ContentLayout>
    );
  }

  return (
    <ContentLayout title={`Nueva Transacción: ${budget.category?.name}`}>
      <div className="space-y-6">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="flex items-center gap-1"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Volver</span>
        </Button>

        <div className="max-w-xl mx-auto">
          <BudgetTransactionForm budget={budget} />
        </div>
      </div>
    </ContentLayout>
  );
}
