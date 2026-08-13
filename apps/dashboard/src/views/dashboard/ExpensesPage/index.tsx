"use client";

import { useMemo } from "react";
import { Line } from "react-chartjs-2";
import { TransactionTable } from "@dashboard/components/dashboard/TransactionTable";
import { QueryState } from "@banking/shared/ui/components/QueryState";
import { useLanguage } from "@dashboard/contexts/LanguageContext";
import { useTheme } from "@dashboard/contexts/ThemeContext";
import {
  useDashboardMonthlyQuery,
  useDashboardSummaryQuery,
} from "@dashboard/features/dashboard/hooks/useDashboard";
import { useTransactionsQuery } from "@dashboard/features/transactions/hooks/useTransactions";
import { getChartColors, hslVar } from "@dashboard/lib/chart-theme";
import {
  CardTitle,
  ChartBox,
  PageStack,
  PageSubtitle,
  PageTitle,
  VisuallyHiddenTable,
} from "@banking/shared/ui/styles/shared";

import { ChartPanel, ExpenseValue, SummaryLabel, SummaryPanel } from "./styled";

export default function ExpensesPage() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const transactionsQuery = useTransactionsQuery({ type: "expense" });
  const summaryQuery = useDashboardSummaryQuery();
  const monthlyQuery = useDashboardMonthlyQuery();

  const { data: chartData, options: chartOptions } = useMemo(() => {
    const colors = getChartColors(theme);
    const monthly = monthlyQuery.data;

    return {
      data: {
        labels: monthly?.labels ?? [],
        datasets: [
          {
            label: t("dash.expenses"),
            data: monthly?.expenseValues ?? [],
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
  }, [monthlyQuery.data, theme, t]);

  return (
    <PageStack>
      <div>
        <PageTitle>{t("expenses.title")}</PageTitle>
        <PageSubtitle>{t("expenses.subtitle")}</PageSubtitle>
      </div>

      {summaryQuery.isPending && (
        <QueryState kind="loading" message="Carregando total de saídas..." />
      )}
      {summaryQuery.isError && (
        <QueryState
          kind="error"
          message="Não foi possível carregar o total de saídas."
          onRetry={() => summaryQuery.refetch()}
        />
      )}
      {summaryQuery.data && (
        <SummaryPanel>
          <SummaryLabel>{t("expenses.total")}</SummaryLabel>
          <ExpenseValue>
            -{summaryQuery.data.totalExpense.formattedValue}
          </ExpenseValue>
        </SummaryPanel>
      )}

      <ChartPanel>
        <CardTitle>{t("expenses.trend")}</CardTitle>
        {monthlyQuery.isPending && (
          <QueryState kind="loading" message="Carregando evolução das saídas..." />
        )}
        {monthlyQuery.isError && (
          <QueryState
            kind="error"
            message="Não foi possível carregar a evolução das saídas."
            onRetry={() => monthlyQuery.refetch()}
          />
        )}
        {monthlyQuery.data && (
          <ChartBox $height="14rem">
            <Line
              aria-hidden="true"
              data={chartData}
              options={chartOptions}
            />
          </ChartBox>
        )}
        {monthlyQuery.data && (
          <VisuallyHiddenTable>
            <caption>{monthlyQuery.data.accessibleDescription}</caption>
            <thead>
              <tr>
                <th scope="col">Período</th>
                <th scope="col">Entradas</th>
                <th scope="col">Saídas</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">{monthlyQuery.data.firstPeriod.label}</th>
                <td>
                  {monthlyQuery.data.firstPeriod.income.formattedValue}
                </td>
                <td>
                  {monthlyQuery.data.firstPeriod.expense.formattedValue}
                </td>
              </tr>
              <tr>
                <th scope="row">{monthlyQuery.data.secondPeriod.label}</th>
                <td>
                  {monthlyQuery.data.secondPeriod.income.formattedValue}
                </td>
                <td>
                  {monthlyQuery.data.secondPeriod.expense.formattedValue}
                </td>
              </tr>
              <tr>
                <th scope="row">{monthlyQuery.data.thirdPeriod.label}</th>
                <td>
                  {monthlyQuery.data.thirdPeriod.income.formattedValue}
                </td>
                <td>
                  {monthlyQuery.data.thirdPeriod.expense.formattedValue}
                </td>
              </tr>
              <tr>
                <th scope="row">{monthlyQuery.data.fourthPeriod.label}</th>
                <td>
                  {monthlyQuery.data.fourthPeriod.income.formattedValue}
                </td>
                <td>
                  {monthlyQuery.data.fourthPeriod.expense.formattedValue}
                </td>
              </tr>
              <tr>
                <th scope="row">{monthlyQuery.data.fifthPeriod.label}</th>
                <td>
                  {monthlyQuery.data.fifthPeriod.income.formattedValue}
                </td>
                <td>
                  {monthlyQuery.data.fifthPeriod.expense.formattedValue}
                </td>
              </tr>
              <tr>
                <th scope="row">{monthlyQuery.data.sixthPeriod.label}</th>
                <td>
                  {monthlyQuery.data.sixthPeriod.income.formattedValue}
                </td>
                <td>
                  {monthlyQuery.data.sixthPeriod.expense.formattedValue}
                </td>
              </tr>
            </tbody>
          </VisuallyHiddenTable>
        )}
      </ChartPanel>

      <PageStack $gap="1rem">
        <CardTitle>{t("expenses.transactions")}</CardTitle>
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
          <QueryState kind="empty" message="Nenhuma saída encontrada." />
        )}
        {transactionsQuery.data && transactionsQuery.data.items.length > 0 && (
          <TransactionTable data={transactionsQuery.data.items} />
        )}
      </PageStack>
    </PageStack>
  );
}
