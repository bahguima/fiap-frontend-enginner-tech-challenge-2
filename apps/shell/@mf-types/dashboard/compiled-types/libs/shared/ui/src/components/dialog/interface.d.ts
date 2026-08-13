import type * as React from "react";
import type * as DialogPrimitive from "@radix-ui/react-dialog";
export interface DialogContentProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
    hideCloseButton?: boolean;
}
