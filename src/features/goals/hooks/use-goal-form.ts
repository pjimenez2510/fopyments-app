import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Goal } from "../interfaces/ goals.interface";
import { useCreateGoal, useUpdateGoal } from "./use-goals-queries";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/format-date";

const goalSchema = z
  .object({
    shared_user_id: z.coerce.number().optional(),
    name: z.string().min(1, "El nombre es requerido"),
    current_amount: z.coerce
      .number()
      .min(0, "La cantidad actual debe ser mayor que 0"),
    target_amount: z.coerce
      .number()
      .min(0, "La cantidad objetivo debe ser mayor que 0"),
    end_date: z.coerce
      .date()
      .min(new Date(), "La fecha de fin debe ser mayor que la fecha actual"),
  })
  .refine((data) => data.target_amount > data.current_amount, {
    path: ["target_amount"],
    message: "La cantidad objetivo debe ser mayor que la cantidad actual",
  });

type GoalForm = z.infer<typeof goalSchema>;

interface UseGoalFormProps {
  goal?: Goal;
}

export const useGoalForm = ({ goal }: UseGoalFormProps) => {
  const createGoal = useCreateGoal();
  const updateGoal = useUpdateGoal();
  const { data } = useSession();
  const user = data?.user;
  const router = useRouter();
  const form = useForm<GoalForm>({
    resolver: zodResolver(goalSchema),
    defaultValues: {
      shared_user_id: goal?.shared_user_id || undefined,
      name: goal?.name || "",
      current_amount: goal?.current_amount || 0,
      target_amount: goal?.target_amount || 0,
      end_date: goal?.end_date || new Date(),
    },
  });

  const onSubmit: SubmitHandler<GoalForm> = async (data) => {
    const goalData = {
      ...data,
      end_date: formatDate(data.end_date, "yyyy-MM-dd"),
    };

    if (goal) {
      await updateGoal.mutateAsync({
        id: goal.id,
        goal: goalData,
      });
    } else {
      await createGoal.mutateAsync({
        ...goalData,
        user_id: Number(user?.id),
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
    isSubmiting: form.formState.isSubmitting,
  };
};
