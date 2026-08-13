import styled from "styled-components";

export const DetailsList = styled.dl`
  display: grid;
  margin: 1.5rem 0 0;
`;

export const DetailsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid hsl(var(--border) / 0.35);

  &:last-child {
    border-bottom: 0;
  }
`;

export const DetailsLabel = styled.dt`
  color: hsl(var(--muted-foreground));
  font-size: 0.875rem;
`;

export const DetailsValue = styled.dd`
  margin: 0;
  text-align: right;
  font-size: 0.875rem;
  font-weight: 500;
`;
