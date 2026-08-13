import styled from "styled-components";
import type { TransactionType } from "@banking/shared/types";

export const RecentRoot = styled.section`
  display: grid;
  gap: 16px;
  min-width: 0;
  border: 1px solid hsl(var(--border) / 0.5);
  border-radius: var(--radius);
  background: hsl(var(--card) / 0.7);
  padding: 20px;
`;

export const RecentTitle = styled.h2`
  margin: 0;
  font-size: 18px;
`;

export const TableWrap = styled.div`
  overflow-x: auto;
`;

export const TransactionsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
`;

export const HeaderCell = styled.th`
  border-bottom: 1px solid hsl(var(--border));
  padding: 10px 12px;
  color: hsl(var(--muted-foreground));
  font-weight: 500;
  text-align: left;

  &:last-child {
    text-align: right;
  }
`;

export const Cell = styled.td`
  border-bottom: 1px solid hsl(var(--border) / 0.45);
  padding: 14px 12px;
  white-space: nowrap;

  &:last-child {
    text-align: right;
  }
`;

export const DescriptionCell = styled(Cell)`
  min-width: 180px;
  font-weight: 600;
`;

export const MutedCell = styled(Cell)`
  color: hsl(var(--muted-foreground));
`;

export const AmountCell = styled(Cell)<{ $type: TransactionType }>`
  color: ${({ $type }) =>
    $type === "income"
      ? "hsl(var(--success))"
      : "hsl(var(--destructive))"};
  font-weight: 600;
`;

export const EmptyMessage = styled.p`
  margin: 0;
  color: hsl(var(--muted-foreground));
`;
