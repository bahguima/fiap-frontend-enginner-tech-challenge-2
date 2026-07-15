import type { Transaction } from "@/api/contracts";

export interface TransactionDetailsModalProps {
  open: boolean;
  transaction?: Transaction | null;
  onOpenChange: (open: boolean) => void;
}
