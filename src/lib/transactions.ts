import type { Transaction } from "@/data/transactions";
import type { TransactionSummary } from "./interface";
import {
  transactionCategoryOptions,
  transactionStatusOptions,
  transactionTypeOptions,
} from "@/components/form/TransactionFormModal/schema";
import type { TransactionFormValues } from "@/components/form/TransactionFormModal/schema";

export {
  transactionCategoryOptions,
  transactionFormSchema,
  transactionStatusOptions,
  transactionTypeOptions,
} from "@/components/form/TransactionFormModal/schema";
export type { TransactionFormValues } from "@/components/form/TransactionFormModal/schema";

export type { TransactionSummary } from "./interface";

export function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", { minimumFractionDigits: 2 });
}

export function formatSignedCurrency(transaction: Transaction) {
  const prefix = transaction.type === "income" ? "+" : "-";
  return `${prefix}R$ ${formatCurrency(Math.abs(transaction.amount))}`;
}

export function getTransactionTypeLabel(type: Transaction["type"]) {
  return transactionTypeOptions.find((option) => option.value === type)?.label ?? type;
}

export function getTransactionStatusLabel(status: Transaction["status"]) {
  return transactionStatusOptions.find((option) => option.value === status)?.label ?? status;
}

export function getEditableCategory(category: string): TransactionFormValues["category"] {
  return transactionCategoryOptions.includes(category as TransactionFormValues["category"])
    ? (category as TransactionFormValues["category"])
    : "Outro";
}

export function toSignedTransactionAmount(amount: number, type: Transaction["type"]) {
  const normalizedAmount = Math.abs(amount);
  return type === "income" ? normalizedAmount : -normalizedAmount;
}

export function createTransactionFromForm(values: TransactionFormValues, id: string): Transaction {
  return {
    id,
    description: values.description.trim(),
    amount: toSignedTransactionAmount(values.amount, values.type),
    type: values.type,
    category: values.category,
    date: values.date,
    status: values.status,
  };
}

export function updateTransactionFromForm(transaction: Transaction, values: TransactionFormValues): Transaction {
  return {
    ...transaction,
    description: values.description.trim(),
    amount: toSignedTransactionAmount(values.amount, values.type),
    type: values.type,
    category: values.category,
    date: values.date,
    status: values.status,
  };
}

export function getDefaultTransactionFormValues(): TransactionFormValues {
  return {
    description: "",
    type: "income",
    category: "Depósito",
    amount: 0,
    date: formatDateInput(new Date()),
    status: "completed",
  };
}

export function getTransactionFormValues(transaction: Transaction): TransactionFormValues {
  return {
    description: transaction.description,
    type: transaction.type,
    category: getEditableCategory(transaction.category),
    amount: Math.abs(transaction.amount),
    date: transaction.date,
    status: transaction.status,
  };
}

export function calculateTransactionSummary(data: Transaction[]): TransactionSummary {
  const totalIncome = data
    .filter((transaction) => transaction.type === "income")
    .reduce((sum, transaction) => sum + Math.abs(transaction.amount), 0);
  const totalExpense = data
    .filter((transaction) => transaction.type === "expense")
    .reduce((sum, transaction) => sum + Math.abs(transaction.amount), 0);

  return {
    totalIncome,
    totalExpense,
    balance: totalIncome - totalExpense,
  };
}

function formatDateInput(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
