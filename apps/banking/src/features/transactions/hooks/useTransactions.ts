"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  CreateTransactionRequest,
  TransactionListFilters,
  UpdateTransactionRequest,
} from "@banking/shared/types";
import { transactionsApi } from "@banking/shared/api-client/transactions";
import { dashboardQueryKeys } from "@/features/dashboard/api/queryKeys";
import { transactionQueryKeys } from "../api/queryKeys";

export interface UpdateTransactionVariables {
  transactionId: string;
  transaction: UpdateTransactionRequest;
}

export function useTransactionsQuery(
  filters: TransactionListFilters = {},
) {
  return useQuery({
    queryKey: transactionQueryKeys.list(filters),
    queryFn: ({ signal }) => transactionsApi.list(filters, signal),
  });
}

export function useCreateTransactionMutation() {
  const invalidateResources = useInvalidateTransactionResources();

  return useMutation({
    mutationFn: (transaction: CreateTransactionRequest) =>
      transactionsApi.create(transaction),
    onSuccess: invalidateResources,
  });
}

export function useUpdateTransactionMutation() {
  const invalidateResources = useInvalidateTransactionResources();

  return useMutation({
    mutationFn: ({ transactionId, transaction }: UpdateTransactionVariables) =>
      transactionsApi.update(transactionId, transaction),
    onSuccess: invalidateResources,
  });
}

export function useDeleteTransactionMutation() {
  const invalidateResources = useInvalidateTransactionResources();

  return useMutation({
    mutationFn: (transactionId: string) =>
      transactionsApi.remove(transactionId),
    onSuccess: invalidateResources,
  });
}

function useInvalidateTransactionResources() {
  const queryClient = useQueryClient();

  return () =>
    Promise.all([
      queryClient.invalidateQueries({ queryKey: transactionQueryKeys.all }),
      queryClient.invalidateQueries({ queryKey: dashboardQueryKeys.all }),
    ]);
}
