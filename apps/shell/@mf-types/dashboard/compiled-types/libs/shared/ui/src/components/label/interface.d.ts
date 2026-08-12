import type * as React from "react";
import type * as LabelPrimitive from "@radix-ui/react-label";
export interface LabelProps extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {
    "data-testid"?: string;
}
