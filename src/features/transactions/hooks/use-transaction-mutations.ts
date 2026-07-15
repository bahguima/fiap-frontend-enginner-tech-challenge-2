"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { attachmentsApi, transactionsApi } from "@/api";
import type { CreateTransactionVariables, UpdateTransactionVariables } from "../interface";
import { transactionQueryKeys } from "../query-keys";

export function useTransactionMutations(accessToken: string | null) {
  const queryClient = useQueryClient();
  const invalidateTransactions = () =>
    queryClient.invalidateQueries({ queryKey: transactionQueryKeys.all });

  const createTransaction = useMutation({
    mutationKey: transactionQueryKeys.create(),
    mutationFn: async ({ input, attachment }: CreateTransactionVariables) => {
      const token = getAccessToken(accessToken);
      const response = await transactionsApi.create(token, input);
      if (attachment) await attachmentsApi.upload(token, response.data.id, attachment);
      return response;
    },
    onSuccess: invalidateTransactions,
  });

  const updateTransaction = useMutation({
    mutationKey: transactionQueryKeys.update(),
    mutationFn: async ({ transactionId, input, attachment }: UpdateTransactionVariables) => {
      const token = getAccessToken(accessToken);
      const response = await transactionsApi.update(token, transactionId, input);
      if (attachment) await attachmentsApi.upload(token, transactionId, attachment);
      return response;
    },
    onSuccess: invalidateTransactions,
  });

  const deleteTransaction = useMutation({
    mutationKey: transactionQueryKeys.delete(),
    mutationFn: (transactionId: string) =>
      transactionsApi.delete(getAccessToken(accessToken), transactionId),
    onSuccess: invalidateTransactions,
  });

  return { createTransaction, updateTransaction, deleteTransaction };
}

function getAccessToken(accessToken: string | null): string {
  if (!accessToken) {
    throw new Error("A sessão autenticada é obrigatória para alterar transações.");
  }

  return accessToken;
}
