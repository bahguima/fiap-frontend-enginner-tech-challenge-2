import type * as React from "react";
import type * as ToastPrimitives from "@radix-ui/react-toast";

export type ToastVariant = "default" | "destructive";

export interface ToastStyleProps {
  $variant: ToastVariant;
}

export type ToastProps = React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> & {
  variant?: ToastVariant;
};

export type ToastActionElement = React.ReactElement<
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>;
