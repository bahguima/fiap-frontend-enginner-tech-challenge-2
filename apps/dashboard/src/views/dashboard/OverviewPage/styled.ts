import styled from "styled-components";

export const OverviewRoot = styled.div`
  display: grid;
  gap: 24px;
`;

export const PageHeader = styled.header`
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (min-width: 640px) {
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
  }
`;

export const TitleGroup = styled.div`
  display: grid;
  gap: 6px;
`;

export const PageTitle = styled.h1`
  margin: 0;
  font-size: 28px;
`;

export const PageSubtitle = styled.p`
  margin: 0;
  color: hsl(var(--muted-foreground));
  font-size: 14px;
`;

export const PagePeriod = styled.p`
  width: fit-content;
  margin: 0;
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius);
  background: hsl(var(--muted) / 0.5);
  color: hsl(var(--muted-foreground));
  padding: 8px 12px;
  font-size: 13px;
`;

export const MetricsGrid = styled.div`
  display: grid;
  gap: 16px;

  @media (min-width: 720px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

export const AnalyticsGrid = styled.div`
  display: grid;
  gap: 16px;

  @media (min-width: 1100px) {
    grid-template-columns: minmax(0, 1.7fr) minmax(300px, 1fr);
  }
`;
