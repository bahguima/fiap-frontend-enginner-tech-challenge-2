import type { ListResponse } from "./common";

export type TransactionType = "income" | "expense";
export type TransactionStatus = "completed" | "pending" | "failed";

export interface TransactionCategoryReference {
  id: string;
  name: string;
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  formattedAmount: string;
  type: TransactionType;
  typeLabel: string;
  category: TransactionCategoryReference;
  date: string;
  formattedDate: string;
  status: TransactionStatus;
  statusLabel: string;
  attachmentsCount: number;
  formInput: TransactionInput;
}

export interface TransactionInput {
  description: string;
  amount: number;
  type: TransactionType;
  categoryId: string;
  date: string;
  status: TransactionStatus;
}

export interface TransactionFilters {
  page?: number;
  pageSize?: number;
  search?: string;
  type?: TransactionType | null;
  status?: TransactionStatus;
  categoryId?: string;
  startDate?: string;
  endDate?: string;
}

export interface TransactionsResponse extends ListResponse<Transaction> {
  emptyState: "empty" | "no-results" | null;
}

export interface TransactionResponse {
  data: Transaction;
}
