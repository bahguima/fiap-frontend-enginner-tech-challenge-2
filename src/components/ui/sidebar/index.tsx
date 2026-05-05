"use client";

import * as React from "react";
import { PanelLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";
import { VisuallyHidden } from "@/styles/shared";

import { SIDEBAR_COOKIE_MAX_AGE, SIDEBAR_COOKIE_NAME, SIDEBAR_KEYBOARD_SHORTCUT } from "./constants";
import type {
  SidebarContextValue,
  SidebarMenuActionProps,
  SidebarMenuButtonProps,
  SidebarMenuSkeletonProps,
  SidebarMenuSubButtonProps,
  SidebarProps,
  SidebarProviderProps,
  SidebarState,
  SidebarTriggerProps,
} from "./interface";
import {
  MobileSidebarContent,
  MobileSidebarInner,
  SidebarContentRoot,
  SidebarGroupActionRoot,
  SidebarGroupActionSlot,
  SidebarGroupContentRoot,
  SidebarGroupLabelRoot,
  SidebarGroupLabelSlot,
  SidebarGroupRoot,
  SidebarHeaderRoot,
  SidebarInputRoot,
  SidebarInsetRoot,
  SidebarMenuActionRoot,
  SidebarMenuActionSlot,
  SidebarMenuBadgeRoot,
  SidebarMenuButtonRoot,
  SidebarMenuButtonSlot,
  SidebarMenuItemRoot,
  SidebarMenuRoot,
  SidebarMenuSkeletonRoot,
  SidebarMenuSubButtonRoot,
  SidebarMenuSubButtonSlot,
  SidebarMenuSubRoot,
  SidebarProviderRoot,
  SidebarRailButton,
  SidebarSeparatorRoot,
  SidebarShell,
  SidebarSkeletonIcon,
  SidebarSkeletonText,
  SidebarTriggerButton,
} from "./styled";

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }

  return context;
}

const SidebarProvider = React.forwardRef<HTMLDivElement, SidebarProviderProps>(
  ({ defaultOpen = true, open: openProp, onOpenChange: setOpenProp, children, ...props }, ref) => {
    const isMobile = useIsMobile();
    const [openMobile, setOpenMobile] = React.useState(false);
    const [_open, _setOpen] = React.useState(defaultOpen);
    const open = openProp ?? _open;

    const setOpen = React.useCallback(
      (value: boolean | ((value: boolean) => boolean)) => {
        const openState = typeof value === "function" ? value(open) : value;
        if (setOpenProp) {
          setOpenProp(openState);
        } else {
          _setOpen(openState);
        }

        document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
      },
      [open, setOpenProp],
    );

    const toggleSidebar = React.useCallback(() => {
      if (isMobile) {
        setOpenMobile((currentOpen) => !currentOpen);
        return;
      }

      setOpen((currentOpen) => !currentOpen);
    }, [isMobile, setOpen]);

    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
          event.preventDefault();
          toggleSidebar();
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [toggleSidebar]);

    const state: SidebarState = open ? "expanded" : "collapsed";

    const contextValue = React.useMemo<SidebarContextValue>(
      () => ({
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar,
      }),
      [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar],
    );

    return (
      <SidebarContext.Provider value={contextValue}>
        <TooltipProvider delayDuration={0}>
          <SidebarProviderRoot ref={ref} data-state={state} {...props}>
            {children}
          </SidebarProviderRoot>
        </TooltipProvider>
      </SidebarContext.Provider>
    );
  },
);
SidebarProvider.displayName = "SidebarProvider";

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ side = "left", variant = "sidebar", collapsible = "offcanvas", children, ...props }, ref) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

    if (collapsible === "none") {
      return (
        <SidebarShell ref={ref} $state="expanded" $variant={variant} $side={side} data-state="expanded" {...props}>
          {children}
        </SidebarShell>
      );
    }

    if (isMobile) {
      return (
        <Sheet open={openMobile} onOpenChange={setOpenMobile}>
          <MobileSidebarContent side={side}>
            <MobileSidebarInner>{children}</MobileSidebarInner>
          </MobileSidebarContent>
        </Sheet>
      );
    }

    return (
      <SidebarShell
        ref={ref}
        $state={state}
        $variant={variant}
        $side={side}
        data-state={state}
        data-collapsible={state === "collapsed" ? collapsible : undefined}
        data-variant={variant}
        data-side={side}
        {...props}
      >
        {children}
      </SidebarShell>
    );
  },
);
Sidebar.displayName = "Sidebar";

const SidebarTrigger = React.forwardRef<React.ElementRef<typeof Button>, SidebarTriggerProps>(
  ({ onClick, ...props }, ref) => {
    const { toggleSidebar } = useSidebar();

    return (
      <SidebarTriggerButton
        ref={ref}
        data-sidebar="trigger"
        variant="ghost"
        size="icon"
        onClick={(event) => {
          onClick?.(event);
          toggleSidebar();
        }}
        {...props}
      >
        <PanelLeft />
        <VisuallyHidden>Alternar menu lateral</VisuallyHidden>
      </SidebarTriggerButton>
    );
  },
);
SidebarTrigger.displayName = "SidebarTrigger";

const SidebarRail = React.forwardRef<HTMLButtonElement, React.ComponentProps<"button">>((props, ref) => {
  const { toggleSidebar } = useSidebar();

  return <SidebarRailButton ref={ref} aria-label="Alternar menu lateral" onClick={toggleSidebar} tabIndex={-1} {...props} />;
});
SidebarRail.displayName = "SidebarRail";

const SidebarInset = React.forwardRef<HTMLDivElement, React.ComponentProps<"main">>((props, ref) => (
  <SidebarInsetRoot ref={ref} {...props} />
));
SidebarInset.displayName = "SidebarInset";

const SidebarInput = React.forwardRef<React.ElementRef<typeof Input>, React.ComponentProps<typeof Input>>((props, ref) => (
  <SidebarInputRoot ref={ref} data-sidebar="input" {...props} />
));
SidebarInput.displayName = "SidebarInput";

const SidebarHeader = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>((props, ref) => (
  <SidebarHeaderRoot ref={ref} data-sidebar="header" {...props} />
));
SidebarHeader.displayName = "SidebarHeader";

const SidebarFooter = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>((props, ref) => (
  <SidebarHeaderRoot ref={ref} data-sidebar="footer" {...props} />
));
SidebarFooter.displayName = "SidebarFooter";

const SidebarSeparator = React.forwardRef<React.ElementRef<typeof Separator>, React.ComponentProps<typeof Separator>>(
  (props, ref) => <SidebarSeparatorRoot ref={ref} data-sidebar="separator" {...props} />,
);
SidebarSeparator.displayName = "SidebarSeparator";

const SidebarContent = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>((props, ref) => (
  <SidebarContentRoot ref={ref} data-sidebar="content" {...props} />
));
SidebarContent.displayName = "SidebarContent";

const SidebarGroup = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>((props, ref) => (
  <SidebarGroupRoot ref={ref} data-sidebar="group" {...props} />
));
SidebarGroup.displayName = "SidebarGroup";

const SidebarGroupLabel = React.forwardRef<HTMLDivElement, React.ComponentProps<"div"> & { asChild?: boolean }>(
  ({ asChild = false, ...props }, ref) => {
    if (asChild) {
      return <SidebarGroupLabelSlot ref={ref} data-sidebar="group-label" {...props} />;
    }

    return <SidebarGroupLabelRoot ref={ref} data-sidebar="group-label" {...props} />;
  },
);
SidebarGroupLabel.displayName = "SidebarGroupLabel";

const SidebarGroupAction = React.forwardRef<HTMLButtonElement, React.ComponentProps<"button"> & { asChild?: boolean }>(
  ({ asChild = false, ...props }, ref) => {
    if (asChild) {
      return <SidebarGroupActionSlot ref={ref} data-sidebar="group-action" {...props} />;
    }

    return <SidebarGroupActionRoot ref={ref} data-sidebar="group-action" {...props} />;
  },
);
SidebarGroupAction.displayName = "SidebarGroupAction";

const SidebarGroupContent = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>((props, ref) => (
  <SidebarGroupContentRoot ref={ref} data-sidebar="group-content" {...props} />
));
SidebarGroupContent.displayName = "SidebarGroupContent";

const SidebarMenu = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>((props, ref) => (
  <SidebarMenuRoot ref={ref} data-sidebar="menu" {...props} />
));
SidebarMenu.displayName = "SidebarMenu";

const SidebarMenuItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>((props, ref) => (
  <SidebarMenuItemRoot ref={ref} data-sidebar="menu-item" {...props} />
));
SidebarMenuItem.displayName = "SidebarMenuItem";

const SidebarMenuButton = React.forwardRef<HTMLButtonElement, SidebarMenuButtonProps>(
  ({ asChild = false, isActive = false, variant = "default", size = "default", tooltip, ...props }, ref) => {
    const { isMobile, state } = useSidebar();

    const button = asChild ? (
      <SidebarMenuButtonSlot
        ref={ref}
        data-sidebar="menu-button"
        data-size={size}
        data-variant={variant}
        data-active={isActive || undefined}
        $variant={variant}
        $size={size}
        {...props}
      />
    ) : (
      <SidebarMenuButtonRoot
        ref={ref}
        data-sidebar="menu-button"
        data-size={size}
        data-variant={variant}
        data-active={isActive || undefined}
        $variant={variant}
        $size={size}
        {...props}
      />
    );

    if (!tooltip) {
      return button;
    }

    const tooltipProps = typeof tooltip === "string" ? { children: tooltip } : tooltip;

    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent side="right" align="center" hidden={state !== "collapsed" || isMobile} {...tooltipProps} />
      </Tooltip>
    );
  },
);
SidebarMenuButton.displayName = "SidebarMenuButton";

const SidebarMenuAction = React.forwardRef<HTMLButtonElement, SidebarMenuActionProps>(
  ({ asChild = false, showOnHover = false, ...props }, ref) => {
    if (asChild) {
      return (
        <SidebarMenuActionSlot
          ref={ref}
          data-sidebar="menu-action"
          data-show-on-hover={showOnHover || undefined}
          {...props}
        />
      );
    }

    return (
      <SidebarMenuActionRoot
        ref={ref}
        data-sidebar="menu-action"
        data-show-on-hover={showOnHover || undefined}
        {...props}
      />
    );
  },
);
SidebarMenuAction.displayName = "SidebarMenuAction";

const SidebarMenuBadge = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>((props, ref) => (
  <SidebarMenuBadgeRoot ref={ref} data-sidebar="menu-badge" {...props} />
));
SidebarMenuBadge.displayName = "SidebarMenuBadge";

const SidebarMenuSkeleton = React.forwardRef<HTMLDivElement, SidebarMenuSkeletonProps>(
  ({ showIcon = false, ...props }, ref) => {
    const width = React.useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, []);

    return (
      <SidebarMenuSkeletonRoot ref={ref} data-sidebar="menu-skeleton" {...props}>
        {showIcon && <SidebarSkeletonIcon data-sidebar="menu-skeleton-icon" />}
        <SidebarSkeletonText data-sidebar="menu-skeleton-text" style={{ width }} />
      </SidebarMenuSkeletonRoot>
    );
  },
);
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton";

const SidebarMenuSub = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>((props, ref) => (
  <SidebarMenuSubRoot ref={ref} data-sidebar="menu-sub" {...props} />
));
SidebarMenuSub.displayName = "SidebarMenuSub";

const SidebarMenuSubItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>((props, ref) => (
  <li ref={ref} {...props} />
));
SidebarMenuSubItem.displayName = "SidebarMenuSubItem";

const SidebarMenuSubButton = React.forwardRef<HTMLAnchorElement, SidebarMenuSubButtonProps>(
  ({ asChild = false, size = "md", isActive, ...props }, ref) => {
    if (asChild) {
      return (
        <SidebarMenuSubButtonSlot
          ref={ref}
          data-sidebar="menu-sub-button"
          data-size={size}
          data-active={isActive || undefined}
          $size={size}
          {...props}
        />
      );
    }

    return (
      <SidebarMenuSubButtonRoot
        ref={ref}
        data-sidebar="menu-sub-button"
        data-size={size}
        data-active={isActive || undefined}
        $size={size}
        {...props}
      />
    );
  },
);
SidebarMenuSubButton.displayName = "SidebarMenuSubButton";

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
};
