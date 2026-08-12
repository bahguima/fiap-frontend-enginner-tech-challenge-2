import { Slot } from "@radix-ui/react-slot";
import styled, { css } from "styled-components";

import { Button } from "@banking/shared/ui/components/button";
import { Input } from "@banking/shared/ui/components/input";
import { Separator } from "@banking/shared/ui/components/separator";
import { SheetContent } from "@banking/shared/ui/components/sheet";
import { Skeleton } from "@banking/shared/ui/components/skeleton";

import { SIDEBAR_WIDTH, SIDEBAR_WIDTH_ICON, SIDEBAR_WIDTH_MOBILE } from "./constants";
import type {
  MenuButtonStyleProps,
  SidebarSide,
  SidebarState,
  SidebarVariant,
  SubButtonStyleProps,
} from "./interface";

export const SidebarProviderRoot = styled.div`
  display: flex;
  width: 100%;
  min-height: 100svh;
`;

export const SidebarShell = styled.aside<{ $state: SidebarState; $variant: SidebarVariant; $side: SidebarSide }>`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  width: ${({ $state }) => ($state === "collapsed" ? SIDEBAR_WIDTH_ICON : SIDEBAR_WIDTH)};
  min-height: 100svh;
  border-right: ${({ $side }) => ($side === "left" ? "1px solid hsl(var(--sidebar-border))" : "0")};
  border-left: ${({ $side }) => ($side === "right" ? "1px solid hsl(var(--sidebar-border))" : "0")};
  background: hsl(var(--sidebar-background));
  color: hsl(var(--sidebar-foreground));
  transition: width 200ms ease;

  ${({ $variant }) =>
    $variant === "floating" &&
    css`
      margin: 0.5rem;
      border: 1px solid hsl(var(--sidebar-border));
      border-radius: var(--radius);
      box-shadow: 0 8px 24px hsl(var(--foreground) / 0.1);
    `}
`;

export const MobileSidebarContent = styled(SheetContent)`
  width: ${SIDEBAR_WIDTH_MOBILE};
  max-width: 82vw;
  background: hsl(var(--sidebar-background));
  color: hsl(var(--sidebar-foreground));
  padding: 0;
`;

export const MobileSidebarInner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const SidebarTriggerButton = styled(Button)`
  width: 1.75rem;
  height: 1.75rem;
  margin-right: 1rem;
`;

export const SidebarRailButton = styled.button`
  position: absolute;
  inset-block: 0;
  z-index: 20;
  width: 1rem;
  border: 0;
  background: transparent;
`;

export const SidebarInsetRoot = styled.main`
  position: relative;
  display: flex;
  min-height: 100svh;
  flex: 1;
  flex-direction: column;
  background: hsl(var(--background));
`;

export const SidebarInputRoot = styled(Input)`
  height: 2rem;
  background: hsl(var(--background));
  box-shadow: none;
`;

export const SidebarHeaderRoot = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem;
`;

export const SidebarSeparatorRoot = styled(Separator)`
  margin: 0.5rem;
  width: auto;
  background: hsl(var(--sidebar-border));
`;

export const SidebarContentRoot = styled.div`
  display: flex;
  min-height: 0;
  flex: 1;
  flex-direction: column;
  gap: 0.5rem;
  overflow: auto;
  padding-top: 1rem;
`;

export const SidebarGroupRoot = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  min-width: 0;
  flex-direction: column;
  padding: 0.5rem;
`;

const groupLabelStyles = css`
  display: flex;
  align-items: center;
  height: 2rem;
  border-radius: calc(var(--radius) - 2px);
  padding: 0 0.5rem;
  color: hsl(var(--sidebar-foreground) / 0.7);
  font-size: 0.75rem;
  font-weight: 500;
  outline: none;
`;

export const SidebarGroupLabelRoot = styled.div`
  ${groupLabelStyles}
`;

export const SidebarGroupLabelSlot = styled(Slot)`
  ${groupLabelStyles}
`;

const groupActionStyles = css`
  position: absolute;
  top: 0.875rem;
  right: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  aspect-ratio: 1;
  border: 0;
  border-radius: calc(var(--radius) - 2px);
  background: transparent;
  color: hsl(var(--sidebar-foreground));
  outline: none;

  &:hover {
    background: hsl(var(--sidebar-accent));
    color: hsl(var(--sidebar-accent-foreground));
  }
`;

export const SidebarGroupActionRoot = styled.button`
  ${groupActionStyles}
`;

export const SidebarGroupActionSlot = styled(Slot)`
  ${groupActionStyles}
`;

export const SidebarGroupContentRoot = styled.div`
  width: 100%;
  font-size: 0.875rem;
`;

export const SidebarMenuRoot = styled.ul`
  display: flex;
  width: 100%;
  min-width: 0;
  flex-direction: column;
  gap: 0.25rem;
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const SidebarMenuItemRoot = styled.li`
  position: relative;
`;

const menuButtonStyles = css<MenuButtonStyleProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  min-width: 0;
  overflow: hidden;
  border: 0;
  border-radius: calc(var(--radius) - 2px);
  background: ${({ $variant }) => ($variant === "outline" ? "hsl(var(--background))" : "transparent")};
  color: hsl(var(--sidebar-foreground));
  padding: ${({ $size }) => ($size === "lg" ? "0.75rem" : "0.5rem")};
  min-height: ${({ $size }) => ($size === "sm" ? "1.75rem" : $size === "lg" ? "3rem" : "2rem")};
  font-size: ${({ $size }) => ($size === "sm" ? "0.75rem" : "0.875rem")};
  line-height: 1.25rem;
  text-align: left;
  outline: none;
  transition:
    background-color 160ms ease,
    color 160ms ease,
    box-shadow 160ms ease;

  &:hover,
  &:focus-visible,
  &[data-active="true"],
  &[aria-current="page"] {
    background: hsl(var(--sidebar-accent));
    color: hsl(var(--sidebar-accent-foreground));
  }

  &[data-active="true"],
  &[aria-current="page"] {
    font-weight: 500;
  }

  &:focus-visible {
    box-shadow: 0 0 0 2px hsl(var(--sidebar-ring));
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
    color: currentColor;
  }

  span:last-child {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const SidebarMenuButtonRoot = styled.button<MenuButtonStyleProps>`
  ${menuButtonStyles}
`;

export const SidebarMenuButtonSlot = styled(Slot)<MenuButtonStyleProps>`
  ${menuButtonStyles}
`;

const menuActionStyles = css`
  position: absolute;
  top: 0.375rem;
  right: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  aspect-ratio: 1;
  border: 0;
  border-radius: calc(var(--radius) - 2px);
  background: transparent;
  color: hsl(var(--sidebar-foreground));

  &:hover {
    background: hsl(var(--sidebar-accent));
    color: hsl(var(--sidebar-accent-foreground));
  }

  &[data-show-on-hover="true"] {
    opacity: 0;
  }

  ${SidebarMenuItemRoot}:hover &[data-show-on-hover="true"],
  ${SidebarMenuItemRoot}:focus-within &[data-show-on-hover="true"] {
    opacity: 1;
  }
`;

export const SidebarMenuActionRoot = styled.button`
  ${menuActionStyles}
`;

export const SidebarMenuActionSlot = styled(Slot)`
  ${menuActionStyles}
`;

export const SidebarMenuBadgeRoot = styled.div`
  pointer-events: none;
  position: absolute;
  top: 0.375rem;
  right: 0.25rem;
  display: flex;
  min-width: 1.25rem;
  height: 1.25rem;
  align-items: center;
  justify-content: center;
  border-radius: calc(var(--radius) - 2px);
  padding: 0 0.25rem;
  color: hsl(var(--sidebar-foreground));
  font-size: 0.75rem;
  font-variant-numeric: tabular-nums;
  font-weight: 500;
`;

export const SidebarMenuSkeletonRoot = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  height: 2rem;
  border-radius: calc(var(--radius) - 2px);
  padding: 0 0.5rem;
`;

export const SidebarSkeletonIcon = styled(Skeleton)`
  width: 1rem;
  height: 1rem;
`;

export const SidebarSkeletonText = styled(Skeleton)`
  height: 1rem;
  max-width: 100%;
  flex: 1;
`;

export const SidebarMenuSubRoot = styled.ul`
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 0.25rem;
  margin: 0.25rem 0.875rem;
  border-left: 1px solid hsl(var(--sidebar-border));
  padding: 0.125rem 0 0.125rem 0.625rem;
  list-style: none;
`;

const subButtonStyles = css<SubButtonStyleProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 0;
  height: 1.75rem;
  overflow: hidden;
  border-radius: calc(var(--radius) - 2px);
  color: hsl(var(--sidebar-foreground));
  padding: 0 0.5rem;
  font-size: ${({ $size }) => ($size === "sm" ? "0.75rem" : "0.875rem")};
  outline: none;

  &:hover,
  &:focus-visible,
  &[data-active="true"] {
    background: hsl(var(--sidebar-accent));
    color: hsl(var(--sidebar-accent-foreground));
  }
`;

export const SidebarMenuSubButtonRoot = styled.a<SubButtonStyleProps>`
  ${subButtonStyles}
`;

export const SidebarMenuSubButtonSlot = styled(Slot)<SubButtonStyleProps>`
  ${subButtonStyles}
`;
