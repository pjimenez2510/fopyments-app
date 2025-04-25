import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ReportFormat, ReportType } from "../interfaces/reports.interface";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useGenerateReport } from "./use-reports-queries";

// Schema para validar el formulario
const reportFormSchema = z.object({
  type: z.nativeEnum(ReportType),
  format: z.nativeEnum(ReportFormat),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  categoryId: z.string().optional(),
});

// Tipo para inferir el tipo de datos del formulario
type ReportFormValues = z.infer<typeof reportFormSchema>;

export const useReportForm = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const router = useRouter();
  const generateReport = useGenerateReport();

  // Inicializar el formulario con valores por defecto
  const form = useForm<ReportFormValues>({
    resolver: zodResolver(reportFormSchema),
    defaultValues: {
      type: ReportType.GOAL,
      format: ReportFormat.PDF,
      startDate: new Date(),
      endDate: new Date(),
      categoryId: undefined,
    },
  });

  // Enviar el formulario
  const onSubmit = (values: ReportFormValues) => {
    // Añadir el userId al objeto de filtros
    const reportRequest = {
      type: values.type,
      format: values.format,
      filters: {
        startDate: values.startDate?.toISOString(),
        endDate: values.endDate?.toISOString(),
        categoryId: values.categoryId,
        userId: userId?.toString(),
      },
    };

    generateReport.mutate(reportRequest, {
      onSuccess: (data) => {
        router.push(`/management/reports/${data.id}`);
      },
    });

    console.log(reportRequest);

    return reportRequest;
  };

  return {
    form,
    onSubmit,
  };
};
