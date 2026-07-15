import * as Separator from "@radix-ui/react-separator";
import styled from "styled-components";
import type { MetricTone } from "./interface";

export const OverviewRoot = styled.main`
  min-height: 100vh;
  padding: 32px;
`;

export const Header = styled.header`
  margin-bottom: 24px;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 1.875rem;
`;

export const Subtitle = styled.p`
  margin: 8px 0 0;
  color: hsl(var(--muted-foreground));
`;

export const UpdatedAt = styled.span`
  display: block;
  margin-top: 8px;
  color: hsl(var(--muted-foreground));
  font-size: 0.75rem;
`;

export const MetricsGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;

  @media (min-width: 900px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

export const MetricCard = styled.article<{ $tone: MetricTone }>`
  border: 1px solid hsl(var(--border));
  border-top: 3px solid hsl(var(--${({ $tone }) => $tone}));
  border-radius: var(--radius);
  background: hsl(var(--card));
  padding: 20px;
`;

export const MetricLabel = styled.h2`
  margin: 0;
  color: hsl(var(--muted-foreground));
  font-size: 0.875rem;
  font-weight: 500;
`;

export const MetricValue = styled.p`
  margin: 12px 0 8px;
  font-size: 1.5rem;
  font-weight: 700;
`;

export const MetricDescription = styled.p`
  margin: 0;
  color: hsl(var(--muted-foreground));
  font-size: 0.75rem;
`;

export const Divider = styled(Separator.Root)`
  height: 1px;
  margin: 24px 0;
  background: hsl(var(--border));
`;

export const StateMessage = styled.div`
  display: flex;
  min-height: 320px;
  align-items: center;
  justify-content: center;
  color: hsl(var(--muted-foreground));
  text-align: center;
`;
