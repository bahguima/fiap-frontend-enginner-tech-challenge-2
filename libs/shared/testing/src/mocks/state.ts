import type {
  AuthSession,
  CreateAttachmentRequest,
  CreateTransactionRequest,
  DashboardAmount,
  DashboardHomeResponse,
  DashboardSummaryResponse,
  Transaction,
  TransactionAttachment,
  TransactionListFilters,
  TransactionListResponse,
  TransactionSort,
  UpdateTransactionRequest,
} from "@banking/shared/types";
import { mockAttachments } from "./fixtures/attachments";
import { mockAuthUser } from "./fixtures/auth";
import {
  mockTransactionSeeds,
  type MockTransactionSeed,
} from "./fixtures/transactions";
import { mockDashboardHome as mockDashboardHomeFixture } from "./fixtures/dashboard";

let authenticated = false;
let transactionSequence = 100;
let attachmentSequence = 100;
let transactions: Transaction[] = [];
let attachments: TransactionAttachment[] = [];

export function resetMockState() {
  authenticated = false;
  transactionSequence = 100;
  attachmentSequence = 100;
  transactions = mockTransactionSeeds.map(createTransactionFromSeed);
  attachments = mockAttachments.map((attachment) => ({ ...attachment }));
}

export function getMockSession(): AuthSession {
  return {
    authenticated,
    user: authenticated ? mockAuthUser : null,
  };
}

export function authenticateMockSession() {
  authenticated = true;
  return getMockSession();
}

export function clearMockSession() {
  authenticated = false;
}

export function listMockTransactions(
  filters: TransactionListFilters,
): TransactionListResponse {
  let result = transactions;

  if (filters.search) {
    const normalizedSearch = normalizeSearch(filters.search);
    result = result.filter((transaction) =>
      normalizeSearch(
        [
          transaction.description,
          transaction.category,
          transaction.typeLabel,
          transaction.statusLabel,
        ].join(" "),
      ).includes(normalizedSearch),
    );
  }

  if (filters.type) {
    result = result.filter((transaction) => transaction.type === filters.type);
  }

  if (filters.category) {
    result = result.filter(
      (transaction) => transaction.category === filters.category,
    );
  }

  if (filters.status) {
    result = result.filter(
      (transaction) => transaction.status === filters.status,
    );
  }

  if (filters.startDate) {
    const startDate = filters.startDate;
    result = result.filter(
      (transaction) => transaction.date >= startDate,
    );
  }

  if (filters.endDate) {
    const endDate = filters.endDate;
    result = result.filter(
      (transaction) => transaction.date <= endDate,
    );
  }

  if (filters.minimumAmount !== undefined) {
    const minimumAmount = filters.minimumAmount;
    result = result.filter(
      (transaction) => Math.abs(transaction.amount) >= minimumAmount,
    );
  }

  if (filters.maximumAmount !== undefined) {
    const maximumAmount = filters.maximumAmount;
    result = result.filter(
      (transaction) => Math.abs(transaction.amount) <= maximumAmount,
    );
  }

  const sortedTransactions = [...result].sort(
    createTransactionComparator(filters.sort ?? "date-desc"),
  );
  const total = sortedTransactions.length;
  const pageSize = Math.min(filters.pageSize ?? filters.limit ?? 10, 100);
  const totalPages = Math.ceil(total / pageSize);
  const lastPage = Math.max(totalPages, 1);
  const requestedPage = filters.limit === undefined ? filters.page ?? 1 : 1;
  const page = Math.min(requestedPage, lastPage);
  const startIndex = (page - 1) * pageSize;
  const items = sortedTransactions.slice(startIndex, startIndex + pageSize);
  const firstResult = total === 0 ? 0 : startIndex + 1;
  const lastResult = Math.min(startIndex + pageSize, total);

  return {
    items,
    total,
    page,
    pageSize,
    totalPages,
    firstPage: 1,
    previousPage: page > 1 ? page - 1 : null,
    nextPage: page < totalPages ? page + 1 : null,
    lastPage,
    resultsLabel:
      total === 0
        ? "Nenhuma transação"
        : `Exibindo ${firstResult} a ${lastResult} de ${total} transações`,
  };
}

export function findMockTransaction(transactionId: string) {
  return transactions.find((transaction) => transaction.id === transactionId) ?? null;
}

export function createMockTransaction(request: CreateTransactionRequest) {
  transactionSequence += 1;
  const transaction = createTransaction({
    id: `transaction-${transactionSequence}`,
    ...request,
  });

  transactions = [transaction, ...transactions];
  return transaction;
}

export function updateMockTransaction(
  transactionId: string,
  request: UpdateTransactionRequest,
) {
  const currentTransaction = findMockTransaction(transactionId);

  if (!currentTransaction) return null;

  const updatedTransaction = createTransaction({
    id: transactionId,
    ...request,
  });

  transactions = transactions.map((transaction) =>
    transaction.id === transactionId ? updatedTransaction : transaction,
  );

  return updatedTransaction;
}

export function deleteMockTransaction(transactionId: string) {
  const currentTransaction = findMockTransaction(transactionId);

  if (!currentTransaction) return false;

  transactions = transactions.filter(
    (transaction) => transaction.id !== transactionId,
  );
  attachments = attachments.filter(
    (attachment) => attachment.transactionId !== transactionId,
  );
  return true;
}

export function getMockDashboardSummary(): DashboardSummaryResponse {
  let totalIncome = 0;
  let totalExpense = 0;

  for (const transaction of transactions) {
    if (transaction.status !== "completed") continue;

    if (transaction.type === "income") {
      totalIncome += Math.abs(transaction.amount);
    } else {
      totalExpense += Math.abs(transaction.amount);
    }
  }

  const balance = totalIncome - totalExpense;

  return {
    balance: createDashboardAmount(balance),
    totalIncome: createDashboardAmount(totalIncome),
    totalExpense: createDashboardAmount(totalExpense),
    savings: createDashboardAmount(balance),
  };
}

export function getMockDashboardHome(): DashboardHomeResponse {
  return {
    ...mockDashboardHomeFixture,
    recentTransactions: {
      ...mockDashboardHomeFixture.recentTransactions,
      firstTransaction: transactions[0] ?? null,
      secondTransaction: transactions[1] ?? null,
      thirdTransaction: transactions[2] ?? null,
      fourthTransaction: transactions[3] ?? null,
      fifthTransaction: transactions[4] ?? null,
    },
  };
}

export function listMockAttachments(transactionId: string) {
  return attachments.filter(
    (attachment) => attachment.transactionId === transactionId,
  );
}

export function createMockAttachment(
  transactionId: string,
  request: CreateAttachmentRequest,
) {
  attachmentSequence += 1;
  const attachmentId = `attachment-${attachmentSequence}`;
  const attachment: TransactionAttachment = {
    id: attachmentId,
    transactionId,
    fileName: request.file.name,
    contentType: request.file.type,
    size: request.file.size,
    formattedSize: formatFileSize(request.file.size),
    uploadedAt: "2026-07-23T12:00:00.000Z",
    downloadUrl: `/api/attachments/${attachmentId}/content`,
  };

  attachments = [attachment, ...attachments];
  return attachment;
}

export function deleteMockAttachment(attachmentId: string) {
  const attachment = attachments.find((item) => item.id === attachmentId);

  if (!attachment) return false;

  attachments = attachments.filter((item) => item.id !== attachmentId);
  return true;
}

function createTransactionFromSeed(seed: MockTransactionSeed) {
  return createTransaction(seed);
}

function createTransaction(seed: MockTransactionSeed): Transaction {
  const amount = seed.type === "income" ? Math.abs(seed.amount) : -Math.abs(seed.amount);
  const observation = seed.observation?.trim() ?? "";

  return {
    id: seed.id,
    description: seed.description.trim(),
    observation,
    amount,
    formattedAmount: `${seed.type === "income" ? "+" : "-"}${formatCurrency(Math.abs(amount))}`,
    type: seed.type,
    typeLabel: seed.type === "income" ? "Entrada" : "Saída",
    category: seed.category,
    date: seed.date,
    formattedDate: formatDate(seed.date),
    status: seed.status,
    statusLabel: getStatusLabel(seed.status),
    editableFields: {
      description: seed.description.trim(),
      amount: Math.abs(seed.amount),
      type: seed.type,
      category: seed.category,
      date: seed.date,
      status: seed.status,
      observation,
    },
  };
}

function createDashboardAmount(value: number): DashboardAmount {
  return {
    value,
    formattedValue: formatCurrency(value),
  };
}

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function formatDate(value: string) {
  return new Date(`${value}T12:00:00`).toLocaleDateString("pt-BR");
}

function formatFileSize(size: number) {
  if (size < 1024) return `${size} bytes`;
  return `${Math.round(size / 1024)} KB`;
}

function getStatusLabel(status: Transaction["status"]) {
  if (status === "completed") return "Concluída";
  if (status === "pending") return "Pendente";
  return "Falhou";
}

function normalizeSearch(value: string) {
  return value
    .trim()
    .toLocaleLowerCase("pt-BR")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

function createTransactionComparator(sort: TransactionSort) {
  if (sort === "date-asc") {
    return (first: Transaction, second: Transaction) =>
      first.date.localeCompare(second.date);
  }

  if (sort === "amount-desc") {
    return (first: Transaction, second: Transaction) =>
      Math.abs(second.amount) - Math.abs(first.amount);
  }

  if (sort === "amount-asc") {
    return (first: Transaction, second: Transaction) =>
      Math.abs(first.amount) - Math.abs(second.amount);
  }

  if (sort === "description-asc") {
    return (first: Transaction, second: Transaction) =>
      first.description.localeCompare(second.description, "pt-BR");
  }

  if (sort === "description-desc") {
    return (first: Transaction, second: Transaction) =>
      second.description.localeCompare(first.description, "pt-BR");
  }

  return (first: Transaction, second: Transaction) =>
    second.date.localeCompare(first.date);
}

resetMockState();
