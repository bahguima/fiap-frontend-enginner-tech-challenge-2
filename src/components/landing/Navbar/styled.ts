import { motion } from "framer-motion";
import styled from "styled-components";
import { Button } from "@/components/ui/button";
import { Container } from "@/styles/shared";

export const NavRoot = styled.nav`
  position: fixed;
  inset: 0 0 auto;
  z-index: 50;
  border-bottom: 1px solid hsl(var(--border) / 0.5);
  background: hsl(var(--card) / 0.6);
  backdrop-filter: blur(24px);
`;

export const NavContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
`;

export const DesktopLinks = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: flex;
    align-items: center;
    gap: 2rem;
  }
`;

export const NavAnchor = styled.a`
  color: hsl(var(--muted-foreground));
  font-size: 0.875rem;
  transition: color 160ms ease;

  &:hover {
    color: hsl(var(--foreground));
  }
`;

export const DesktopActions = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

export const MutedButton = styled(Button)`
  color: hsl(var(--muted-foreground));

  &:hover {
    color: hsl(var(--foreground));
  }
`;

export const MobileMenuButton = styled.button`
  border: 0;
  background: transparent;
  color: hsl(var(--foreground));
  padding: 0.25rem;

  @media (min-width: 768px) {
    display: none;
  }
`;

export const MobilePanel = styled(motion.div)`
  overflow: hidden;
  border-top: 1px solid hsl(var(--border) / 0.3);
  background: hsl(var(--card) / 0.6);
  backdrop-filter: blur(24px);

  @media (min-width: 768px) {
    display: none;
  }
`;

export const MobilePanelInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
`;

export const MobileAnchor = styled.a`
  color: hsl(var(--muted-foreground));
  font-size: 0.875rem;
  padding: 0.5rem 0;

  &:hover {
    color: hsl(var(--foreground));
  }
`;

export const MobileTools = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0;
`;

export const MobileCta = styled(Button)`
  width: 100%;
`;
