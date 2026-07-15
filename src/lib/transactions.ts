import type { Transaction } from "@/api/contracts";
import {
  transactionCategoryOptions,
  transactionStatusOptions,
  transactionTypeOptions,
} from "@/components/form/TransactionFormModal/schema";
import type { TransactionFormValues } from "@/components/form/TransactionFormModal/schema";

export {
  transactionCategoryOptions,
  transactionFormSchema,
  transactionStatusOptions,
  transactionTypeOptions,
} from "@/components/form/TransactionFormModal/schema";
export type { TransactionFormValues } from "@/components/form/TransactionFormModal/schema";

export function getDefaultTransactionFormValues(): TransactionFormValues {
  return {
    description: "",
    type: "income",
    categoryId: "deposit",
    amount: 0,
    date: formatDateInput(new Date()),
    status: "completed",
  };
}

export function getTransactionFormValues(transaction: Transaction): TransactionFormValues {
  return transaction.formInput;
}

function formatDateInput(date: Date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}
