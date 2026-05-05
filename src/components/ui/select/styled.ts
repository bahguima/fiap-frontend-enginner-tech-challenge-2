import * as SelectPrimitive from "@radix-ui/react-select";
import styled from "styled-components";

export const StyledTrigger = styled(SelectPrimitive.Trigger)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 2.5rem;
  border: 1px solid hsl(var(--input));
  border-radius: calc(var(--radius) - 2px);
  background: hsl(var(--background));
  color: hsl(var(--foreground));
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  outline: none;
  transition:
    border-color 160ms ease,
    box-shadow 160ms ease,
    opacity 160ms ease;

  &[data-placeholder] {
    color: hsl(var(--muted-foreground));
  }

  &:focus-visible {
    box-shadow:
      0 0 0 2px hsl(var(--background)),
      0 0 0 4px hsl(var(--ring));
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  svg {
    width: 1rem;
    height: 1rem;
    color: hsl(var(--muted-foreground));
  }
`;

export const StyledContent = styled(SelectPrimitive.Content)`
  z-index: 60;
  min-width: var(--radix-select-trigger-width);
  overflow: hidden;
  border: 1px solid hsl(var(--border));
  border-radius: calc(var(--radius) - 2px);
  background: hsl(var(--popover));
  color: hsl(var(--popover-foreground));
  padding: 0.25rem;
  box-shadow:
    0 10px 15px -3px hsl(var(--foreground) / 0.1),
    0 4px 6px -4px hsl(var(--foreground) / 0.1);
`;

export const StyledViewport = styled(SelectPrimitive.Viewport)`
  width: 100%;
`;

export const StyledItem = styled(SelectPrimitive.Item)`
  position: relative;
  display: flex;
  align-items: center;
  min-height: 2rem;
  border-radius: calc(var(--radius) - 6px);
  padding: 0.375rem 0.5rem 0.375rem 2rem;
  color: hsl(var(--popover-foreground));
  cursor: default;
  font-size: 0.875rem;
  line-height: 1.25rem;
  outline: none;
  user-select: none;
  transition:
    background-color 160ms ease,
    color 160ms ease;

  &[data-highlighted],
  &[data-state="checked"] {
    background: hsl(var(--primary));
    color: hsl(var(--primary-foreground));
  }

  &[data-disabled] {
    pointer-events: none;
    opacity: 0.5;
  }

  svg {
    width: 1rem;
    height: 1rem;
  }
`;

export const ItemIndicator = styled.span`
  position: absolute;
  left: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
`;
