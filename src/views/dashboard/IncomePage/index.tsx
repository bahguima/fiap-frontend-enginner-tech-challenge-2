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

import { ChartPanel, IncomeValue, SummaryLabel, SummaryPanel } from "./styled";

export default function IncomePage() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const { transactions, summary } = useTransactions();
  const incomeTransactions = useMemo(() => transactions.filter((transaction) => transaction.type === "income"), [transactions]);

  const { data: chartData, options: chartOptions } = useMemo(() => {
    const colors = getChartColors(theme);
    return {
      data: {
        labels: monthlyData.map((item) => item.month),
        datasets: [
          {
            label: t("dash.income"),
            data: monthlyData.map((item) => item.income),
            borderColor: colors.income,
            backgroundColor: hslVar("--success", 0.18),
            fill: true,
            tension: 0.4,
            pointRadius: 3,
            pointBackgroundColor: colors.income,
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
        <PageTitle>{t("income.title")}</PageTitle>
        <PageSubtitle>{t("income.subtitle")}</PageSubtitle>
      </div>

      <SummaryPanel>
        <SummaryLabel>{t("income.total")}</SummaryLabel>
        <IncomeValue>+R$ {summary.totalIncome.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</IncomeValue>
      </SummaryPanel>

      <ChartPanel>
        <CardTitle>{t("income.trend")}</CardTitle>
        <ChartBox $height="14rem">
          <Line data={chartData} options={chartOptions} />
        </ChartBox>
      </ChartPanel>

      <PageStack $gap="1rem">
        <CardTitle>{t("income.transactions")}</CardTitle>
        <TransactionTable data={incomeTransactions} />
      </PageStack>
    </PageStack>
  );
}
