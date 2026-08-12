import * as React from "react";
import type { ButtonProps, ButtonVariantOptions } from "./interface";
export type { ButtonProps, ButtonSize, ButtonVariant, ButtonVariantOptions } from "./interface";
export declare function buttonVariants({ className }?: ButtonVariantOptions): string;
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
export { Button };
