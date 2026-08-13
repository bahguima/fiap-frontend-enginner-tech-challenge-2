import styled from "styled-components";

export const PaginationRoot = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

export const PaginationSummary = styled.output`
  color: hsl(var(--muted-foreground));
  font-size: 14px;
`;

export const PaginationActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;
