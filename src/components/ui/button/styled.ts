import { Slot } from "@radix-ui/react-slot";
import styled, { css } from "styled-components";

import type { ButtonStyleProps } from "./interface";

const variantStyles = {
  default: css`
    background: hsl(var(--primary));
    color: hsl(var(--primary-foreground));

    &:hover {
      background: hsl(var(--primary) / 0.9);
    }
  `,
  destructive: css`
    background: hsl(var(--destructive));
    color: hsl(var(--destructive-foreground));

    &:hover {
      background: hsl(var(--destructive) / 0.9);
    }
  `,
  outline: css`
    border: 1px solid hsl(var(--input));
    background: hsl(var(--background));
    color: hsl(var(--foreground));

    &:hover {
      background: hsl(var(--accent));
      color: hsl(var(--accent-foreground));
    }
  `,
  secondary: css`
    background: hsl(var(--secondary));
    color: hsl(var(--secondary-foreground));

    &:hover {
      background: hsl(var(--secondary) / 0.8);
    }
  `,
  ghost: css`
    background: transparent;
    color: hsl(var(--foreground));

    &:hover {
      background: hsl(var(--accent));
      color: hsl(var(--accent-foreground));
    }
  `,
  link: css`
    height: auto;
    padding: 0;
    background: transparent;
    color: hsl(var(--primary));
    text-underline-offset: 4px;

    &:hover {
      text-decoration: underline;
    }
  `,
  gradient: css`
    background: linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)));
    color: hsl(var(--primary-foreground));
    box-shadow: var(--shadow-glow);

    &:hover {
      opacity: 0.9;
    }
  `,
};

const sizeStyles = {
  default: css`
    height: 2.5rem;
    padding: 0.5rem 1rem;
  `,
  sm: css`
    height: 2.25rem;
    padding: 0.5rem 0.75rem;
  `,
  lg: css`
    height: 2.75rem;
    padding: 0.5rem 2rem;
    font-size: 1rem;
  `,
  icon: css`
    width: 2.5rem;
    height: 2.5rem;
    padding: 0;
  `,
};

const buttonBase = css<ButtonStyleProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex-shrink: 0;
  border: 0;
  border-radius: calc(var(--radius) - 2px);
  white-space: nowrap;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1;
  outline: none;
  transition:
    background-color 160ms ease,
    border-color 160ms ease,
    color 160ms ease,
    opacity 160ms ease,
    box-shadow 160ms ease;

  ${({ $variant }) => variantStyles[$variant]}
  ${({ $size }) => sizeStyles[$size]}

  &:focus-visible {
    box-shadow:
      0 0 0 2px hsl(var(--background)),
      0 0 0 4px hsl(var(--ring));
  }

  &:disabled,
  &[aria-disabled="true"] {
    pointer-events: none;
    opacity: 0.5;
  }

  svg {
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
    pointer-events: none;
  }
`;

export const StyledButton = styled.button<ButtonStyleProps>`
  ${buttonBase}
`;

export const StyledSlot = styled(Slot)<ButtonStyleProps>`
  ${buttonBase}
`;
