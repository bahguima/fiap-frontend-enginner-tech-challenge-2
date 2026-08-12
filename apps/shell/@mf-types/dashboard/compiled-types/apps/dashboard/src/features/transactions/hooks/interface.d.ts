import type { TransactionListFilters, TransactionSort, TransactionType } from "@banking/shared/types";
export interface ITransactionListUrlState {
    filters: TransactionListFilters;
    hasActiveFilters: boolean;
    applyFilters: (filters: TransactionListFilters) => void;
    clearFilters: () => void;
    goToPage: (page: number) => void;
}
export interface ITransactionSearchParamsValues {
    search?: string;
    type?: TransactionType;
    category?: string;
    startDate?: string;
    endDate?: string;
    minimumAmount?: number;
    maximumAmount?: number;
    sort: TransactionSort;
    page: number;
    pageSize: number;
}
