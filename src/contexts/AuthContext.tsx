"use client";

import { createContext, useContext, useState } from "react";
import { authApi } from "@/api";
import type { AuthContextType, ContextProviderProps, User } from "./interface";

const AuthContext = createContext<AuthContextType>({
  user: null,
  accessToken: null,
  login: async () => false,
  logout: () => {},
});

export function AuthProvider({ children }: ContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    try {
      const session = await authApi.login({ email, password });
      setUser({ name: session.user.name, email: session.user.email });
      setAccessToken(session.accessToken);
      return true;
    } catch {
      return false;
    }
  };

  const logout = () => {
    if (accessToken) void authApi.logout(accessToken);
    setUser(null);
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
