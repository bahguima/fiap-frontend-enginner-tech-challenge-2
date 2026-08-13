import type { IFinancialMetricCardProps } from "./interface";
import {
  Comparison,
  MetricAmount,
  MetricCardRoot,
  MetricHeader,
  MetricIconBox,
  MetricLabel,
} from "./styled";

export const FinancialMetricCard = ({
  metric,
  icon: Icon,
  tone,
  "data-testid": dataTestId,
}: IFinancialMetricCardProps) => (
  <MetricCardRoot data-testid={dataTestId}>
    <MetricHeader>
      <MetricLabel>{metric.label}</MetricLabel>
      <MetricIconBox $tone={tone} aria-hidden="true">
        <Icon size={18} />
      </MetricIconBox>
    </MetricHeader>
    <MetricAmount>{metric.amount.formattedValue}</MetricAmount>
    <Comparison $tone={metric.comparisonTone}>
      {metric.comparisonText}
    </Comparison>
  </MetricCardRoot>
);
