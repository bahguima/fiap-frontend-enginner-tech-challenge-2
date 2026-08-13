import type { TransactionListFilters } from "@banking/shared/types";

export interface TransactionQueryKeys {
  all: readonly ["transactions"];
  lists: () => readonly ["transactions", "list"];
  categories: () => readonly ["transactions", "categories"];
  attachments: () => readonly ["transactions", "attachments"];
  attachmentList: (
    transactionId: string,
  ) => readonly ["transactions", "attachments", string];
  list: (
    filters: TransactionListFilters,
  ) => readonly ["transactions", "list", TransactionListFilters];
}

export const transactionQueryKeys: TransactionQueryKeys = {
  all: ["transactions"],
  lists: () => ["transactions", "list"],
  categories: () => ["transactions", "categories"],
  attachments: () => ["transactions", "attachments"],
  attachmentList: (transactionId) => [
    "transactions",
    "attachments",
    transactionId,
  ],
  list: (filters) => ["transactions", "list", filters],
};
