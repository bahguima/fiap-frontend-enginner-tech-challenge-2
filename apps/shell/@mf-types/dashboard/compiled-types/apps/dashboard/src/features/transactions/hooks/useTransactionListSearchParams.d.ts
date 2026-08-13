import type { TransactionListFilters, TransactionSort } from "@banking/shared/types";
import type { ITransactionListUrlState } from "./interface";
export declare const DEFAULT_TRANSACTION_PAGE_SIZE = 10;
export declare const DEFAULT_TRANSACTION_SORT: TransactionSort;
export declare function useTransactionListSearchParams(): ITransactionListUrlState;
export declare function readTransactionSearchParams(search: string): TransactionListFilters;
export declare function createTransactionSearchParams(filters: TransactionListFilters): string;
