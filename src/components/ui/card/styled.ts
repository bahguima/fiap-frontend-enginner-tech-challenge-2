import styled from "styled-components";

export const StyledCard = styled.div`
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius);
  background: hsl(var(--card));
  color: hsl(var(--card-foreground));
  box-shadow: 0 1px 2px hsl(var(--foreground) / 0.05);
`;

export const StyledCardHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  padding: 1.5rem;
`;

export const StyledCardTitle = styled.h3`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1;
`;

export const StyledCardDescription = styled.p`
  margin: 0;
  color: hsl(var(--muted-foreground));
  font-size: 0.875rem;
`;

export const StyledCardContent = styled.div`
  padding: 0 1.5rem 1.5rem;
`;

export const StyledCardFooter = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1.5rem 1.5rem;
`;
