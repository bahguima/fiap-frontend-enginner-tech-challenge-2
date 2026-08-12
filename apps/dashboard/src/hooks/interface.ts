export type TransactionDialog = "create" | "details" | "edit" | "delete" | null;

export interface TransactionDialogsState {
  dialog: TransactionDialog;
  selectedTransactionId: string | null;
  openCreate: () => void;
  openDetails: (transactionId: string) => void;
  openEdit: (transactionId: string) => void;
  openDelete: (transactionId: string) => void;
  closeDialog: () => void;
}
