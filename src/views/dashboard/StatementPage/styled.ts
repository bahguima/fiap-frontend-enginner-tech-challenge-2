import styled from "styled-components";
import { Panel } from "@/styles/shared";

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

export const FiltersPanel = styled(Panel)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
`;

export const FiltersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
`;

export const FilterField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Pagination = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

export const PaginationStatus = styled.span`
  color: hsl(var(--muted-foreground));
  font-size: 0.875rem;
`;
