import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import styled from "styled-components";

export const StyledTooltipContent = styled(TooltipPrimitive.Content)`
  z-index: 50;
  overflow: hidden;
  border: 1px solid hsl(var(--border));
  border-radius: calc(var(--radius) - 2px);
  background: hsl(var(--popover));
  color: hsl(var(--popover-foreground));
  box-shadow: 0 6px 18px hsl(var(--foreground) / 0.14);
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
`;
