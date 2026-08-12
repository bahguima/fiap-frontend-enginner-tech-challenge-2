import type * as React from "react";
export interface ContextProviderProps {
    children: React.ReactNode;
}
export type Theme = "light" | "dark";
export interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void;
}
export type Language = "pt" | "en" | "es";
export type Translations = Record<string, Record<Language, string>>;
export interface LanguageContextType {
    lang: Language;
    setLang: (language: Language) => void;
    t: (key: string) => string;
}
