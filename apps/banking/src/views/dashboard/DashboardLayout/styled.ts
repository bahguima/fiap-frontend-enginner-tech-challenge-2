import styled from "styled-components";

export const DashboardRoot = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
`;

export const DashboardBody = styled.div`
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  height: 3.5rem;
  border-bottom: 1px solid hsl(var(--border) / 0.3);
  padding: 0 1rem;
`;

export const HeaderStart = styled.div`
  display: flex;
  align-items: center;
`;

export const Greeting = styled.span`
  color: hsl(var(--muted-foreground));
  font-family: "Space Grotesk", sans-serif;
  font-size: 0.875rem;
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const Main = styled.main`
  flex: 1;
  overflow: auto;
  padding: 1rem;

  @media (min-width: 768px) {
    padding: 2rem;
  }
`;
