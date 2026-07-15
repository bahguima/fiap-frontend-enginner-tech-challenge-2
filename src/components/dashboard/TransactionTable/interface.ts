import type { Transaction } from "@/api/contracts";

export interface TransactionTableProps {
  "data-testid"?: string;
  data: Transaction[];
  onView?: (transaction: Transaction) => void;
  onEdit?: (transaction: Transaction) => void;
  onDelete?: (transaction: Transaction) => void;
}

export interface TransactionActionsMenuProps
  extends Pick<TransactionTableProps, "onView" | "onEdit" | "onDelete"> {
  transaction: Transaction;
}

export interface StatusIconProps {
  status: Transaction["status"];
}

export type HeaderCellAlign = "left" | "right";
