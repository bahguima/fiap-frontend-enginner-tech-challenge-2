"use client";

import { useState } from "react";
import type { Transaction } from "@/data/transactions";
import type { TransactionDialog, TransactionDialogsState } from "./interface";

export function useTransactionDialogs(): TransactionDialogsState {
  const [dialog, setDialog] = useState<TransactionDialog>(null);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  const openCreate = () => {
    setSelectedTransaction(null);
    setDialog("create");
  };

  const openDetails = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setDialog("details");
  };

  const openEdit = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setDialog("edit");
  };

  const openDelete = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setDialog("delete");
  };

  const closeDialog = () => {
    setDialog(null);
    setSelectedTransaction(null);
  };

  return {
    dialog,
    selectedTransaction,
    openCreate,
    openDetails,
    openEdit,
    openDelete,
    closeDialog,
  };
}
