import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import type { SeparatorProps } from "./interface";
import { StyledSeparator } from "./styled";

const Separator = React.forwardRef<React.ElementRef<typeof SeparatorPrimitive.Root>, SeparatorProps>(
  ({ orientation = "horizontal", decorative = true, ...props }, ref) => (
    <StyledSeparator
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      $orientation={orientation}
      {...props}
    />
  ),
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
