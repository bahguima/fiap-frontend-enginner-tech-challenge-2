import styled from "styled-components";
import { Panel } from "@banking/shared/ui/styles/shared";

export const SummaryPanel = styled(Panel)`
  padding: 1.25rem;
`;

export const SummaryLabel = styled.span`
  color: hsl(var(--muted-foreground));
  font-size: 0.75rem;
`;

export const ExpenseValue = styled.div`
  margin-top: 0.25rem;
  color: hsl(var(--accent));
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
