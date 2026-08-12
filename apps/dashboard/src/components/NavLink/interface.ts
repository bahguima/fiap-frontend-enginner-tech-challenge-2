import type { ComponentPropsWithoutRef } from "react";

export interface NavLinkCompatProps
  extends Omit<ComponentPropsWithoutRef<"a">, "href"> {
  to: string;
  activeClassName?: string;
  pendingClassName?: string;
  end?: boolean;
}
