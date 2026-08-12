import type { ReactNode } from "react";

export interface AuthProviderProps {
  children: ReactNode;
}

export interface AuthUser {
  name: string;
  email: string;
}

export interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}
