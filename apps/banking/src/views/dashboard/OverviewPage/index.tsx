"use client";

import { useMemo } from "react";
import { ArrowDownLeft, ArrowUpRight, Plus, TrendingUp, Wallet } from "lucide-react";
import { Bar } from "react-chartjs-2";
import { DeleteTransactionModal } from "@/components/dashboard/DeleteTransactionModal";
import { TransactionDetailsModal } from "@/components/dashboard/TransactionDetailsModal";
import { TransactionTable } from "@/components/dashboard/TransactionTable";
import { TransactionFormModal } from "@/components/form/TransactionFormModal";
import { QueryState } from "@banking/shared/ui/components/QueryState";
import { Button } from "@banking/shared/ui/components/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import {
  useDashboardMonthlyQuery,
  useDashboardSummaryQuery,
} from "@/features/dashboard/hooks/useDashboard";
import {
  useCreateTransactionMutation,
  useDeleteTransactionMutation,
  useTransactionsQuery,
  useUpdateTransactionMutation,
} from "@/features/transactions/hooks/useTransactions";
import { useTransactionDialogs } from "@/hooks/use-transaction-dialogs";
import { getChartColors } from "@/lib/chart-theme";
import type { TransactionFormValues } from "@/components/form/TransactionFormModal/schema";
import { CardTitle, ChartBox, PageStack, PageSubtitle, PageTitle } from "@banking/shared/ui/styles/shared";

import {
  ChartPanel,
  PageHeader,
  StatHeader,
  StatIcon,
  StatLabel,
  StatPanel,
  StatsGrid,
  StatValue,
} from "./styled";

export default function OverviewPage() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const transactionsQuery = useTransactionsQuery({ limit: 5 });
  const summaryQuery = useDashboardSummaryQuery();
  const monthlyQuery = useDashboardMonthlyQuery();
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

  const { data: chartData, options: chartOptions } = useMemo(() => {
    const colors = getChartColors(theme);
    const monthly = monthlyQuery.data;

    return {
      data: {
        labels: monthly?.labels ?? [],
        datasets: [
          {
            label: t("dash.income"),
            data: monthly?.incomeValues ?? [],
            backgroundColor: colors.income,
            borderRadius: 6,
            borderSkipped: false,
          },
          {
            label: t("dash.expenses"),
            data: monthly?.expenseValues ?? [],
            backgroundColor: colors.expense,
            borderRadius: 6,
            borderSkipped: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: colors.text, font: { size: 12 } } },
          tooltip: {
            backgroundColor: colors.tooltipBg,
            borderColor: colors.tooltipBorder,
            borderWidth: 1,
            titleColor: colors.tooltipText,
            bodyColor: colors.tooltipText,
            padding: 10,
          },
        },
        scales: {
          x: { ticks: { color: colors.text }, grid: { color: colors.grid } },
          y: { ticks: { color: colors.text }, grid: { color: colors.grid } },
        },
      },
    };
  }, [monthlyQuery.data, theme, t]);

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
    <PageStack>
      <PageHeader>
        <div>
          <PageTitle>{t("dash.overview")}</PageTitle>
          <PageSubtitle>{t("dash.overview.subtitle")}</PageSubtitle>
        </div>
        <Button type="button" onClick={openCreate}>
          <Plus />
          Nova Transação
        </Button>
      </PageHeader>

      {summaryQuery.isPending && (
        <QueryState kind="loading" message="Carregando resumo financeiro..." />
      )}
      {summaryQuery.isError && (
        <QueryState
          kind="error"
          message="Não foi possível carregar o resumo financeiro."
          onRetry={() => summaryQuery.refetch()}
        />
      )}
      {summaryQuery.data && (
        <StatsGrid>
          <StatPanel>
            <StatHeader>
              <StatIcon as={Wallet} $tone="primary" size={16} />
              <StatLabel>{t("dash.balance")}</StatLabel>
            </StatHeader>
            <StatValue>{summaryQuery.data.balance.formattedValue}</StatValue>
          </StatPanel>
          <StatPanel>
            <StatHeader>
              <StatIcon as={ArrowDownLeft} $tone="success" size={16} />
              <StatLabel>{t("dash.income")}</StatLabel>
            </StatHeader>
            <StatValue>{summaryQuery.data.totalIncome.formattedValue}</StatValue>
          </StatPanel>
          <StatPanel>
            <StatHeader>
              <StatIcon as={ArrowUpRight} $tone="accent" size={16} />
              <StatLabel>{t("dash.expenses")}</StatLabel>
            </StatHeader>
            <StatValue>{summaryQuery.data.totalExpense.formattedValue}</StatValue>
          </StatPanel>
          <StatPanel>
            <StatHeader>
              <StatIcon as={TrendingUp} $tone="primary" size={16} />
              <StatLabel>{t("dash.savings")}</StatLabel>
            </StatHeader>
            <StatValue>{summaryQuery.data.savings.formattedValue}</StatValue>
          </StatPanel>
        </StatsGrid>
      )}

      <ChartPanel>
        <CardTitle>{t("dash.chart")}</CardTitle>
        {monthlyQuery.isPending && (
          <QueryState kind="loading" message="Carregando evolução mensal..." />
        )}
        {monthlyQuery.isError && (
          <QueryState
            kind="error"
            message="Não foi possível carregar a evolução mensal."
            onRetry={() => monthlyQuery.refetch()}
          />
        )}
        {monthlyQuery.data && (
          <ChartBox $height="16rem">
            <Bar data={chartData} options={chartOptions} />
          </ChartBox>
        )}
      </ChartPanel>

      <PageStack $gap="1rem">
        <CardTitle>{t("dash.recent")}</CardTitle>
        {transactionsQuery.isPending && (
          <QueryState kind="loading" message="Carregando transações..." />
        )}
        {transactionsQuery.isError && (
          <QueryState
            kind="error"
            message="Não foi possível carregar as transações."
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
      </PageStack>

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
