"use client";

import { forwardRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import type { NavLinkCompatProps } from "./interface";

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ activeClassName, pendingClassName, to, end, ...props }, ref) => {
    const pathname = usePathname() ?? "";
    const isActive = end ? pathname === to : pathname === to || pathname.startsWith(`${to}/`);

    return (
      <Link
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
