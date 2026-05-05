import * as LabelPrimitive from "@radix-ui/react-label";
import styled from "styled-components";

export const StyledLabel = styled(LabelPrimitive.Root)`
  color: hsl(var(--foreground));
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1;

  &[data-disabled="true"] {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;
