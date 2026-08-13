import type { Transaction } from "@banking/shared/types";
export interface TransactionDetailsModalProps {
    "data-testid"?: string;
    open: boolean;
    transaction?: Transaction | null;
    onOpenChange: (open: boolean) => void;
}
