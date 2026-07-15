import type { ReactNode } from "react";
import { act, renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { TransactionInput } from "@/api/contracts";
import { mockAccessToken } from "@/mocks/fixtures/auth";
import { useTransactionMutations } from "./use-transaction-mutations";
import {
  useTransactionsDashboardQuery,
  useTransactionsQuery,
} from "./use-transactions-query";

const transactionInput: TransactionInput = {
  description: "Receita criada pelo hook",
  amount: 500,
  type: "income",
  categoryId: "deposit",
  date: "2026-07-14",
  status: "completed",
};

describe("hooks de transações", () => {
  it("consulta a lista REST com os filtros informados", async () => {
    const queryClient = createQueryClient();
    const { result } = renderHook(
      () => useTransactionsQuery(mockAccessToken, { page: 1, pageSize: 100, type: "income" }),
      { wrapper: createWrapper(queryClient) },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.data.length).toBeGreaterThan(0);
    expect(result.current.data?.data.every((transaction) => transaction.type === "income")).toBe(true);
  });

  it("invalida e atualiza o dashboard após criar uma transação", async () => {
    const queryClient = createQueryClient();
    const { result } = renderHook(
      () => ({
        dashboard: useTransactionsDashboardQuery(mockAccessToken),
        mutations: useTransactionMutations(mockAccessToken),
      }),
      { wrapper: createWrapper(queryClient) },
    );

    await waitFor(() => expect(result.current.dashboard.isSuccess).toBe(true));
    const initialTotal = result.current.dashboard.data?.summary.formattedTotalIncome;

    await act(async () => {
      await result.current.mutations.createTransaction.mutateAsync({ input: transactionInput, attachment: null });
    });

    await waitFor(() => {
      expect(result.current.dashboard.data?.summary.formattedTotalIncome).not.toBe(initialTotal);
      expect(result.current.dashboard.data?.recentTransactions[0]?.description).toBe(
        transactionInput.description,
      );
    });
  });
});

function createQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
}

function createWrapper(queryClient: QueryClient) {
  return function QueryWrapper({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  };
}
