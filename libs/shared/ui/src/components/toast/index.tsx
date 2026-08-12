"use client";

import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { X } from "lucide-react";

import type { ToastActionElement, ToastProps } from "./interface";
import {
  StyledAction,
  StyledClose,
  StyledDescription,
  StyledTitle,
  StyledToast,
  StyledViewport,
} from "./styled";

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>((props, ref) => <StyledViewport ref={ref} {...props} />);
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const Toast = React.forwardRef<React.ElementRef<typeof ToastPrimitives.Root>, ToastProps>(
  ({ variant = "default", ...props }, ref) => {
    return <StyledToast ref={ref} $variant={variant} {...props} />;
  },
);
Toast.displayName = ToastPrimitives.Root.displayName;

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>((props, ref) => <StyledAction ref={ref} {...props} />);
ToastAction.displayName = ToastPrimitives.Action.displayName;

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>((props, ref) => (
  <StyledClose ref={ref} toast-close="" {...props}>
    <X />
  </StyledClose>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>((props, ref) => <StyledTitle ref={ref} {...props} />);
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>((props, ref) => <StyledDescription ref={ref} {...props} />);
ToastDescription.displayName = ToastPrimitives.Description.displayName;

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
};
