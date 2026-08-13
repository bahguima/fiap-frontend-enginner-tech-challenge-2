import * as SeparatorPrimitive from "@radix-ui/react-separator";
import styled from "styled-components";

import type { SeparatorOrientation } from "./interface";

export const StyledSeparator = styled(SeparatorPrimitive.Root)<{ $orientation: SeparatorOrientation }>`
  flex-shrink: 0;
  background: hsl(var(--border));
  ${({ $orientation }) =>
    $orientation === "horizontal"
      ? `
        width: 100%;
        height: 1px;
      `
      : `
        width: 1px;
        height: 100%;
      `}
`;
