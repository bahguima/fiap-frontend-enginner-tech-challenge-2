import type { ReactNode } from "react";

export interface StyledComponentsRegistryProps {
  children: ReactNode;
}

export interface TransactionSummary {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}
