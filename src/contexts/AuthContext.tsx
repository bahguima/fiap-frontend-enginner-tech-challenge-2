"use client";

import { createContext, useContext, useState } from "react";
import type { AuthContextType, ContextProviderProps, User } from "./interface";

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => false,
  logout: () => {},
});

export function AuthProvider({ children }: ContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string) => {
    if (email === "email@teste.com" && password === "123") {
      setUser({ name: "Fulano", email: "email@teste.com" });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
