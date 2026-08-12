"use client";

import { forwardRef } from "react";

import type { NavLinkCompatProps } from "./interface";

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ activeClassName, pendingClassName, to, end, ...props }, ref) => {
    const pathname = window.location.pathname;
    const isActive = end ? pathname === to : pathname === to || pathname.startsWith(`${to}/`);

    return (
      <a
        ref={ref}
        href={to}
        data-active={isActive || undefined}
        aria-current={isActive ? "page" : undefined}
        {...props}
      />
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };
