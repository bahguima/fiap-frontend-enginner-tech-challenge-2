import type { ApiMessageResponse, CreateTransactionRequest, Transaction, TransactionListFilters, TransactionListResponse, UpdateTransactionRequest } from "@banking/shared/types";
export interface TransactionsApi {
    list: (filters?: TransactionListFilters, signal?: AbortSignal) => Promise<TransactionListResponse>;
    create: (transaction: CreateTransactionRequest) => Promise<Transaction>;
    update: (transactionId: string, transaction: UpdateTransactionRequest) => Promise<Transaction>;
    remove: (transactionId: string) => Promise<ApiMessageResponse>;
}
export declare const transactionsApi: TransactionsApi;
