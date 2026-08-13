import type { Transaction } from "@banking/shared/types";

export interface TransactionTableProps {
  "data-testid"?: string;
  data: Transaction[];
  onView?: (transactionId: string) => void;
  onEdit?: (transactionId: string) => void;
  onDelete?: (transactionId: string) => void;
}

export interface TransactionActionsMenuProps
  extends Pick<TransactionTableProps, "onView" | "onEdit" | "onDelete"> {
  transaction: Transaction;
}

export interface StatusIconProps {
  status: Transaction["status"];
}

export type HeaderCellAlign = "left" | "right";
