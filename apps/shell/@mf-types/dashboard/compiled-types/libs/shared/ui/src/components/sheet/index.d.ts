import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import type { SheetContentProps } from "./interface";
declare const Sheet: React.FC<SheetPrimitive.DialogProps>;
declare const SheetTrigger: React.ForwardRefExoticComponent<SheetPrimitive.DialogTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const SheetClose: React.ForwardRefExoticComponent<SheetPrimitive.DialogCloseProps & React.RefAttributes<HTMLButtonElement>>;
declare const SheetPortal: React.FC<SheetPrimitive.DialogPortalProps>;
declare const SheetOverlay: React.ForwardRefExoticComponent<Omit<SheetPrimitive.DialogOverlayProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const SheetContent: React.ForwardRefExoticComponent<SheetContentProps & React.RefAttributes<HTMLDivElement>>;
declare const SheetHeader: {
    (props: React.HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
declare const SheetFooter: {
    (props: React.HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
declare const SheetTitle: React.ForwardRefExoticComponent<Omit<SheetPrimitive.DialogTitleProps & React.RefAttributes<HTMLHeadingElement>, "ref"> & React.RefAttributes<HTMLHeadingElement>>;
declare const SheetDescription: React.ForwardRefExoticComponent<Omit<SheetPrimitive.DialogDescriptionProps & React.RefAttributes<HTMLParagraphElement>, "ref"> & React.RefAttributes<HTMLParagraphElement>>;
export { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetOverlay, SheetPortal, SheetTitle, SheetTrigger, };
