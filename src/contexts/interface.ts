import type * as React from "react";

export interface ContextProviderProps {
  children: React.ReactNode;
}

export interface User {
  name: string;
  email: string;
}

export interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
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
