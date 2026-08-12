"use client";

import { ArrowDownLeft, ArrowUpRight, Wallet } from "lucide-react";
import { CategoryDistributionChart } from "@dashboard/components/dashboard/CategoryDistributionChart";
import { FinancialFlowChart } from "@dashboard/components/dashboard/FinancialFlowChart";
import { FinancialMetricCard } from "@dashboard/components/dashboard/FinancialMetricCard";
import { RecentTransactions } from "@dashboard/components/dashboard/RecentTransactions";
import { useDashboardHomeQuery } from "@dashboard/features/dashboard/hooks/useDashboard";
import { QueryState } from "@banking/shared/ui/components/QueryState";
import type { IOverviewPageProps } from "./interface";
import {
  AnalyticsGrid,
  MetricsGrid,
  OverviewRoot,
  PageHeader,
  PagePeriod,
  PageSubtitle,
  PageTitle,
  TitleGroup,
} from "./styled";

const OverviewPage = ({
  "data-testid": dataTestId,
}: IOverviewPageProps) => {
  const homeQuery = useDashboardHomeQuery();

  if (homeQuery.isPending) {
    return (
      <OverviewRoot data-testid={dataTestId}>
        <QueryState
          kind="loading"
          message="Carregando análises financeiras..."
        />
      </OverviewRoot>
    );
  }

  if (homeQuery.isError) {
    return (
      <OverviewRoot data-testid={dataTestId}>
        <QueryState
          kind="error"
          message="Não foi possível carregar as análises financeiras."
          onRetry={() => homeQuery.refetch()}
        />
      </OverviewRoot>
    );
  }

  if (homeQuery.data.status === "empty") {
    return (
      <OverviewRoot data-testid={dataTestId}>
        <PageHeader>
          <TitleGroup>
            <PageTitle>{homeQuery.data.title}</PageTitle>
            <PageSubtitle>{homeQuery.data.subtitle}</PageSubtitle>
          </TitleGroup>
        </PageHeader>
        <QueryState
          kind="empty"
          title={homeQuery.data.emptyTitle}
          message={homeQuery.data.emptyMessage}
        />
      </OverviewRoot>
    );
  }

  return (
    <OverviewRoot data-testid={dataTestId}>
      <PageHeader>
        <TitleGroup>
          <PageTitle>{homeQuery.data.title}</PageTitle>
          <PageSubtitle>{homeQuery.data.subtitle}</PageSubtitle>
        </TitleGroup>
        <PagePeriod>{homeQuery.data.periodLabel}</PagePeriod>
      </PageHeader>

      <MetricsGrid>
        <FinancialMetricCard
          metric={homeQuery.data.balance}
          icon={Wallet}
          tone="primary"
        />
        <FinancialMetricCard
          metric={homeQuery.data.totalIncome}
          icon={ArrowDownLeft}
          tone="success"
        />
        <FinancialMetricCard
          metric={homeQuery.data.totalExpense}
          icon={ArrowUpRight}
          tone="expense"
        />
      </MetricsGrid>

      <AnalyticsGrid>
        <FinancialFlowChart cashFlow={homeQuery.data.cashFlow} />
        <CategoryDistributionChart
          distribution={homeQuery.data.categoryDistribution}
        />
      </AnalyticsGrid>

      <RecentTransactions
        recentTransactions={homeQuery.data.recentTransactions}
      />
    </OverviewRoot>
  );
};

export default OverviewPage;
