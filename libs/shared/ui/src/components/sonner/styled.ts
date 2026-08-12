import { Toaster as Sonner } from "sonner";
import styled from "styled-components";

export const StyledSonner = styled(Sonner)`
  .sonner-toast {
    border: 1px solid hsl(var(--border));
    background: hsl(var(--background));
    color: hsl(var(--foreground));
    box-shadow: 0 10px 25px hsl(var(--foreground) / 0.14);
  }

  .sonner-description {
    color: hsl(var(--muted-foreground));
  }

  .sonner-action {
    background: hsl(var(--primary));
    color: hsl(var(--primary-foreground));
  }

  .sonner-cancel {
    background: hsl(var(--muted));
    color: hsl(var(--muted-foreground));
  }
`;
