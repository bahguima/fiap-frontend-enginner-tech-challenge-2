import type {
  Transaction,
  TransactionInput,
  TransactionStatus,
  TransactionType,
} from "@/api/contracts";
import { categoryFixtures } from "./categories";

export const transactionFixtures: Transaction[] = [
  createTransactionFixture({ description: "Salary Deposit", amount: 8500, type: "income", categoryId: "salary", date: "2026-04-10", status: "completed" }, "transaction-1", 1),
  createTransactionFixture({ description: "Netflix Subscription", amount: 15.99, type: "expense", categoryId: "entertainment", date: "2026-04-09", status: "completed" }, "transaction-2"),
  createTransactionFixture({ description: "Grocery Store", amount: 127.43, type: "expense", categoryId: "food", date: "2026-04-08", status: "completed" }, "transaction-3"),
  createTransactionFixture({ description: "Freelance Payment", amount: 2200, type: "income", categoryId: "freelance", date: "2026-04-07", status: "completed" }, "transaction-4"),
  createTransactionFixture({ description: "Electric Bill", amount: 89.5, type: "expense", categoryId: "utilities", date: "2026-04-06", status: "completed" }, "transaction-5"),
  createTransactionFixture({ description: "Restaurant Dinner", amount: 62, type: "expense", categoryId: "food", date: "2026-04-05", status: "completed" }, "transaction-6"),
  createTransactionFixture({ description: "Stock Dividend", amount: 340, type: "income", categoryId: "investment", date: "2026-04-04", status: "completed" }, "transaction-7"),
  createTransactionFixture({ description: "Uber Ride", amount: 24.3, type: "expense", categoryId: "transport", date: "2026-04-03", status: "completed" }, "transaction-8"),
  createTransactionFixture({ description: "Client Invoice #402", amount: 4800, type: "income", categoryId: "freelance", date: "2026-04-02", status: "pending" }, "transaction-9"),
  createTransactionFixture({ description: "Health Insurance", amount: 320, type: "expense", categoryId: "insurance", date: "2026-04-01", status: "completed" }, "transaction-10"),
  createTransactionFixture({ description: "Gym Membership", amount: 49.99, type: "expense", categoryId: "health", date: "2026-03-31", status: "completed" }, "transaction-11"),
  createTransactionFixture({ description: "Interest Income", amount: 128.5, type: "income", categoryId: "investment", date: "2026-03-30", status: "completed" }, "transaction-12"),
  createTransactionFixture({ description: "Amazon Purchase", amount: 89.99, type: "expense", categoryId: "shopping", date: "2026-03-29", status: "completed" }, "transaction-13"),
  createTransactionFixture({ description: "Rent Payment", amount: 1800, type: "expense", categoryId: "housing", date: "2026-03-28", status: "completed" }, "transaction-14"),
  createTransactionFixture({ description: "Bonus Payment", amount: 1500, type: "income", categoryId: "salary", date: "2026-03-27", status: "completed" }, "transaction-15"),
];

export function createTransactionFixture(
  input: TransactionInput,
  id: string,
  attachmentsCount = 0,
): Transaction {
  const category = categoryFixtures.find((item) => item.id === input.categoryId) ?? categoryFixtures[categoryFixtures.length - 1];
  const signedAmount = input.type === "expense" ? -Math.abs(input.amount) : Math.abs(input.amount);

  return {
    id,
    description: input.description.trim(),
    amount: signedAmount,
    formattedAmount: formatAmount(signedAmount, input.type),
    type: input.type,
    typeLabel: getTypeLabel(input.type),
    category: { id: category.id, name: category.name },
    date: input.date,
    formattedDate: input.date,
    status: input.status,
    statusLabel: getStatusLabel(input.status),
    attachmentsCount,
    formInput: {
      description: input.description.trim(),
      amount: Math.abs(input.amount),
      type: input.type,
      categoryId: input.categoryId,
      date: input.date,
      status: input.status,
    },
  };
}

function formatAmount(amount: number, type: TransactionType): string {
  const prefix = type === "income" ? "+" : "-";
  return `${prefix}R$ ${Math.abs(amount).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
}

function getTypeLabel(type: TransactionType): string {
  return type === "income" ? "Entrada" : "Saída";
}

function getStatusLabel(status: TransactionStatus): string {
  if (status === "completed") return "Concluído";
  if (status === "pending") return "Pendente";
  return "Falhou";
}
