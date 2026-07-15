import type { Transaction } from "@/api/contracts";

import type { TransactionFormValues } from "./schema";

export interface ITransactionFormModalProps {
  "data-testid"?: string;
  mode: "create" | "edit";
  open: boolean;
  transaction?: Transaction | null;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: TransactionFormValues, attachment: File | null) => void;
}
