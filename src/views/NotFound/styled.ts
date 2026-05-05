import Link from "next/link";
import styled from "styled-components";

export const NotFoundRoot = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: hsl(var(--muted));
`;

export const Content = styled.div`
  text-align: center;
`;

export const Title = styled.h1`
  margin: 0 0 1rem;
  font-size: 2.25rem;
  font-weight: 700;
`;

export const Message = styled.p`
  margin: 0 0 1rem;
  color: hsl(var(--muted-foreground));
  font-size: 1.25rem;
`;

export const HomeLink = styled(Link)`
  color: hsl(var(--primary));
  text-decoration: underline;
  text-underline-offset: 3px;

  &:hover {
    color: hsl(var(--primary) / 0.9);
  }
`;
