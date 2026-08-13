"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@banking/shared/ui/components/dialog";
import type { TransactionDetailsModalProps } from "./interface";
import { DetailsLabel, DetailsList, DetailsRow, DetailsValue } from "./styled";

export function TransactionDetailsModal({
  "data-testid": dataTestId,
  open,
  transaction,
  onOpenChange,
}: TransactionDetailsModalProps) {
  if (!transaction) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent data-testid={dataTestId}>
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
            <DetailsValue>{transaction.typeLabel}</DetailsValue>
          </DetailsRow>
          <DetailsRow>
            <DetailsLabel>Data</DetailsLabel>
            <DetailsValue>{transaction.formattedDate}</DetailsValue>
          </DetailsRow>
          <DetailsRow>
            <DetailsLabel>Status</DetailsLabel>
            <DetailsValue>{transaction.statusLabel}</DetailsValue>
          </DetailsRow>
          <DetailsRow>
            <DetailsLabel>Valor</DetailsLabel>
            <DetailsValue>{transaction.formattedAmount}</DetailsValue>
          </DetailsRow>
        </DetailsList>
      </DialogContent>
    </Dialog>
  );
}
