import type { Transaction } from "@/data/transactions";

import type { TransactionFormValues } from "./schema";

export interface ITransactionFormModalProps {
  mode: "create" | "edit";
  open: boolean;
  transaction?: Transaction | null;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: TransactionFormValues) => void;
}
