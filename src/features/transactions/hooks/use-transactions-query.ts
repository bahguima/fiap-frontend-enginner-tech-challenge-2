"use client";

import { useQuery } from "@tanstack/react-query";
import type { CategorySuggestionInput, TransactionFilters } from "@/api/contracts";
import { categoriesApi, dashboardApi, transactionsApi } from "@/api";
import { transactionQueryKeys } from "../query-keys";

export function useTransactionsQuery(
  accessToken: string | null,
  filters: TransactionFilters,
) {
  return useQuery({
    queryKey: transactionQueryKeys.list(filters),
    queryFn: () => transactionsApi.list(getAccessToken(accessToken), filters),
    enabled: accessToken !== null,
  });
}

export function useTransactionsDashboardQuery(accessToken: string | null) {
  return useQuery({
    queryKey: transactionQueryKeys.dashboard(),
    queryFn: () => dashboardApi.get(getAccessToken(accessToken)),
    enabled: accessToken !== null,
  });
}

export function useCategorySuggestionQuery(
  accessToken: string | null,
  input: CategorySuggestionInput,
  enabled: boolean,
) {
  return useQuery({
    queryKey: transactionQueryKeys.categorySuggestion(input),
    queryFn: () => categoriesApi.suggest(getAccessToken(accessToken), input),
    enabled: accessToken !== null && enabled,
  });
}

function getAccessToken(accessToken: string | null): string {
  if (!accessToken) {
    throw new Error("A sessão autenticada é obrigatória para consultar transações.");
  }

  return accessToken;
}
