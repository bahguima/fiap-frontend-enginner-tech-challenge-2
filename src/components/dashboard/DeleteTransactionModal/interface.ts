import type { Transaction } from "@/api/contracts";

export interface DeleteTransactionModalProps {
  open: boolean;
  transaction?: Transaction | null;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}
