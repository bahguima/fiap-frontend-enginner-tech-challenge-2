import * as React from "react";

import type { ButtonProps, ButtonVariantOptions } from "./interface";
import { StyledButton, StyledSlot } from "./styled";

export type { ButtonProps, ButtonSize, ButtonVariant, ButtonVariantOptions } from "./interface";

export function buttonVariants({ className }: ButtonVariantOptions = {}) {
  return className ?? "";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "default", size = "default", asChild = false, ...props }, ref) => {
    if (asChild) {
      return <StyledSlot ref={ref} $variant={variant} $size={size} {...props} />;
    }

    return <StyledButton ref={ref} $variant={variant} $size={size} {...props} />;
  },
);
Button.displayName = "Button";

export { Button };
