import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import styled from "styled-components";

import type { StyledInsetProp } from "./interface";

const menuContentStyles = `
  z-index: 50;
  min-width: 8rem;
  overflow: hidden;
  border: 1px solid hsl(var(--border));
  border-radius: calc(var(--radius) - 2px);
  background: hsl(var(--popover));
  color: hsl(var(--popover-foreground));
  box-shadow:
    0 10px 15px -3px hsl(var(--foreground) / 0.1),
    0 4px 6px -4px hsl(var(--foreground) / 0.1);
  padding: 0.25rem;
`;

const itemStyles = `
  position: relative;
  display: flex;
  align-items: center;
  min-height: 2rem;
  border-radius: calc(var(--radius) - 6px);
  color: hsl(var(--popover-foreground));
  cursor: default;
  font-size: 0.875rem;
  line-height: 1.25rem;
  outline: none;
  user-select: none;
  transition:
    background-color 160ms ease,
    color 160ms ease;

  &:focus,
  &[data-highlighted],
  &[data-active="true"] {
    background: hsl(var(--accent));
    color: hsl(var(--accent-foreground));
  }

  &[data-disabled] {
    pointer-events: none;
    opacity: 0.5;
  }
`;

export const StyledSubTrigger = styled(DropdownMenuPrimitive.SubTrigger)<StyledInsetProp>`
  ${itemStyles}
  padding: 0.375rem 0.5rem;
  padding-left: ${({ $inset }) => ($inset ? "2rem" : "0.5rem")};
`;

export const StyledSubContent = styled(DropdownMenuPrimitive.SubContent)`
  ${menuContentStyles}
`;

export const StyledContent = styled(DropdownMenuPrimitive.Content)`
  ${menuContentStyles}
`;

export const StyledItem = styled(DropdownMenuPrimitive.Item)<StyledInsetProp>`
  ${itemStyles}
  padding: 0.375rem 0.5rem;
  padding-left: ${({ $inset }) => ($inset ? "2rem" : "0.5rem")};
`;

export const StyledCheckboxItem = styled(DropdownMenuPrimitive.CheckboxItem)`
  ${itemStyles}
  padding: 0.375rem 0.5rem 0.375rem 2rem;
`;

export const StyledRadioItem = styled(DropdownMenuPrimitive.RadioItem)`
  ${itemStyles}
  padding: 0.375rem 0.5rem 0.375rem 2rem;
`;

export const IndicatorSlot = styled.span`
  position: absolute;
  left: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 0.875rem;
  height: 0.875rem;
`;

export const StyledCheck = styled(Check)`
  width: 1rem;
  height: 1rem;
`;

export const StyledCircle = styled(Circle)`
  width: 0.5rem;
  height: 0.5rem;
  fill: currentColor;
`;

export const StyledChevronRight = styled(ChevronRight)`
  width: 1rem;
  height: 1rem;
  margin-left: auto;
`;

export const StyledLabel = styled(DropdownMenuPrimitive.Label)<StyledInsetProp>`
  padding: 0.375rem 0.5rem;
  padding-left: ${({ $inset }) => ($inset ? "2rem" : "0.5rem")};
  font-size: 0.875rem;
  font-weight: 600;
`;

export const StyledSeparator = styled(DropdownMenuPrimitive.Separator)`
  height: 1px;
  margin: 0.25rem -0.25rem;
  background: hsl(var(--muted));
`;

export const StyledShortcut = styled.span`
  margin-left: auto;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  opacity: 0.6;
`;
