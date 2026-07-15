import type { Transaction } from "./transactions";

export interface DashboardSummary {
  balance: number;
  formattedBalance: string;
  totalIncome: number;
  formattedTotalIncome: string;
  totalExpense: number;
  formattedTotalExpense: string;
  savings: number;
  formattedSavings: string;
}

export interface DashboardChartData {
  labels: string[];
  income: number[];
  expense: number[];
}

export interface DashboardResponse {
  summary: DashboardSummary;
  chart: DashboardChartData;
  recentTransactions: Transaction[];
}
