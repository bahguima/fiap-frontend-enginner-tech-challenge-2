import * as ToastPrimitives from "@radix-ui/react-toast";
import styled, { css } from "styled-components";

import type { ToastStyleProps } from "./interface";

export const StyledViewport = styled(ToastPrimitives.Viewport)`
  position: fixed;
  top: 0;
  z-index: 100;
  display: flex;
  flex-direction: column-reverse;
  gap: 0.75rem;
  width: 100%;
  max-height: 100vh;
  margin: 0;
  padding: 1rem;
  list-style: none;
  outline: none;

  @media (min-width: 640px) {
    right: 0;
    bottom: 0;
    top: auto;
    flex-direction: column;
  }

  @media (min-width: 768px) {
    max-width: 420px;
  }
`;

const toastVariantStyles = {
  default: css`
    border-color: hsl(var(--border));
    background: hsl(var(--background));
    color: hsl(var(--foreground));
  `,
  destructive: css`
    border-color: hsl(var(--destructive));
    background: hsl(var(--destructive));
    color: hsl(var(--destructive-foreground));
  `,
};

export const StyledToast = styled(ToastPrimitives.Root)<ToastStyleProps>`
  pointer-events: auto;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  overflow: hidden;
  border: 1px solid;
  border-radius: calc(var(--radius) - 2px);
  padding: 1.5rem 2rem 1.5rem 1.5rem;
  box-shadow: 0 10px 25px hsl(var(--foreground) / 0.14);
  transition:
    transform 160ms ease,
    opacity 160ms ease;
  ${({ $variant }) => toastVariantStyles[$variant]}

  &[data-swipe="move"] {
    transform: translateX(var(--radix-toast-swipe-move-x));
    transition: none;
  }

  &[data-swipe="cancel"] {
    transform: translateX(0);
  }

  &[data-swipe="end"] {
    transform: translateX(var(--radix-toast-swipe-end-x));
  }
`;

export const StyledAction = styled(ToastPrimitives.Action)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  height: 2rem;
  border: 1px solid hsl(var(--border));
  border-radius: calc(var(--radius) - 2px);
  background: transparent;
  color: inherit;
  padding: 0 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;

  &:hover {
    background: hsl(var(--secondary));
  }

  &:focus-visible {
    outline: none;
    box-shadow:
      0 0 0 2px hsl(var(--background)),
      0 0 0 4px hsl(var(--ring));
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }
`;

export const StyledClose = styled(ToastPrimitives.Close)`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  border: 0;
  border-radius: calc(var(--radius) - 4px);
  background: transparent;
  color: currentColor;
  opacity: 0.55;
  outline: none;
  transition: opacity 160ms ease;

  &:hover,
  &:focus-visible {
    opacity: 1;
  }

  svg {
    width: 1rem;
    height: 1rem;
  }
`;

export const StyledTitle = styled(ToastPrimitives.Title)`
  font-size: 0.875rem;
  font-weight: 600;
`;

export const StyledDescription = styled(ToastPrimitives.Description)`
  font-size: 0.875rem;
  opacity: 0.9;
`;
