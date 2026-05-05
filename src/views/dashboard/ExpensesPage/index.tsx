"use client";

import { useMemo } from "react";
import { Line } from "react-chartjs-2";
import { TransactionTable } from "@/components/dashboard/TransactionTable";
import { monthlyData } from "@/data/transactions";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useTransactions } from "@/contexts/TransactionsContext";
import { getChartColors, hslVar } from "@/lib/chart-theme";
import { CardTitle, ChartBox, PageStack, PageSubtitle, PageTitle } from "@/styles/shared";

import { ChartPanel, ExpenseValue, SummaryLabel, SummaryPanel } from "./styled";

export default function ExpensesPage() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const { transactions, summary } = useTransactions();
  const expenseTransactions = useMemo(() => transactions.filter((transaction) => transaction.type === "expense"), [transactions]);

  const { data: chartData, options: chartOptions } = useMemo(() => {
    const colors = getChartColors(theme);
    return {
      data: {
        labels: monthlyData.map((item) => item.month),
        datasets: [
          {
            label: t("dash.expenses"),
            data: monthlyData.map((item) => item.expense),
            borderColor: colors.expense,
            backgroundColor: hslVar("--destructive", 0.18),
            fill: true,
            tension: 0.4,
            pointRadius: 3,
            pointBackgroundColor: colors.expense,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
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

  return (
    <PageStack>
      <div>
        <PageTitle>{t("expenses.title")}</PageTitle>
        <PageSubtitle>{t("expenses.subtitle")}</PageSubtitle>
      </div>

      <SummaryPanel>
        <SummaryLabel>{t("expenses.total")}</SummaryLabel>
        <ExpenseValue>-R$ {summary.totalExpense.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</ExpenseValue>
      </SummaryPanel>

      <ChartPanel>
        <CardTitle>{t("expenses.trend")}</CardTitle>
        <ChartBox $height="14rem">
          <Line data={chartData} options={chartOptions} />
        </ChartBox>
      </ChartPanel>

      <PageStack $gap="1rem">
        <CardTitle>{t("expenses.transactions")}</CardTitle>
        <TransactionTable data={expenseTransactions} />
      </PageStack>
    </PageStack>
  );
}
