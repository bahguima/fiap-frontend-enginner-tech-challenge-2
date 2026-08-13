import type { LucideIcon } from "lucide-react";
import type { DashboardMetric } from "@banking/shared/types";

export type FinancialMetricTone = "primary" | "success" | "expense";

export interface IFinancialMetricCardProps {
  metric: DashboardMetric;
  icon: LucideIcon;
  tone: FinancialMetricTone;
  "data-testid"?: string;
}
