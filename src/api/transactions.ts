import type {
  TransactionFilters,
  TransactionInput,
  TransactionResponse,
  TransactionsResponse,
} from "./contracts";
import { apiEndpoints } from "./endpoints";
import { restClient } from "@/lib/http";

export const transactionsApi = {
  list: (accessToken: string, filters: TransactionFilters = {}) =>
    restClient.get<TransactionsResponse>(createListUrl(filters), { accessToken }),
  getById: (accessToken: string, transactionId: string) =>
    restClient.get<TransactionResponse>(apiEndpoints.transactions.detail(transactionId), { accessToken }),
  create: (accessToken: string, input: TransactionInput) =>
    restClient.post<TransactionResponse>(apiEndpoints.transactions.list, { accessToken, body: input }),
  update: (accessToken: string, transactionId: string, input: TransactionInput) =>
    restClient.put<TransactionResponse>(apiEndpoints.transactions.detail(transactionId), {
      accessToken,
      body: input,
    }),
  delete: (accessToken: string, transactionId: string) =>
    restClient.delete(apiEndpoints.transactions.detail(transactionId), { accessToken }),
};

function createListUrl(filters: TransactionFilters): string {
  const searchParams = new URLSearchParams();

  if (filters.page) searchParams.set("page", filters.page.toString());
  if (filters.pageSize) searchParams.set("pageSize", filters.pageSize.toString());
  if (filters.search) searchParams.set("search", filters.search);
  if (filters.type) searchParams.set("type", filters.type);
  if (filters.status) searchParams.set("status", filters.status);
  if (filters.categoryId) searchParams.set("categoryId", filters.categoryId);
  if (filters.startDate) searchParams.set("startDate", filters.startDate);
  if (filters.endDate) searchParams.set("endDate", filters.endDate);

  const query = searchParams.toString();
  return query ? `${apiEndpoints.transactions.list}?${query}` : apiEndpoints.transactions.list;
}
