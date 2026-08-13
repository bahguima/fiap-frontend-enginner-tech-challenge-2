import styled from "styled-components";
import type { DashboardCategoryTone } from "@banking/shared/types";

export const DistributionRoot = styled.section`
  display: grid;
  gap: 20px;
  min-width: 0;
  border: 1px solid hsl(var(--border) / 0.5);
  border-radius: var(--radius);
  background: hsl(var(--card) / 0.7);
  padding: 20px;
`;

export const DistributionTitle = styled.h2`
  margin: 0;
  font-size: 18px;
`;

export const CategoryList = styled.div`
  display: grid;
  gap: 18px;
`;

export const CategoryItem = styled.div`
  display: grid;
  gap: 8px;
`;

export const CategoryHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  font-size: 13px;
`;

export const CategoryLabel = styled.span`
  font-weight: 600;
`;

export const CategoryValue = styled.span`
  color: hsl(var(--muted-foreground));
`;

export const Track = styled.div`
  height: 8px;
  overflow: hidden;
  border-radius: 4px;
  background: hsl(var(--muted));
`;

export const Fill = styled.div<{
  $width: string;
  $tone: DashboardCategoryTone;
}>`
  width: ${({ $width }) => $width};
  height: 100%;
  border-radius: 4px;
  background: ${({ $tone }) => {
    if ($tone === "accent") return "hsl(var(--accent))";
    if ($tone === "success") return "hsl(var(--success))";
    if ($tone === "warning") return "hsl(var(--warning))";
    if ($tone === "muted") return "hsl(var(--muted-foreground))";
    return "hsl(var(--primary))";
  }};
`;

export const AccessibleTable = styled.table`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
`;
