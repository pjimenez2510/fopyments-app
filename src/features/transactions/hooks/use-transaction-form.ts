import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Transaction,
  TransactionType,
} from "../interfaces/transactions.interface";
import {
  useCreateTransaction,
  useUpdateTransaction,
} from "./use-transactions-queries";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const transactionSchema = z.object({
  amount: z.coerce
    .number({
      invalid_type_error: "El monto debe ser un número",
    })
    .min(0.01, "El monto debe ser mayor que 0"),
  type: z.nativeEnum(TransactionType),
  category_id: z.coerce.number().nullable().optional(),
  description: z.string().nullable().optional(),
  payment_method_id: z.coerce.number().nullable().optional(),
  date: z.coerce.date({
    invalid_type_error: "La fecha debe ser válida",
  }),
});

type TransactionForm = z.infer<typeof transactionSchema>;

interface UseTransactionFormProps {
  transaction?: Transaction;
}

export const useTransactionForm = ({
  transaction,
}: UseTransactionFormProps) => {
  const createTransaction = useCreateTransaction();
  const updateTransaction = useUpdateTransaction();
  const { data } = useSession();
  const userId = data?.user?.id;
  const router = useRouter();

  const form = useForm<TransactionForm>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      amount: transaction?.amount || 0,
      type: transaction?.type || TransactionType.EXPENSE,
      category_id: transaction?.category_id || null,
      description: transaction?.description || "",
      payment_method_id: transaction?.payment_method_id || null,
      date: transaction?.date ? new Date(transaction.date) : new Date(),
    },
  });

  const onSubmit: SubmitHandler<TransactionForm> = async (data) => {
    const transactionData = {
      ...data,
      date: data.date.toISOString(),
    };

    if (transaction) {
      await updateTransaction.mutateAsync({
        id: transaction.id,
        transaction: transactionData,
      });
    } else {
      await createTransaction.mutateAsync({
        ...transactionData,
        user_id: Number(userId),
      });
    }
  };

  const onCancel = () => {
    form.reset();
    router.back();
  };

  return {
    form,
    onSubmit,
    onCancel,
    isSubmitting: form.formState.isSubmitting,
  };
};
