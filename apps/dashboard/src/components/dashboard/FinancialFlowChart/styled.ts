import styled from "styled-components";

export const FlowRoot = styled.section`
  display: grid;
  gap: 20px;
  min-width: 0;
  border: 1px solid hsl(var(--border) / 0.5);
  border-radius: var(--radius);
  background: hsl(var(--card) / 0.7);
  padding: 20px;
`;

export const FlowHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
`;

export const FlowTitle = styled.h2`
  margin: 0;
  font-size: 18px;
`;

export const Legend = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  color: hsl(var(--muted-foreground));
  font-size: 12px;
`;

export const LegendItem = styled.span<{ $expense?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;

  &::before {
    width: 9px;
    height: 9px;
    border-radius: 2px;
    background: ${({ $expense }) =>
      $expense
        ? "hsl(var(--destructive))"
        : "hsl(var(--success))"};
    content: "";
  }
`;

export const Plot = styled.div`
  display: grid;
  grid-template-columns: repeat(6, minmax(36px, 1fr));
  align-items: end;
  gap: 12px;
  min-height: 240px;
  border-bottom: 1px solid hsl(var(--border));
  padding: 16px 4px 0;
`;

export const Period = styled.div`
  display: grid;
  grid-template-rows: 190px auto;
  gap: 10px;
  min-width: 0;
`;

export const Bars = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 4px;
  height: 190px;
`;

export const Bar = styled.span<{ $height: string; $expense?: boolean }>`
  width: min(18px, 45%);
  height: ${({ $height }) => $height};
  min-height: 4px;
  border-radius: 4px 4px 0 0;
  background: ${({ $expense }) =>
    $expense
      ? "hsl(var(--destructive))"
      : "hsl(var(--success))"};
`;

export const PeriodLabel = styled.span`
  overflow: hidden;
  color: hsl(var(--muted-foreground));
  font-size: 12px;
  text-align: center;
  text-overflow: ellipsis;
`;

export const AccessibleTable = styled.table`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
`;
