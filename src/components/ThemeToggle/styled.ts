import styled from "styled-components";
import { Button } from "@/components/ui/button";

export const MutedButton = styled(Button)`
  color: hsl(var(--muted-foreground));

  &:hover {
    color: hsl(var(--foreground));
  }
`;
