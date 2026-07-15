export type TransactionCategoryType = "income" | "expense" | "both";

export interface TransactionCategory {
  id: string;
  name: string;
  type: TransactionCategoryType;
}

export interface CategoriesResponse {
  data: TransactionCategory[];
}

export interface CategorySuggestionInput {
  description: string;
  type: "income" | "expense";
}

export interface CategorySuggestionResponse {
  data: TransactionCategory;
}
