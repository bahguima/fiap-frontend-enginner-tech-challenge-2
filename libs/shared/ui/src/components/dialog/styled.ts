import * as DialogPrimitive from "@radix-ui/react-dialog";
import styled from "styled-components";

export const DialogHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
`;

export const DialogFooter = styled.div`
  display: flex;
  flex-direction: column-reverse;
  gap: 0.5rem;
  margin-top: 1rem;

  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: flex-end;
  }
`;

export const StyledOverlay = styled(DialogPrimitive.Overlay)`
  position: fixed;
  inset: 0;
  z-index: 50;
  background: hsl(var(--foreground) / 0.72);
`;

export const StyledContent = styled(DialogPrimitive.Content)`
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 51;
  display: grid;
  width: calc(100% - 2rem);
  max-width: 32rem;
  max-height: calc(100vh - 2rem);
  overflow-y: auto;
  transform: translate(-50%, -50%);
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius);
  background: hsl(var(--popover));
  color: hsl(var(--popover-foreground));
  padding: 1.5rem;
  box-shadow: 0 20px 50px hsl(var(--foreground) / 0.24);
  outline: none;
`;

export const StyledClose = styled(DialogPrimitive.Close)`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: 0;
  border-radius: calc(var(--radius) - 4px);
  background: transparent;
  color: hsl(var(--muted-foreground));
  outline: none;
  transition:
    background-color 160ms ease,
    color 160ms ease,
    box-shadow 160ms ease;

  &:hover {
    background: hsl(var(--muted));
    color: hsl(var(--foreground));
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

export const StyledTitle = styled(DialogPrimitive.Title)`
  margin: 0;
  color: hsl(var(--foreground));
  font-family: "Space Grotesk", sans-serif;
  font-size: 1.125rem;
  font-weight: 700;
`;

export const StyledDescription = styled(DialogPrimitive.Description)`
  margin: 0;
  color: hsl(var(--muted-foreground));
  font-size: 0.875rem;
`;
