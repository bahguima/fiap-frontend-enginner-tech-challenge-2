import type { ContextProviderProps, LanguageContextType } from "./interface";
export type { Language } from "./interface";
export declare function LanguageProvider({ children }: ContextProviderProps): import("react/jsx-runtime").JSX.Element;
export declare const useLanguage: () => LanguageContextType;
