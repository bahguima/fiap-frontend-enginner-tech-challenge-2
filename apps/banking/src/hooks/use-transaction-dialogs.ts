"use client";

import { useState } from "react";
import type { TransactionDialog, TransactionDialogsState } from "./interface";

export function useTransactionDialogs(): TransactionDialogsState {
  const [dialog, setDialog] = useState<TransactionDialog>(null);
  const [selectedTransactionId, setSelectedTransactionId] = useState<
    string | null
  >(null);

  const openCreate = () => {
    setSelectedTransactionId(null);
    setDialog("create");
  };

  const openDetails = (transactionId: string) => {
    setSelectedTransactionId(transactionId);
    setDialog("details");
  };

  const openEdit = (transactionId: string) => {
    setSelectedTransactionId(transactionId);
    setDialog("edit");
  };

  const openDelete = (transactionId: string) => {
    setSelectedTransactionId(transactionId);
    setDialog("delete");
  };

  const closeDialog = () => {
    setDialog(null);
    setSelectedTransactionId(null);
  };

  return {
    dialog,
    selectedTransactionId,
    openCreate,
    openDetails,
    openEdit,
    openDelete,
    closeDialog,
  };
}
