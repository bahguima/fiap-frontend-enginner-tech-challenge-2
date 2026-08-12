import type * as React from "react";
export type ButtonVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "gradient";
export type ButtonSize = "default" | "sm" | "lg" | "icon";
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    "data-testid"?: string;
    asChild?: boolean;
    variant?: ButtonVariant;
    size?: ButtonSize;
}
export interface ButtonStyleProps {
    $variant: ButtonVariant;
    $size: ButtonSize;
}
export interface ButtonVariantOptions {
    variant?: ButtonVariant;
    size?: ButtonSize;
    className?: string;
}
