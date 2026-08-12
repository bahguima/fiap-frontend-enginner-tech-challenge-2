import type { ReactNode } from "react";
import { act, renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useDashboardSummaryQuery } from "@/features/dashboard/hooks/useDashboard";
import { transactionQueryKeys } from "../api/queryKeys";
import {
  useCreateTransactionMutation,
  useDeleteTransactionMutation,
  useTransactionsQuery,
  useUpdateTransactionMutation,
} from "./useTransactions";

interface TestQueryProviderProps {
  children: ReactNode;
}

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });
}

function createWrapper(queryClient: QueryClient) {
  return function TestQueryProvider({ children }: TestQueryProviderProps) {
    return (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    );
  };
}

function useTransactionScenario() {
  return {
    transactions: useTransactionsQuery(),
    summary: useDashboardSummaryQuery(),
    createTransaction: useCreateTransactionMutation(),
    updateTransaction: useUpdateTransactionMutation(),
    deleteTransaction: useDeleteTransactionMutation(),
  };
}

describe("hooks de transações", () => {
  it("usa chaves centralizadas para listas com filtros", () => {
    expect(transactionQueryKeys.all).toEqual(["transactions"]);
    expect(transactionQueryKeys.lists()).toEqual(["transactions", "list"]);
    expect(transactionQueryKeys.list({ type: "income", limit: 5 })).toEqual([
      "transactions",
      "list",
      { type: "income", limit: 5 },
    ]);
  });

  it("consulta transações filtradas pelo contrato REST", async () => {
    const queryClient = createTestQueryClient();
    const { result } = renderHook(
      () => useTransactionsQuery({ type: "expense", limit: 2 }),
      { wrapper: createWrapper(queryClient) },
    );

    expect(result.current.isPending).toBe(true);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data?.items).toHaveLength(2);
    expect(result.current.data?.total).toBe(4);
    expect(
      result.current.data?.items.every(
        (transaction) => transaction.type === "expense",
      ),
    ).toBe(true);
  });

  it("cria, edita e exclui invalidando listas e resumo", async () => {
    const queryClient = createTestQueryClient();
    const { result } = renderHook(useTransactionScenario, {
      wrapper: createWrapper(queryClient),
    });

    await waitFor(() => {
      expect(result.current.transactions.data?.total).toBe(6);
      expect(result.current.summary.isSuccess).toBe(true);
    });

    await act(async () => {
      await result.current.createTransaction.mutateAsync({
        description: "Nova entrada",
        amount: 350,
        type: "income",
        category: "Transferência",
        date: "2026-07-23",
        status: "completed",
      });
    });

    await waitFor(() => {
      expect(result.current.transactions.data?.total).toBe(7);
      expect(result.current.summary.data?.totalIncome.value).toBe(11050);
    });

    await act(async () => {
      await result.current.updateTransaction.mutateAsync({
        transactionId: "transaction-101",
        transaction: {
          description: "Nova saída",
          amount: 125,
          type: "expense",
          category: "Pagamento",
          date: "2026-07-22",
          status: "completed",
        },
      });
    });

    await waitFor(() => {
      expect(result.current.transactions.data?.items[0]).toMatchObject({
        id: "transaction-101",
        amount: -125,
        formattedAmount: "-R$ 125,00",
      });
      expect(result.current.summary.data?.totalIncome.value).toBe(10700);
      expect(result.current.summary.data?.totalExpense.value).toBe(612.33);
    });

    await act(async () => {
      await result.current.deleteTransaction.mutateAsync("transaction-101");
    });

    await waitFor(() => {
      expect(result.current.transactions.data?.total).toBe(6);
      expect(result.current.summary.data?.totalExpense.value).toBe(487.33);
    });
  });
});
