import type { TransactionInput } from "@/api/contracts";

export interface CreateTransactionVariables {
  input: TransactionInput;
  attachment: File | null;
}

export interface UpdateTransactionVariables {
  transactionId: string;
  input: TransactionInput;
  attachment: File | null;
}
