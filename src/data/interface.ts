export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: string;
  status: "completed" | "pending" | "failed";
}

export interface MonthlyTransactionData {
  month: string;
  income: number;
  expense: number;
}
