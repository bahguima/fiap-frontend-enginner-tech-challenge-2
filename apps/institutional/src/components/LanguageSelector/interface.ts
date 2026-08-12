import type { ButtonVariant } from "@banking/shared/ui/components/button";
import type { Language } from "@institutional/contexts/LanguageContext";

export interface LanguageOption {
  code: Language;
  label: string;
}

export interface LanguageSelectorProps {
  "data-testid"?: string;
  variant?: Extract<ButtonVariant, "ghost" | "outline">;
}
