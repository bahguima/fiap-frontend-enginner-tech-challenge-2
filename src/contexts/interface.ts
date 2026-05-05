import type * as React from "react";

import type { Transaction } from "@/data/transactions";
import type { TransactionFormValues, TransactionSummary } from "@/lib/transactions";

export interface ContextProviderProps {
  children: React.ReactNode;
}

export type TransactionsAction =
  | { type: "add"; transaction: Transaction }
  | { type: "update"; id: string; values: TransactionFormValues }
  | { type: "delete"; id: string };

export interface TransactionsContextValue {
  transactions: Transaction[];
  summary: TransactionSummary;
  addTransaction: (values: TransactionFormValues) => void;
  updateTransaction: (id: string, values: TransactionFormValues) => void;
  deleteTransaction: (id: string) => void;
}

export interface User {
  name: string;
  email: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
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
