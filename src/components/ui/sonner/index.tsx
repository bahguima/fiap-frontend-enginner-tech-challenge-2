"use client";

import { useTheme } from "next-themes";
import { toast } from "sonner";

import type { ToasterProps } from "./interface";
import { StyledSonner } from "./styled";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <StyledSonner
      theme={theme === "light" || theme === "dark" || theme === "system" ? theme : "system"}
      toastOptions={{
        classNames: {
          toast: "sonner-toast",
          description: "sonner-description",
          actionButton: "sonner-action",
          cancelButton: "sonner-cancel",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
