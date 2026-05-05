import type { ComponentPropsWithoutRef } from "react";
import Link from "next/link";

export interface NavLinkCompatProps extends Omit<ComponentPropsWithoutRef<typeof Link>, "href"> {
  to: string;
  activeClassName?: string;
  pendingClassName?: string;
  end?: boolean;
}
