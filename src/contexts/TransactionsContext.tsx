"use client";

import { createContext, useCallback, useContext, useMemo, useReducer } from "react";
import { transactions as initialTransactions } from "@/data/transactions";
import type { Transaction } from "@/data/transactions";
import {
  calculateTransactionSummary,
  createTransactionFromForm,
  updateTransactionFromForm,
} from "@/lib/transactions";
import type { TransactionFormValues } from "@/lib/transactions";
import type { ContextProviderProps, TransactionsAction, TransactionsContextValue } from "./interface";

const TransactionsContext = createContext<TransactionsContextValue | null>(null);

export function transactionsReducer(state: Transaction[], action: TransactionsAction): Transaction[] {
  switch (action.type) {
    case "add":
      return [action.transaction, ...state];
    case "update":
      return state.map((transaction) =>
        transaction.id === action.id ? updateTransactionFromForm(transaction, action.values) : transaction,
      );
    case "delete":
      return state.filter((transaction) => transaction.id !== action.id);
    default:
      return state;
  }
}

export function TransactionsProvider({ children }: ContextProviderProps) {
  const [transactions, dispatch] = useReducer(transactionsReducer, initialTransactions);

  const addTransaction = useCallback((values: TransactionFormValues) => {
    dispatch({ type: "add", transaction: createTransactionFromForm(values, createTransactionId()) });
  }, []);

  const updateTransaction = useCallback((id: string, values: TransactionFormValues) => {
    dispatch({ type: "update", id, values });
  }, []);

  const deleteTransaction = useCallback((id: string) => {
    dispatch({ type: "delete", id });
  }, []);

  const summary = useMemo(() => calculateTransactionSummary(transactions), [transactions]);

  const value = useMemo(
    () => ({
      transactions,
      summary,
      addTransaction,
      updateTransaction,
      deleteTransaction,
    }),
    [addTransaction, deleteTransaction, summary, transactions, updateTransaction],
  );

  return <TransactionsContext.Provider value={value}>{children}</TransactionsContext.Provider>;
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  if (!context) {
    throw new Error("useTransactions must be used inside TransactionsProvider");
  }

  return context;
}

function createTransactionId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
