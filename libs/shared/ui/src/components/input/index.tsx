import * as React from "react";

import type { InputProps } from "./interface";
import { StyledInput } from "./styled";

export type { InputProps } from "./interface";

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ type, ...props }, ref) => {
  return <StyledInput type={type} ref={ref} {...props} />;
});
Input.displayName = "Input";

export { Input };
