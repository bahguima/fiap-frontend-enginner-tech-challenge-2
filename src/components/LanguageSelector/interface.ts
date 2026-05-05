import type { ButtonVariant } from "@/components/ui/button";
import type { Language } from "@/contexts/LanguageContext";

export interface LanguageOption {
  code: Language;
  label: string;
}

export interface LanguageSelectorProps {
  "data-testid"?: string;
  variant?: Extract<ButtonVariant, "ghost" | "outline">;
}
