import { http, HttpResponse } from "msw";
import type {
  ApiErrorResponse,
  ApiMessageResponse,
  CreateTransactionRequest,
  Transaction,
  TransactionListFilters,
  TransactionListResponse,
  UpdateTransactionRequest,
} from "@banking/shared/types";
import { mockApiEndpoints } from "@banking/shared/api-client/endpoints";
import {
  createMockTransaction,
  deleteMockTransaction,
  listMockTransactions,
  updateMockTransaction,
} from "../state";
import { mockCategories } from "../fixtures/categories";
import { applyMockBehavior, createErrorResponse } from "./behavior";

export interface TransactionPathParams {
  transactionId: string;
}

export const transactionHandlers = [
  http.get<never, never, TransactionListResponse | ApiErrorResponse>(
    mockApiEndpoints.transactions.list,
    async ({ request }) => {
      const forcedError = await applyMockBehavior(request, { status: 503 });
      if (forcedError) return forcedError;

      const url = new URL(request.url);
      const filters = createFilters(url);
      return HttpResponse.json<TransactionListResponse>(
        listMockTransactions(filters),
      );
    },
  ),
  http.post<never, CreateTransactionRequest, Transaction | ApiErrorResponse>(
    mockApiEndpoints.transactions.list,
    async ({ request }) => {
      const forcedError = await applyMockBehavior(request, { status: 503 });
      if (forcedError) return forcedError;

      const transaction = await request.json();
      const validationError = validateTransaction(transaction);
      if (validationError) return validationError;

      return HttpResponse.json<Transaction>(
        createMockTransaction(transaction),
        { status: 201 },
      );
    },
  ),
  http.put<
    TransactionPathParams,
    UpdateTransactionRequest,
    Transaction | ApiErrorResponse
  >(
    mockApiEndpoints.transactions.detail,
    async ({ params, request }) => {
      const forcedError = await applyMockBehavior(request, { status: 503 });
      if (forcedError) return forcedError;

      const transaction = await request.json();
      const validationError = validateTransaction(transaction);
      if (validationError) return validationError;

      const updatedTransaction = updateMockTransaction(
        params.transactionId,
        transaction,
      );

      if (!updatedTransaction) {
        return createErrorResponse(
          404,
          "NOT_FOUND",
          "Transação não encontrada.",
        );
      }

      return HttpResponse.json<Transaction>(updatedTransaction);
    },
  ),
  http.delete<
    TransactionPathParams,
    never,
    ApiMessageResponse | ApiErrorResponse
  >(
    mockApiEndpoints.transactions.detail,
    async ({ params, request }) => {
      const forcedError = await applyMockBehavior(request, { status: 503 });
      if (forcedError) return forcedError;

      if (!deleteMockTransaction(params.transactionId)) {
        return createErrorResponse(
          404,
          "NOT_FOUND",
          "Transação não encontrada.",
        );
      }

      return HttpResponse.json<ApiMessageResponse>({
        message: "Transação excluída com sucesso.",
      });
    },
  ),
];

function createFilters(url: URL): TransactionListFilters {
  const type = url.searchParams.get("type");
  const status = url.searchParams.get("status");
  const category = url.searchParams.get("category");
  const sort = url.searchParams.get("sort");

  return {
    search: resolveText(url.searchParams.get("search")),
    type: type === "income" || type === "expense" ? type : undefined,
    status:
      status === "completed" || status === "pending" || status === "failed"
        ? status
        : undefined,
    category: category ?? undefined,
    startDate: resolveText(url.searchParams.get("startDate")),
    endDate: resolveText(url.searchParams.get("endDate")),
    minimumAmount: resolveNonNegativeNumber(
      url.searchParams.get("minimumAmount"),
    ),
    maximumAmount: resolveNonNegativeNumber(
      url.searchParams.get("maximumAmount"),
    ),
    sort:
      sort === "date-desc" ||
      sort === "date-asc" ||
      sort === "amount-desc" ||
      sort === "amount-asc" ||
      sort === "description-asc" ||
      sort === "description-desc"
        ? sort
        : undefined,
    page: resolvePositiveInteger(url.searchParams.get("page")),
    pageSize: resolvePositiveInteger(url.searchParams.get("pageSize")),
    limit: resolvePositiveInteger(url.searchParams.get("limit")),
  };
}

function resolveText(value: string | null) {
  const normalizedValue = value?.trim();
  return normalizedValue ? normalizedValue : undefined;
}

function resolvePositiveInteger(value: string | null) {
  if (!value || !/^\d+$/.test(value)) return undefined;
  const parsedValue = parseInt(value, 10);
  return parsedValue > 0 ? parsedValue : undefined;
}

function resolveNonNegativeNumber(value: string | null) {
  if (!value || !/^\d+([.,]\d+)?$/.test(value)) return undefined;
  const parsedValue = parseFloat(value.replace(",", "."));
  return parsedValue >= 0 ? parsedValue : undefined;
}

function validateTransaction(
  transaction: CreateTransactionRequest | UpdateTransactionRequest,
) {
  const details: Record<string, string[]> = {};

  if (transaction.description.trim().length < 3) {
    details.description = ["Informe uma descrição com pelo menos 3 caracteres."];
  }

  if (transaction.description.trim().length > 120) {
    details.description = ["A descrição deve ter no máximo 120 caracteres."];
  }

  if (transaction.amount < 0.01 || transaction.amount > 999999999.99) {
    details.amount = [
      "Informe um valor entre R$ 0,01 e R$ 999.999.999,99.",
    ];
  }

  const category = mockCategories.find(
    (item) => item.name === transaction.category,
  );

  if (!category) {
    details.category = ["Selecione uma categoria fornecida pela API."];
  } else if (category.type !== "both" && category.type !== transaction.type) {
    details.category = [
      "A categoria selecionada não é compatível com o tipo da transação.",
    ];
  }

  if (!isValidTransactionDate(transaction.date)) {
    details.date = ["Informe uma data válida que não esteja no futuro."];
  }

  if ((transaction.observation ?? "").trim().length > 500) {
    details.observation = [
      "A observação deve ter no máximo 500 caracteres.",
    ];
  }

  if (Object.keys(details).length === 0) return null;

  return createErrorResponse(
    422,
    "VALIDATION_ERROR",
    "Os dados da transação são inválidos.",
    details,
  );
}

function isValidTransactionDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

  const parsedDate = new Date(`${value}T12:00:00`);
  if (Number.isNaN(parsedDate.getTime())) return false;

  const normalizedDate = [
    parsedDate.getFullYear().toString().padStart(4, "0"),
    (parsedDate.getMonth() + 1).toString().padStart(2, "0"),
    parsedDate.getDate().toString().padStart(2, "0"),
  ].join("-");

  return normalizedDate === value && value <= getCurrentDateValue();
}

function getCurrentDateValue() {
  const currentDate = new Date();

  return [
    currentDate.getFullYear().toString().padStart(4, "0"),
    (currentDate.getMonth() + 1).toString().padStart(2, "0"),
    currentDate.getDate().toString().padStart(2, "0"),
  ].join("-");
}
