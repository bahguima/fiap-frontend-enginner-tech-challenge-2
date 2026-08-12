import type * as React from "react";
import type * as SheetPrimitive from "@radix-ui/react-dialog";
export type SheetSide = "top" | "right" | "bottom" | "left";
export interface SheetContentProps extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content> {
    side?: SheetSide;
}
