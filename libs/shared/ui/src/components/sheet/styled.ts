import * as SheetPrimitive from "@radix-ui/react-dialog";
import styled, { css } from "styled-components";

import type { SheetSide } from "./interface";

export const StyledOverlay = styled(SheetPrimitive.Overlay)`
  position: fixed;
  inset: 0;
  z-index: 50;
  background: hsl(0 0% 0% / 0.8);
`;

const sideStyles = {
  top: css`
    inset: 0 0 auto;
    border-bottom: 1px solid hsl(var(--border));
  `,
  bottom: css`
    inset: auto 0 0;
    border-top: 1px solid hsl(var(--border));
  `,
  left: css`
    inset: 0 auto 0 0;
    width: min(75vw, 24rem);
    height: 100%;
    border-right: 1px solid hsl(var(--border));
  `,
  right: css`
    inset: 0 0 0 auto;
    width: min(75vw, 24rem);
    height: 100%;
    border-left: 1px solid hsl(var(--border));
  `,
};

export const StyledContent = styled(SheetPrimitive.Content)<{ $side: SheetSide }>`
  position: fixed;
  z-index: 50;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: hsl(var(--background));
  color: hsl(var(--foreground));
  padding: 1.5rem;
  box-shadow: 0 10px 30px hsl(var(--foreground) / 0.14);
  transition: transform 220ms ease;
  ${({ $side }) => sideStyles[$side]}
`;

export const StyledClose = styled(SheetPrimitive.Close)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: 0;
  border-radius: calc(var(--radius) - 4px);
  background: transparent;
  color: hsl(var(--foreground));
  opacity: 0.7;
  outline: none;
  transition: opacity 160ms ease;

  &:hover,
  &:focus-visible {
    opacity: 1;
  }

  &:focus-visible {
    box-shadow:
      0 0 0 2px hsl(var(--background)),
      0 0 0 4px hsl(var(--ring));
  }

  svg {
    width: 1rem;
    height: 1rem;
  }
`;

export const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: center;

  @media (min-width: 640px) {
    text-align: left;
  }
`;

export const StyledFooter = styled.div`
  display: flex;
  flex-direction: column-reverse;
  gap: 0.5rem;
  margin-top: auto;

  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: flex-end;
  }
`;

export const StyledTitle = styled(SheetPrimitive.Title)`
  margin: 0;
  color: hsl(var(--foreground));
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1;
`;

export const StyledDescription = styled(SheetPrimitive.Description)`
  margin: 0;
  color: hsl(var(--muted-foreground));
  font-size: 0.875rem;
`;
