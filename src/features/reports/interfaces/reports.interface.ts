export enum ReportType {
  GOAL = "GOAL",
  CONTRIBUTION = "CONTRIBUTION",
  BUDGET = "BUDGET",
  EXPENSE = "EXPENSE",
  INCOME = "INCOME",
  GOALS_BY_STATUS = "GOALS_BY_STATUS",
  GOALS_BY_CATEGORY = "GOALS_BY_CATEGORY",
  CONTRIBUTIONS_BY_GOAL = "CONTRIBUTIONS_BY_GOAL",
  SAVINGS_COMPARISON = "SAVINGS_COMPARISON",
  SAVINGS_SUMMARY = "SAVINGS_SUMMARY",
}

export enum ReportFormat {
  JSON = "JSON",
  PDF = "PDF",
  EXCEL = "EXCEL",
  CSV = "CSV",
}

export interface ReportFilters {
  startDate?: string;
  endDate?: string;
  categoryId?: string;
  userId?: string;
}

export interface ReportRequest {
  type: ReportType;
  format: ReportFormat;
  filters: ReportFilters;
}

export interface Report {
  id: string;
  type: ReportType;
  format: ReportFormat;
  data?: Date;
  createdAt: string;
  expiresAt: string;
}

export const REPORT_TYPE_LABELS = {
  [ReportType.GOAL]: "Metas",
  [ReportType.CONTRIBUTION]: "Contribuciones",
  [ReportType.BUDGET]: "Presupuestos",
  [ReportType.EXPENSE]: "Gastos",
  [ReportType.INCOME]: "Ingresos",
  [ReportType.GOALS_BY_STATUS]: "Metas por Estado",
  [ReportType.GOALS_BY_CATEGORY]: "Metas por Categoría",
  [ReportType.CONTRIBUTIONS_BY_GOAL]: "Contribuciones por Meta",
  [ReportType.SAVINGS_COMPARISON]: "Comparación de Ahorros",
  [ReportType.SAVINGS_SUMMARY]: "Resumen de Ahorros",
};

export const REPORT_FORMAT_LABELS = {
  [ReportFormat.JSON]: "JSON",
  [ReportFormat.PDF]: "PDF",
  [ReportFormat.EXCEL]: "Excel",
  [ReportFormat.CSV]: "CSV",
};
