"use client";

import { useDashboardOverviewQuery } from "@/features/dashboard/use-dashboard-overview-query";
import type { DashboardOverviewProps } from "./interface";
import {
  Divider,
  Header,
  MetricCard,
  MetricDescription,
  MetricLabel,
  MetricsGrid,
  MetricValue,
  OverviewRoot,
  StateMessage,
  Subtitle,
  Title,
  UpdatedAt,
} from "./styled";

export const DashboardOverview = ({
  "data-testid": dataTestId,
}: DashboardOverviewProps) => {
  const dashboardQuery = useDashboardOverviewQuery();

  if (dashboardQuery.isPending) {
    return <StateMessage role="status">Carregando visão geral financeira…</StateMessage>;
  }

  if (dashboardQuery.isError) {
    return (
      <StateMessage role="alert">
        Não foi possível carregar a visão geral financeira.
      </StateMessage>
    );
  }

  const dashboard = dashboardQuery.data;

  return (
    <OverviewRoot data-testid={dataTestId}>
      <Header>
        <Title>{dashboard.title}</Title>
        <Subtitle>{dashboard.subtitle}</Subtitle>
        <UpdatedAt>{dashboard.updatedAtLabel}</UpdatedAt>
      </Header>
      <Divider />
      <MetricsGrid aria-label="Indicadores financeiros">
        <MetricCard $tone="primary">
          <MetricLabel>{dashboard.balance.label}</MetricLabel>
          <MetricValue>{dashboard.balance.formattedValue}</MetricValue>
          <MetricDescription>{dashboard.balance.description}</MetricDescription>
        </MetricCard>
        <MetricCard $tone="success">
          <MetricLabel>{dashboard.income.label}</MetricLabel>
          <MetricValue>{dashboard.income.formattedValue}</MetricValue>
          <MetricDescription>{dashboard.income.description}</MetricDescription>
        </MetricCard>
        <MetricCard $tone="expense">
          <MetricLabel>{dashboard.expenses.label}</MetricLabel>
          <MetricValue>{dashboard.expenses.formattedValue}</MetricValue>
          <MetricDescription>{dashboard.expenses.description}</MetricDescription>
        </MetricCard>
        <MetricCard $tone="primary">
          <MetricLabel>{dashboard.savings.label}</MetricLabel>
          <MetricValue>{dashboard.savings.formattedValue}</MetricValue>
          <MetricDescription>{dashboard.savings.description}</MetricDescription>
        </MetricCard>
      </MetricsGrid>
    </OverviewRoot>
  );
};
