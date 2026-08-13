import type { TransactionListFilters } from "@banking/shared/types";

export interface TransactionQueryKeys {
  all: readonly ["transactions"];
  lists: () => readonly ["transactions", "list"];
  list: (
    filters: TransactionListFilters,
  ) => readonly ["transactions", "list", TransactionListFilters];
}

export const transactionQueryKeys: TransactionQueryKeys = {
  all: ["transactions"],
  lists: () => ["transactions", "list"],
  list: (filters) => ["transactions", "list", filters],
};
