import styled from "styled-components";
import { Button } from "@banking/shared/ui/components/button";

export const MutedButton = styled(Button)`
  color: hsl(var(--muted-foreground));

  &:hover {
    color: hsl(var(--foreground));
  }
`;
