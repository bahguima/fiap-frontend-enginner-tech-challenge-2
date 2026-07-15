export interface FinancialMetric {
  description: string;
  formattedValue: string;
  label: string;
}

export interface DashboardOverviewResponse {
  balance: FinancialMetric;
  expenses: FinancialMetric;
  income: FinancialMetric;
  savings: FinancialMetric;
  subtitle: string;
  title: string;
  updatedAtLabel: string;
}
