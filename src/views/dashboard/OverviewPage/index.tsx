"use client";

import { useMemo } from "react";
import { ArrowDownLeft, ArrowUpRight, Plus, TrendingUp, Wallet } from "lucide-react";
import { Bar } from "react-chartjs-2";
import { DeleteTransactionModal } from "@/components/dashboard/DeleteTransactionModal";
import { TransactionDetailsModal } from "@/components/dashboard/TransactionDetailsModal";
import { TransactionTable } from "@/components/dashboard/TransactionTable";
import { TransactionFormModal } from "@/components/form/TransactionFormModal";
import { Button } from "@/components/ui/button";
import { monthlyData } from "@/data/transactions";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useTransactions } from "@/contexts/TransactionsContext";
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
  const { transactions, summary, addTransaction, updateTransaction, deleteTransaction } = useTransactions();
  const { dialog, selectedTransaction, openCreate, openDetails, openEdit, openDelete, closeDialog } = useTransactionDialogs();

  const { data: chartData, options: chartOptions } = useMemo(() => {
    const colors = getChartColors(theme);
    return {
      data: {
        labels: monthlyData.map((item) => item.month),
        datasets: [
          {
            label: t("dash.income"),
            data: monthlyData.map((item) => item.income),
            backgroundColor: colors.income,
            borderRadius: 6,
            borderSkipped: false,
          },
          {
            label: t("dash.expenses"),
            data: monthlyData.map((item) => item.expense),
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
  }, [theme, t]);

  const cards: StatCardData[] = [
    { label: t("dash.balance"), value: summary.balance, icon: Wallet, color: "primary" },
    { label: t("dash.income"), value: summary.totalIncome, icon: ArrowDownLeft, color: "success" },
    { label: t("dash.expenses"), value: summary.totalExpense, icon: ArrowUpRight, color: "accent" },
    { label: t("dash.savings"), value: summary.balance, icon: TrendingUp, color: "primary" },
  ];

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
            <StatValue>R$ {card.value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</StatValue>
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
        <TransactionTable data={transactions.slice(0, 5)} onView={openDetails} onEdit={openEdit} onDelete={openDelete} />
      </PageStack>

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
