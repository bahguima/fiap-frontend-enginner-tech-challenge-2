"use client";

import { type ChangeEvent, useState } from "react";
import { Plus, Search } from "lucide-react";
import type { TransactionFilters, TransactionType } from "@/api/contracts";
import { DeleteTransactionModal } from "@/components/dashboard/DeleteTransactionModal";
import { TransactionDetailsModal } from "@/components/dashboard/TransactionDetailsModal";
import { TransactionQueryState } from "@/components/dashboard/TransactionQueryState";
import { TransactionTable } from "@/components/dashboard/TransactionTable";
import { TransactionFormModal } from "@/components/form/TransactionFormModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTransactionMutations, useTransactionsQuery } from "@/features/transactions/hooks";
import { useTransactionDialogs } from "@/hooks/use-transaction-dialogs";
import type { TransactionFormValues } from "@/lib/transactions";
import { PageStack, PageSubtitle, PageTitle } from "@/styles/shared";

import {
  FilterField,
  FiltersGrid,
  FiltersPanel,
  PageHeader,
  Pagination,
  PaginationStatus,
} from "./styled";

const initialFilters: TransactionFilters = { page: 1, pageSize: 5 };

export default function StatementPage() {
  const { t } = useLanguage();
  const { accessToken } = useAuth();
  const [filters, setFilters] = useState<TransactionFilters>(initialFilters);
  const transactionsQuery = useTransactionsQuery(accessToken, filters);
  const { createTransaction, updateTransaction, deleteTransaction } = useTransactionMutations(accessToken);
  const { dialog, selectedTransaction, openCreate, openDetails, openEdit, openDelete, closeDialog } = useTransactionDialogs();

  const handleDialogOpenChange = (isOpen: boolean) => {
    if (!isOpen) closeDialog();
  };

  const handleUpdateTransaction = (values: TransactionFormValues, attachment: File | null) => {
    if (!selectedTransaction) return;
    updateTransaction.mutate({ transactionId: selectedTransaction.id, input: values, attachment });
  };

  const handleDeleteTransaction = () => {
    if (!selectedTransaction) return;
    deleteTransaction.mutate(selectedTransaction.id);
  };

  const handleCreateTransaction = (values: TransactionFormValues, attachment: File | null) => {
    createTransaction.mutate({ input: values, attachment });
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilters((current) => ({ ...current, page: 1, search: event.target.value }));
  };

  const handleTypeChange = (value: string) => {
    const type: TransactionType | null = value === "income" || value === "expense" ? value : null;
    setFilters((current) => ({ ...current, page: 1, type }));
  };

  const handleCategoryChange = (value: string) => {
    setFilters((current) => ({ ...current, page: 1, categoryId: value === "all" ? "" : value }));
  };

  const handleStartDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilters((current) => ({ ...current, page: 1, startDate: event.target.value }));
  };

  const handleEndDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilters((current) => ({ ...current, page: 1, endDate: event.target.value }));
  };

  const showPage = (page: number | null) => {
    if (page === null) return;
    setFilters((current) => ({ ...current, page }));
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

      <FiltersPanel>
        <FiltersGrid>
          <FilterField>
            <Label htmlFor="transaction-search">Buscar transações</Label>
            <Input
              id="transaction-search"
              type="search"
              placeholder="Descrição da transação"
              value={filters.search ?? ""}
              onChange={handleSearchChange}
            />
          </FilterField>
          <FilterField>
            <Label>Tipo</Label>
            <Select value={filters.type ?? "all"} onValueChange={handleTypeChange}>
              <SelectTrigger aria-label="Filtrar por tipo"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="income">Entradas</SelectItem>
                <SelectItem value="expense">Saídas</SelectItem>
              </SelectContent>
            </Select>
          </FilterField>
          <FilterField>
            <Label>Categoria</Label>
            <Select value={filters.categoryId || "all"} onValueChange={handleCategoryChange}>
              <SelectTrigger aria-label="Filtrar por categoria"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="salary">Salário</SelectItem>
                <SelectItem value="deposit">Depósito</SelectItem>
                <SelectItem value="freelance">Freelance</SelectItem>
                <SelectItem value="investment">Investimento</SelectItem>
                <SelectItem value="food">Alimentação</SelectItem>
                <SelectItem value="housing">Moradia</SelectItem>
                <SelectItem value="transport">Transporte</SelectItem>
                <SelectItem value="entertainment">Entretenimento</SelectItem>
                <SelectItem value="utilities">Contas e serviços</SelectItem>
                <SelectItem value="insurance">Seguros</SelectItem>
                <SelectItem value="health">Saúde</SelectItem>
                <SelectItem value="shopping">Compras</SelectItem>
                <SelectItem value="transfer">Transferência</SelectItem>
                <SelectItem value="payment">Pagamento</SelectItem>
                <SelectItem value="withdrawal">Saque</SelectItem>
                <SelectItem value="other">Outro</SelectItem>
              </SelectContent>
            </Select>
          </FilterField>
          <FilterField>
            <Label htmlFor="transaction-start-date">Data inicial</Label>
            <Input id="transaction-start-date" type="date" value={filters.startDate ?? ""} onChange={handleStartDateChange} />
          </FilterField>
          <FilterField>
            <Label htmlFor="transaction-end-date">Data final</Label>
            <Input id="transaction-end-date" type="date" value={filters.endDate ?? ""} onChange={handleEndDateChange} />
          </FilterField>
        </FiltersGrid>
        <Button type="button" variant="outline" onClick={() => setFilters(initialFilters)}>
          <Search /> Limpar filtros
        </Button>
      </FiltersPanel>

      {transactionsQuery.isPending && <TransactionQueryState type="loading" />}
      {transactionsQuery.isError && <TransactionQueryState type="error" />}
      {transactionsQuery.data?.emptyState && <TransactionQueryState type={transactionsQuery.data.emptyState} />}
      {transactionsQuery.data && transactionsQuery.data.data.length > 0 && (
        <TransactionTable
          data={transactionsQuery.data.data}
          onView={openDetails}
          onEdit={openEdit}
          onDelete={openDelete}
        />
      )}
      {transactionsQuery.data && transactionsQuery.data.meta.totalItems > 0 && (
        <Pagination aria-label="Paginação de transações">
          <Button
            type="button"
            variant="outline"
            disabled={transactionsQuery.data.meta.previousPage === null}
            onClick={() => showPage(transactionsQuery.data.meta.previousPage)}
          >
            Anterior
          </Button>
          <PaginationStatus>
            Página {transactionsQuery.data.meta.page} de {transactionsQuery.data.meta.totalPages}
          </PaginationStatus>
          <Button
            type="button"
            variant="outline"
            disabled={transactionsQuery.data.meta.nextPage === null}
            onClick={() => showPage(transactionsQuery.data.meta.nextPage)}
          >
            Próxima
          </Button>
        </Pagination>
      )}

      <TransactionFormModal mode="create" open={dialog === "create"} onOpenChange={handleDialogOpenChange} onSubmit={handleCreateTransaction} />
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
