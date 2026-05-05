import styled from "styled-components";
import { Panel } from "@/styles/shared";

export const SummaryPanel = styled(Panel)`
  padding: 1.25rem;
`;

export const SummaryLabel = styled.span`
  color: hsl(var(--muted-foreground));
  font-size: 0.75rem;
`;

export const IncomeValue = styled.div`
  margin-top: 0.25rem;
  color: hsl(var(--success));
  font-family: "Space Grotesk", sans-serif;
  font-size: 1.875rem;
  font-weight: 700;
`;

export const ChartPanel = styled(Panel)`
  padding: 1rem;

  @media (min-width: 768px) {
    padding: 1.5rem;
  }
`;
