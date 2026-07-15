import { http, HttpResponse } from "msw";
import type { TransactionInput, TransactionsResponse } from "@/api/contracts";
import { apiEndpoints } from "@/api/endpoints";
import {
  createMockTransaction,
  deleteMockTransaction,
  findMockTransaction,
  listMockTransactions,
  updateMockTransaction,
} from "../database";
import { categoryFixtures } from "../fixtures/categories";
import {
  apiError,
  applyMockState,
  getPathParameter,
  isRecord,
  mockEndpoint,
  requireAuthorization,
} from "./common";

export const transactionHandlers = [
  http.get(mockEndpoint(apiEndpoints.transactions.list), async ({ request }) => {
    const mockResponse = await applyMockState(request);
    if (mockResponse) return mockResponse;

    const unauthorizedResponse = requireAuthorization(request);
    if (unauthorizedResponse) return unauthorizedResponse;

    const requestUrl = new URL(request.url);
    const requestedPage = getPositiveInteger(requestUrl.searchParams.get("page"), 1);
    const pageSize = getPositiveInteger(requestUrl.searchParams.get("pageSize"), 10);
    const search = requestUrl.searchParams.get("search")?.trim().toLocaleLowerCase("pt-BR");
    const type = requestUrl.searchParams.get("type");
    const status = requestUrl.searchParams.get("status");
    const categoryId = requestUrl.searchParams.get("categoryId");
    const startDate = requestUrl.searchParams.get("startDate");
    const endDate = requestUrl.searchParams.get("endDate");
    const hasFilters = Boolean(search || type || status || categoryId || startDate || endDate);
    let transactions = listMockTransactions();

    if (search) {
      transactions = transactions.filter((transaction) =>
        transaction.description.toLocaleLowerCase("pt-BR").includes(search),
      );
    }
    if (type) transactions = transactions.filter((transaction) => transaction.type === type);
    if (status) transactions = transactions.filter((transaction) => transaction.status === status);
    if (categoryId) transactions = transactions.filter((transaction) => transaction.category.id === categoryId);
    if (startDate) transactions = transactions.filter((transaction) => transaction.date >= startDate);
    if (endDate) transactions = transactions.filter((transaction) => transaction.date <= endDate);

    const totalItems = transactions.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
    const page = Math.min(requestedPage, totalPages);
    const startIndex = (page - 1) * pageSize;
    const response: TransactionsResponse = {
      data: transactions.slice(startIndex, startIndex + pageSize),
      meta: {
        page,
        pageSize,
        totalItems,
        totalPages,
        previousPage: page > 1 ? page - 1 : null,
        nextPage: page < totalPages ? page + 1 : null,
      },
      emptyState: totalItems === 0 ? (hasFilters ? "no-results" : "empty") : null,
    };
    return HttpResponse.json(response);
  }),

  http.post(mockEndpoint(apiEndpoints.transactions.list), async ({ request }) => {
    const preparedResponse = await prepareProtectedRequest(request);
    if (preparedResponse) return preparedResponse;

    const input = await readTransactionInput(request);
    if (!input) return transactionValidationError();
    if (!categoryFixtures.some((category) => category.id === input.categoryId)) {
      return apiError(422, "INVALID_CATEGORY", "A categoria informada não existe.");
    }

    return HttpResponse.json({ data: createMockTransaction(input) }, { status: 201 });
  }),

  http.get(mockEndpoint(`${apiEndpoints.transactions.list}/:transactionId`), async ({ request, params }) => {
    const preparedResponse = await prepareProtectedRequest(request);
    if (preparedResponse) return preparedResponse;

    const transactionId = getPathParameter(params.transactionId);
    const transaction = transactionId ? findMockTransaction(transactionId) : null;
    return transaction
      ? HttpResponse.json({ data: transaction })
      : apiError(404, "TRANSACTION_NOT_FOUND", "A transação não foi encontrada.");
  }),

  http.put(mockEndpoint(`${apiEndpoints.transactions.list}/:transactionId`), async ({ request, params }) => {
    const preparedResponse = await prepareProtectedRequest(request);
    if (preparedResponse) return preparedResponse;

    const transactionId = getPathParameter(params.transactionId);
    const input = await readTransactionInput(request);
    if (!input) return transactionValidationError();
    if (!categoryFixtures.some((category) => category.id === input.categoryId)) {
      return apiError(422, "INVALID_CATEGORY", "A categoria informada não existe.");
    }

    const transaction = transactionId ? updateMockTransaction(transactionId, input) : null;
    return transaction
      ? HttpResponse.json({ data: transaction })
      : apiError(404, "TRANSACTION_NOT_FOUND", "A transação não foi encontrada.");
  }),

  http.delete(mockEndpoint(`${apiEndpoints.transactions.list}/:transactionId`), async ({ request, params }) => {
    const preparedResponse = await prepareProtectedRequest(request);
    if (preparedResponse) return preparedResponse;

    const transactionId = getPathParameter(params.transactionId);
    return transactionId && deleteMockTransaction(transactionId)
      ? new HttpResponse(null, { status: 204 })
      : apiError(404, "TRANSACTION_NOT_FOUND", "A transação não foi encontrada.");
  }),
];

async function prepareProtectedRequest(request: Request): Promise<Response | null> {
  const mockResponse = await applyMockState(request);
  return mockResponse ?? requireAuthorization(request);
}

async function readTransactionInput(request: Request): Promise<TransactionInput | null> {
  try {
    const payload: unknown = await request.json();
    return isTransactionInput(payload) ? payload : null;
  } catch {
    return null;
  }
}

function isTransactionInput(value: unknown): value is TransactionInput {
  if (!isRecord(value)) return false;
  const validType = value.type === "income" || value.type === "expense";
  const validStatus = value.status === "completed" || value.status === "pending" || value.status === "failed";
  return (
    typeof value.description === "string" &&
    value.description.trim().length >= 3 &&
    typeof value.amount === "number" &&
    Number.isFinite(value.amount) &&
    value.amount > 0 &&
    validType &&
    typeof value.categoryId === "string" &&
    typeof value.date === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(value.date) &&
    validStatus
  );
}

function transactionValidationError(): Response {
  return apiError(422, "VALIDATION_ERROR", "Os dados da transação são inválidos.");
}

function getPositiveInteger(value: string | null, fallback: number): number {
  if (!value) return fallback;
  const parsedValue = parseInt(value, 10);
  return Number.isNaN(parsedValue) || parsedValue < 1 ? fallback : parsedValue;
}
