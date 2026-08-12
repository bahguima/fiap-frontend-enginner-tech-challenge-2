import styled from "styled-components";
import type {
  DashboardComparisonTone,
} from "@banking/shared/types";
import type { FinancialMetricTone } from "./interface";

export const MetricCardRoot = styled.article`
  display: grid;
  gap: 16px;
  min-width: 0;
  border: 1px solid hsl(var(--border) / 0.5);
  border-radius: var(--radius);
  background: hsl(var(--card) / 0.7);
  padding: 20px;
`;

export const MetricHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const MetricLabel = styled.h2`
  margin: 0;
  color: hsl(var(--muted-foreground));
  font-family: "Outfit", sans-serif;
  font-size: 14px;
  font-weight: 500;
`;

export const MetricIconBox = styled.span<{ $tone: FinancialMetricTone }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: var(--radius);
  background: ${({ $tone }) => {
    if ($tone === "success") return "hsl(var(--success) / 0.12)";
    if ($tone === "expense") return "hsl(var(--destructive) / 0.12)";
    return "hsl(var(--primary) / 0.12)";
  }};
  color: ${({ $tone }) => {
    if ($tone === "success") return "hsl(var(--success))";
    if ($tone === "expense") return "hsl(var(--destructive))";
    return "hsl(var(--primary))";
  }};
`;

export const MetricAmount = styled.p`
  margin: 0;
  font-family: "Space Grotesk", sans-serif;
  font-size: 26px;
  font-weight: 700;
`;

export const Comparison = styled.p<{
  $tone: DashboardComparisonTone;
}>`
  margin: 0;
  color: ${({ $tone }) =>
    $tone === "positive"
      ? "hsl(var(--success))"
      : $tone === "negative"
        ? "hsl(var(--destructive))"
        : "hsl(var(--muted-foreground))"};
  font-size: 13px;
`;
