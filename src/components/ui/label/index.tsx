import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

import type { LabelProps } from "./interface";
import { StyledLabel } from "./styled";

export type { LabelProps } from "./interface";

const Label = React.forwardRef<React.ElementRef<typeof LabelPrimitive.Root>, LabelProps>((props, ref) => (
  <StyledLabel ref={ref} {...props} />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
