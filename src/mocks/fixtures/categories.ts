import type { TransactionCategory } from "@/api/contracts";

export const categoryFixtures: TransactionCategory[] = [
  { id: "salary", name: "Salary", type: "income" },
  { id: "deposit", name: "Depósito", type: "income" },
  { id: "freelance", name: "Freelance", type: "income" },
  { id: "investment", name: "Investments", type: "both" },
  { id: "food", name: "Food & Drink", type: "expense" },
  { id: "housing", name: "Housing", type: "expense" },
  { id: "transport", name: "Transport", type: "expense" },
  { id: "entertainment", name: "Entertainment", type: "expense" },
  { id: "utilities", name: "Utilities", type: "expense" },
  { id: "insurance", name: "Insurance", type: "expense" },
  { id: "health", name: "Health", type: "expense" },
  { id: "shopping", name: "Shopping", type: "expense" },
  { id: "transfer", name: "Transferência", type: "both" },
  { id: "payment", name: "Pagamento", type: "expense" },
  { id: "withdrawal", name: "Saque", type: "expense" },
  { id: "other", name: "Outro", type: "both" },
];
