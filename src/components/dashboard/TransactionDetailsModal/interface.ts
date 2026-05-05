import type { Transaction } from "@/data/transactions";

export interface TransactionDetailsModalProps {
  open: boolean;
  transaction?: Transaction | null;
  onOpenChange: (open: boolean) => void;
}
