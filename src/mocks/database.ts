import type {
  DashboardSummary,
  Transaction,
  TransactionAttachment,
  TransactionInput,
} from "@/api/contracts";
import { attachmentFixtures } from "./fixtures/attachments";
import { createTransactionFixture, transactionFixtures } from "./fixtures/transactions";

let transactions = cloneTransactions();
let attachments = cloneAttachments();
let transactionSequence = transactionFixtures.length + 1;
let attachmentSequence = attachmentFixtures.length + 1;

export function resetMockDatabase(): void {
  transactions = cloneTransactions();
  attachments = cloneAttachments();
  transactionSequence = transactionFixtures.length + 1;
  attachmentSequence = attachmentFixtures.length + 1;
}

export function listMockTransactions(): Transaction[] {
  return transactions;
}

export function findMockTransaction(transactionId: string): Transaction | null {
  return transactions.find((transaction) => transaction.id === transactionId) ?? null;
}

export function createMockTransaction(input: TransactionInput): Transaction {
  const transaction = createTransactionFixture(input, `transaction-${transactionSequence}`);
  transactionSequence += 1;
  transactions.unshift(transaction);
  return transaction;
}

export function updateMockTransaction(transactionId: string, input: TransactionInput): Transaction | null {
  const transactionIndex = transactions.findIndex((transaction) => transaction.id === transactionId);
  if (transactionIndex < 0) return null;

  const currentTransaction = transactions[transactionIndex];
  const transaction = createTransactionFixture(input, transactionId, currentTransaction.attachmentsCount);
  transactions[transactionIndex] = transaction;
  return transaction;
}

export function deleteMockTransaction(transactionId: string): boolean {
  const initialLength = transactions.length;
  transactions = transactions.filter((transaction) => transaction.id !== transactionId);
  attachments = attachments.filter((attachment) => attachment.transactionId !== transactionId);
  return transactions.length < initialLength;
}

export function getMockDashboardSummary(): DashboardSummary {
  const totals = transactions.reduce(
    (result, transaction) => {
      if (transaction.type === "income") result.income += Math.abs(transaction.amount);
      if (transaction.type === "expense") result.expense += Math.abs(transaction.amount);
      return result;
    },
    { income: 0, expense: 0 },
  );
  const balance = totals.income - totals.expense;

  return {
    balance,
    formattedBalance: formatCurrency(balance),
    totalIncome: totals.income,
    formattedTotalIncome: formatCurrency(totals.income),
    totalExpense: totals.expense,
    formattedTotalExpense: formatCurrency(totals.expense),
    savings: balance,
    formattedSavings: formatCurrency(balance),
  };
}

export function listMockAttachments(transactionId: string): TransactionAttachment[] {
  return attachments.filter((attachment) => attachment.transactionId === transactionId);
}

export function findMockAttachment(attachmentId: string): TransactionAttachment | null {
  return attachments.find((attachment) => attachment.id === attachmentId) ?? null;
}

export function createMockAttachment(
  transactionId: string,
  fileName: string,
  mimeType: string,
  sizeInBytes: number,
): TransactionAttachment {
  const id = `attachment-${attachmentSequence}`;
  const attachment: TransactionAttachment = {
    id,
    transactionId,
    fileName,
    mimeType,
    sizeInBytes,
    uploadedAt: new Date().toISOString(),
    downloadUrl: `/api/attachments/${id}/content`,
  };
  const transaction = findMockTransaction(transactionId);

  attachmentSequence += 1;
  attachments.push(attachment);
  if (transaction) transaction.attachmentsCount += 1;
  return attachment;
}

export function deleteMockAttachment(attachmentId: string): boolean {
  const attachment = findMockAttachment(attachmentId);
  if (!attachment) return false;

  attachments = attachments.filter((item) => item.id !== attachmentId);
  const transaction = findMockTransaction(attachment.transactionId);
  if (transaction) transaction.attachmentsCount = Math.max(0, transaction.attachmentsCount - 1);
  return true;
}

function formatCurrency(value: number): string {
  return `R$ ${value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
}

function cloneTransactions(): Transaction[] {
  return transactionFixtures.map((transaction) => ({
    ...transaction,
    category: { ...transaction.category },
    formInput: { ...transaction.formInput },
  }));
}

function cloneAttachments(): TransactionAttachment[] {
  return attachmentFixtures.map((attachment) => ({ ...attachment }));
}
