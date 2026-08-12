import styled from "styled-components";

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

export const RefreshStatus = styled.p`
  margin: 0;
  color: hsl(var(--muted-foreground));
  font-size: 14px;
`;

export const CategoryStatus = styled.p`
  margin: -12px 0 0;
  color: hsl(var(--destructive));
  font-size: 14px;
`;
