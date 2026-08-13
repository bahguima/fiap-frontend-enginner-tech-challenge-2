"use client";

import { Plus } from "lucide-react";
import { DeleteTransactionModal } from "@/components/dashboard/DeleteTransactionModal";
import { TransactionDetailsModal } from "@/components/dashboard/TransactionDetailsModal";
import { TransactionTable } from "@/components/dashboard/TransactionTable";
import { TransactionFormModal } from "@/components/form/TransactionFormModal";
import type { TransactionFormValues } from "@/components/form/TransactionFormModal/schema";
import { QueryState } from "@banking/shared/ui/components/QueryState";
import { Button } from "@banking/shared/ui/components/button";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  useCreateTransactionMutation,
  useDeleteTransactionMutation,
  useTransactionsQuery,
  useUpdateTransactionMutation,
} from "@/features/transactions/hooks/useTransactions";
import { useTransactionDialogs } from "@/hooks/use-transaction-dialogs";
import { PageStack, PageSubtitle, PageTitle } from "@banking/shared/ui/styles/shared";

import { PageHeader } from "./styled";

export default function StatementPage() {
  const { t } = useLanguage();
  const transactionsQuery = useTransactionsQuery();
  const createTransaction = useCreateTransactionMutation();
  const updateTransaction = useUpdateTransactionMutation();
  const deleteTransaction = useDeleteTransactionMutation();
  const {
    dialog,
    selectedTransactionId,
    openCreate,
    openDetails,
    openEdit,
    openDelete,
    closeDialog,
  } = useTransactionDialogs();
  const selectedTransaction =
    transactionsQuery.data?.items.find(
      (transaction) => transaction.id === selectedTransactionId,
    ) ?? null;

  const handleDialogOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      createTransaction.reset();
      updateTransaction.reset();
      deleteTransaction.reset();
      closeDialog();
    }
  };

  const handleCreateTransaction = (values: TransactionFormValues) => {
    createTransaction.mutate(values, { onSuccess: closeDialog });
  };

  const handleUpdateTransaction = (values: TransactionFormValues) => {
    if (!selectedTransaction) return;
    updateTransaction.mutate(
      {
        transactionId: selectedTransaction.id,
        transaction: values,
      },
      { onSuccess: closeDialog },
    );
  };

  const handleDeleteTransaction = () => {
    if (!selectedTransaction) return;
    deleteTransaction.mutate(selectedTransaction.id, {
      onSuccess: closeDialog,
    });
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

      {transactionsQuery.isPending && (
        <QueryState kind="loading" message="Carregando extrato..." />
      )}
      {transactionsQuery.isError && (
        <QueryState
          kind="error"
          message="Não foi possível carregar o extrato."
          onRetry={() => transactionsQuery.refetch()}
        />
      )}
      {transactionsQuery.data?.items.length === 0 && (
        <QueryState kind="empty" message="Nenhuma transação encontrada." />
      )}
      {transactionsQuery.data && transactionsQuery.data.items.length > 0 && (
        <TransactionTable
          data={transactionsQuery.data.items}
          onView={openDetails}
          onEdit={openEdit}
          onDelete={openDelete}
        />
      )}

      <TransactionFormModal
        mode="create"
        open={dialog === "create"}
        onOpenChange={handleDialogOpenChange}
        onSubmit={handleCreateTransaction}
        errorMessage={createTransaction.error?.message}
        isSubmitting={createTransaction.isPending}
      />
      <TransactionFormModal
        mode="edit"
        open={dialog === "edit"}
        transaction={selectedTransaction}
        onOpenChange={handleDialogOpenChange}
        onSubmit={handleUpdateTransaction}
        errorMessage={updateTransaction.error?.message}
        isSubmitting={updateTransaction.isPending}
      />
      <TransactionDetailsModal open={dialog === "details"} transaction={selectedTransaction} onOpenChange={handleDialogOpenChange} />
      <DeleteTransactionModal
        open={dialog === "delete"}
        transaction={selectedTransaction}
        onOpenChange={handleDialogOpenChange}
        onConfirm={handleDeleteTransaction}
        errorMessage={deleteTransaction.error?.message}
        isSubmitting={deleteTransaction.isPending}
      />
    </PageStack>
  );
}
