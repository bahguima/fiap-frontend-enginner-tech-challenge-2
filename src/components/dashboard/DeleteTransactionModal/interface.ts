import type { Transaction } from "@/data/transactions";

export interface DeleteTransactionModalProps {
  open: boolean;
  transaction?: Transaction | null;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}
