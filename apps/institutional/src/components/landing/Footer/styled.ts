import styled from "styled-components";
import { Container } from "@banking/shared/ui/styles/shared";

export const FooterRoot = styled.footer`
  border-top: 1px solid hsl(var(--border) / 0.3);
  padding: 3rem 0;
`;

export const FooterContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

export const FooterLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  color: hsl(var(--muted-foreground));
  font-size: 0.875rem;
`;

export const FooterAnchor = styled.a`
  transition: color 160ms ease;

  &:hover {
    color: hsl(var(--foreground));
  }
`;

export const Rights = styled.p`
  margin: 0;
  color: hsl(var(--muted-foreground));
  font-size: 0.75rem;
`;
