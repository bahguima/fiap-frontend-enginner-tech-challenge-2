"use client";

import { Plus } from "lucide-react";
import { DeleteTransactionModal } from "@/components/dashboard/DeleteTransactionModal";
import { TransactionDetailsModal } from "@/components/dashboard/TransactionDetailsModal";
import { TransactionTable } from "@/components/dashboard/TransactionTable";
import { TransactionFormModal } from "@/components/form/TransactionFormModal";
import { Button } from "@/components/ui/button";
import { useTransactions } from "@/contexts/TransactionsContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTransactionDialogs } from "@/hooks/use-transaction-dialogs";
import type { TransactionFormValues } from "@/lib/transactions";
import { PageStack, PageSubtitle, PageTitle } from "@/styles/shared";

import { PageHeader } from "./styled";

export default function StatementPage() {
  const { t } = useLanguage();
  const { transactions, addTransaction, updateTransaction, deleteTransaction } = useTransactions();
  const { dialog, selectedTransaction, openCreate, openDetails, openEdit, openDelete, closeDialog } = useTransactionDialogs();

  const handleDialogOpenChange = (isOpen: boolean) => {
    if (!isOpen) closeDialog();
  };

  const handleUpdateTransaction = (values: TransactionFormValues) => {
    if (!selectedTransaction) return;
    updateTransaction(selectedTransaction.id, values);
  };

  const handleDeleteTransaction = () => {
    if (!selectedTransaction) return;
    deleteTransaction(selectedTransaction.id);
  };

  return (
    <PageStack $gap="1.5rem">
      <PageHeader>
        <div>
          <PageTitle>{t("statement.title")}</PageTitle>
          <PageSubtitle>{t("statement.subtitle")}</PageSubtitle>
        </div>
        <Button type="button" onClick={openCreate}>
          <Plus />
          Nova Transação
        </Button>
      </PageHeader>

      <TransactionTable data={transactions} onView={openDetails} onEdit={openEdit} onDelete={openDelete} />

      <TransactionFormModal mode="create" open={dialog === "create"} onOpenChange={handleDialogOpenChange} onSubmit={addTransaction} />
      <TransactionFormModal
        mode="edit"
        open={dialog === "edit"}
        transaction={selectedTransaction}
        onOpenChange={handleDialogOpenChange}
        onSubmit={handleUpdateTransaction}
      />
      <TransactionDetailsModal open={dialog === "details"} transaction={selectedTransaction} onOpenChange={handleDialogOpenChange} />
      <DeleteTransactionModal
        open={dialog === "delete"}
        transaction={selectedTransaction}
        onOpenChange={handleDialogOpenChange}
        onConfirm={handleDeleteTransaction}
      />
    </PageStack>
  );
}
