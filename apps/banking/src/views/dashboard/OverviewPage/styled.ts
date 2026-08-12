import styled from "styled-components";
import { Panel } from "@banking/shared/ui/styles/shared";

import type { StatTone } from "./interface";

export const PageHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 640px) {
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

export const StatPanel = styled(Panel)`
  padding: 1rem;

  @media (min-width: 768px) {
    padding: 1.25rem;
  }
`;

export const StatHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
`;

export const StatIcon = styled.svg<{ $tone: StatTone }>`
  color: ${({ $tone }) => {
    if ($tone === "success") return "hsl(var(--success))";
    if ($tone === "accent") return "hsl(var(--accent))";
    return "hsl(var(--primary))";
  }};
`;

export const StatLabel = styled.span`
  color: hsl(var(--muted-foreground));
  font-size: 0.75rem;
`;

export const StatValue = styled.div`
  font-family: "Space Grotesk", sans-serif;
  font-size: 1.125rem;
  font-weight: 700;

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const ChartPanel = styled(Panel)`
  padding: 1rem;

  @media (min-width: 768px) {
    padding: 1.5rem;
  }
`;
