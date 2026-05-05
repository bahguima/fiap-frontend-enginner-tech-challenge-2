"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  formatSignedCurrency,
  getTransactionStatusLabel,
  getTransactionTypeLabel,
} from "@/lib/transactions";

import type { TransactionDetailsModalProps } from "./interface";
import { DetailsLabel, DetailsList, DetailsRow, DetailsValue } from "./styled";

export function TransactionDetailsModal({ open, transaction, onOpenChange }: TransactionDetailsModalProps) {
  if (!transaction) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detalhes da Transação</DialogTitle>
          <DialogDescription>Informações completas do registro.</DialogDescription>
        </DialogHeader>

        <DetailsList>
          <DetailsRow>
            <DetailsLabel>Transação</DetailsLabel>
            <DetailsValue>{transaction.description}</DetailsValue>
          </DetailsRow>
          <DetailsRow>
            <DetailsLabel>Categoria</DetailsLabel>
            <DetailsValue>{transaction.category}</DetailsValue>
          </DetailsRow>
          <DetailsRow>
            <DetailsLabel>Tipo</DetailsLabel>
            <DetailsValue>{getTransactionTypeLabel(transaction.type)}</DetailsValue>
          </DetailsRow>
          <DetailsRow>
            <DetailsLabel>Data</DetailsLabel>
            <DetailsValue>{transaction.date}</DetailsValue>
          </DetailsRow>
          <DetailsRow>
            <DetailsLabel>Status</DetailsLabel>
            <DetailsValue>{getTransactionStatusLabel(transaction.status)}</DetailsValue>
          </DetailsRow>
          <DetailsRow>
            <DetailsLabel>Valor</DetailsLabel>
            <DetailsValue>{formatSignedCurrency(transaction)}</DetailsValue>
          </DetailsRow>
        </DetailsList>
      </DialogContent>
    </Dialog>
  );
}
