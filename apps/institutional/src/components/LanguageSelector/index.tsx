"use client";

import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@banking/shared/ui/components/dropdown-menu";
import { useLanguage } from "@institutional/contexts/LanguageContext";

import type { LanguageOption, LanguageSelectorProps } from "./interface";
import { LanguageLabel, MutedButton } from "./styled";

const languages: LanguageOption[] = [
  { code: "pt", label: "Português" },
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
];

export function LanguageSelector({ "data-testid": dataTestId, variant = "ghost" }: LanguageSelectorProps) {
  const { lang, setLang } = useLanguage();
  const current = languages.find((language) => language.code === lang);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <MutedButton variant={variant} size="sm" data-testid={dataTestId}>
          <Globe size={14} />
          <LanguageLabel>{current?.label}</LanguageLabel>
        </MutedButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => setLang(language.code)}
            data-active={lang === language.code || undefined}
          >
            {language.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
