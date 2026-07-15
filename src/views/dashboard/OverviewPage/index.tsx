"use client";

import { useMemo } from "react";
import { ArrowDownLeft, ArrowUpRight, Plus, TrendingUp, Wallet } from "lucide-react";
import { Bar } from "react-chartjs-2";
import { DeleteTransactionModal } from "@/components/dashboard/DeleteTransactionModal";
import { TransactionDetailsModal } from "@/components/dashboard/TransactionDetailsModal";
import { TransactionQueryState } from "@/components/dashboard/TransactionQueryState";
import { TransactionTable } from "@/components/dashboard/TransactionTable";
import { TransactionFormModal } from "@/components/form/TransactionFormModal";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useTransactionMutations, useTransactionsDashboardQuery } from "@/features/transactions/hooks";
import { useTransactionDialogs } from "@/hooks/use-transaction-dialogs";
import { getChartColors } from "@/lib/chart-theme";
import type { TransactionFormValues } from "@/lib/transactions";
import { CardTitle, ChartBox, PageStack, PageSubtitle, PageTitle } from "@/styles/shared";

import type { StatCardData } from "./interface";
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
  const { accessToken } = useAuth();
  const dashboardQuery = useTransactionsDashboardQuery(accessToken);
  const { createTransaction, updateTransaction, deleteTransaction } = useTransactionMutations(accessToken);
  const dashboard = dashboardQuery.data;
  const { dialog, selectedTransaction, openCreate, openDetails, openEdit, openDelete, closeDialog } = useTransactionDialogs();

  const { data: chartData, options: chartOptions } = useMemo(() => {
    const colors = getChartColors(theme);
    return {
      data: {
        labels: dashboard?.chart.labels ?? [],
        datasets: [
          {
            label: t("dash.income"),
            data: dashboard?.chart.income ?? [],
            backgroundColor: colors.income,
            borderRadius: 6,
            borderSkipped: false,
          },
          {
            label: t("dash.expenses"),
            data: dashboard?.chart.expense ?? [],
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
  }, [dashboard, theme, t]);

  if (dashboardQuery.isPending) {
    return <TransactionQueryState type="loading" />;
  }

  if (dashboardQuery.isError || !dashboard) {
    return <TransactionQueryState type="error" />;
  }

  const cards: StatCardData[] = [
    { label: t("dash.balance"), value: dashboard.summary.formattedBalance, icon: Wallet, color: "primary" },
    { label: t("dash.income"), value: dashboard.summary.formattedTotalIncome, icon: ArrowDownLeft, color: "success" },
    { label: t("dash.expenses"), value: dashboard.summary.formattedTotalExpense, icon: ArrowUpRight, color: "accent" },
    { label: t("dash.savings"), value: dashboard.summary.formattedSavings, icon: TrendingUp, color: "primary" },
  ];

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

      <StatsGrid>
        {cards.map((card) => (
          <StatPanel key={card.label}>
            <StatHeader>
              <StatIcon as={card.icon} $tone={card.color} size={16} />
              <StatLabel>{card.label}</StatLabel>
            </StatHeader>
            <StatValue>{card.value}</StatValue>
          </StatPanel>
        ))}
      </StatsGrid>

      <ChartPanel>
        <CardTitle>{t("dash.chart")}</CardTitle>
        <ChartBox $height="16rem">
          <Bar data={chartData} options={chartOptions} />
        </ChartBox>
      </ChartPanel>

      <PageStack $gap="1rem">
        <CardTitle>{t("dash.recent")}</CardTitle>
        {dashboard.recentTransactions.length === 0 ? (
          <TransactionQueryState type="empty" />
        ) : (
          <TransactionTable data={dashboard.recentTransactions} onView={openDetails} onEdit={openEdit} onDelete={openDelete} />
        )}
      </PageStack>

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
