import styled from "styled-components";
import { Panel } from "@banking/shared/ui/styles/shared";

export const InfoGrid = styled.div`
  display: grid;
  gap: 1rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const InfoCard = styled(Panel)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
`;

export const ProfileIconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: calc(var(--radius) - 2px);
  background: hsl(var(--primary) / 0.1);
  color: hsl(var(--primary));
`;

export const InfoLabel = styled.span`
  color: hsl(var(--muted-foreground));
  font-size: 0.75rem;
`;

export const InfoValue = styled.div`
  font-family: "Space Grotesk", sans-serif;
  font-weight: 600;
`;

export const SettingsPanel = styled(Panel)`
  padding: 1.25rem;
`;

export const LanguageButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const LanguageButton = styled.button`
  border: 1px solid hsl(var(--border) / 0.4);
  border-radius: calc(var(--radius) - 2px);
  background: transparent;
  color: hsl(var(--muted-foreground));
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  transition:
    border-color 160ms ease,
    background-color 160ms ease,
    color 160ms ease;

  &:hover {
    border-color: hsl(var(--border));
    color: hsl(var(--foreground));
  }

  &[data-active="true"] {
    border-color: hsl(var(--primary));
    background: hsl(var(--primary) / 0.1);
    color: hsl(var(--primary));
    font-weight: 500;
  }
`;
