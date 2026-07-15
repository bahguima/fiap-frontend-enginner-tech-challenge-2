"use client";

import { useMemo } from "react";
import { Line } from "react-chartjs-2";
import { TransactionQueryState } from "@/components/dashboard/TransactionQueryState";
import { TransactionTable } from "@/components/dashboard/TransactionTable";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useTransactionsDashboardQuery, useTransactionsQuery } from "@/features/transactions/hooks";
import { getChartColors, hslVar } from "@/lib/chart-theme";
import { CardTitle, ChartBox, PageStack, PageSubtitle, PageTitle } from "@/styles/shared";

import { ChartPanel, ExpenseValue, SummaryLabel, SummaryPanel } from "./styled";

export default function ExpensesPage() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const { accessToken } = useAuth();
  const dashboardQuery = useTransactionsDashboardQuery(accessToken);
  const transactionsQuery = useTransactionsQuery(accessToken, { page: 1, pageSize: 100, type: "expense" });
  const dashboard = dashboardQuery.data;

  const { data: chartData, options: chartOptions } = useMemo(() => {
    const colors = getChartColors(theme);
    return {
      data: {
        labels: dashboard?.chart.labels ?? [],
        datasets: [
          {
            label: t("dash.expenses"),
            data: dashboard?.chart.expense ?? [],
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
  }, [dashboard, theme, t]);

  if (dashboardQuery.isPending || transactionsQuery.isPending) {
    return <TransactionQueryState type="loading" />;
  }

  if (dashboardQuery.isError || transactionsQuery.isError || !dashboard || !transactionsQuery.data) {
    return <TransactionQueryState type="error" />;
  }

  return (
    <PageStack>
      <div>
        <PageTitle>{t("expenses.title")}</PageTitle>
        <PageSubtitle>{t("expenses.subtitle")}</PageSubtitle>
      </div>

      <SummaryPanel>
        <SummaryLabel>{t("expenses.total")}</SummaryLabel>
        <ExpenseValue>-{dashboard.summary.formattedTotalExpense}</ExpenseValue>
      </SummaryPanel>

      <ChartPanel>
        <CardTitle>{t("expenses.trend")}</CardTitle>
        <ChartBox $height="14rem">
          <Line data={chartData} options={chartOptions} />
        </ChartBox>
      </ChartPanel>

      <PageStack $gap="1rem">
        <CardTitle>{t("expenses.transactions")}</CardTitle>
        {transactionsQuery.data.data.length === 0 ? (
          <TransactionQueryState type="empty" />
        ) : (
          <TransactionTable data={transactionsQuery.data.data} />
        )}
      </PageStack>
    </PageStack>
  );
}
