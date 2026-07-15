import type { CategorySuggestionInput, TransactionFilters } from "@/api/contracts";

export const transactionQueryKeys = {
  all: ["transactions"],
  lists: () => ["transactions", "list"],
  list: (filters: TransactionFilters) => ["transactions", "list", filters],
  dashboard: () => ["transactions", "dashboard"],
  categorySuggestion: (input: CategorySuggestionInput) => ["transactions", "category-suggestion", input],
  create: () => ["transactions", "create"],
  update: () => ["transactions", "update"],
  delete: () => ["transactions", "delete"],
};
