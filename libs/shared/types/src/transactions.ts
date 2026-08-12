export type TransactionType = "income" | "expense";
export type TransactionStatus = "completed" | "pending" | "failed";
export type TransactionSort =
  | "date-desc"
  | "date-asc"
  | "amount-desc"
  | "amount-asc"
  | "description-asc"
  | "description-desc";
export type TransactionCategoryName = string;

export interface TransactionEditableFields {
  description: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategoryName;
  date: string;
  status: TransactionStatus;
  observation: string;
}

export interface Transaction {
  id: string;
  description: string;
  observation: string;
  amount: number;
  formattedAmount: string;
  type: TransactionType;
  typeLabel: string;
  category: string;
  date: string;
  formattedDate: string;
  status: TransactionStatus;
  statusLabel: string;
  editableFields: TransactionEditableFields;
}

export interface TransactionListFilters {
  search?: string;
  type?: TransactionType;
  category?: string;
  status?: TransactionStatus;
  startDate?: string;
  endDate?: string;
  minimumAmount?: number;
  maximumAmount?: number;
  sort?: TransactionSort;
  page?: number;
  pageSize?: number;
  limit?: number;
}

export interface TransactionListResponse {
  items: Transaction[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  firstPage: number;
  previousPage: number | null;
  nextPage: number | null;
  lastPage: number;
  resultsLabel: string;
}

export interface CreateTransactionRequest {
  description: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategoryName;
  date: string;
  status: TransactionStatus;
  observation?: string;
}

export type UpdateTransactionRequest = CreateTransactionRequest;
