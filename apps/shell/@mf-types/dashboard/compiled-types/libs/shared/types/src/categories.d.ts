import type { TransactionType } from "./transactions";
export type CategoryTransactionType = TransactionType | "both";
export interface TransactionCategory {
    id: string;
    name: string;
    type: CategoryTransactionType;
}
export interface CategoryListResponse {
    items: TransactionCategory[];
}
