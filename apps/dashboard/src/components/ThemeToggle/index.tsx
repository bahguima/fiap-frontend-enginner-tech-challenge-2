"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@dashboard/contexts/ThemeContext";

import type { ThemeToggleProps } from "./interface";
import { MutedButton } from "./styled";

export function ThemeToggle({ "data-testid": dataTestId }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <MutedButton
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
      data-testid={dataTestId}
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </MutedButton>
  );
}
