"use client";

import { createContext, useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi } from "@banking/shared/api-client";
import type {
  AuthContextValue,
  AuthProviderProps,
  AuthUser,
} from "./interface";

const AuthContext = createContext<AuthContextValue>({
  user: null,
  isLoading: false,
  login: async () => false,
  logout: async () => {},
});

export function AuthProvider({ children }: AuthProviderProps) {
  const queryClient = useQueryClient();
  const sessionQuery = useQuery({
    queryKey: authQueryKeys.session(),
    queryFn: authApi.getSession,
  });
  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (response) => {
      queryClient.setQueryData(authQueryKeys.session(), response.session);
    },
  });
  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      queryClient.setQueryData(authQueryKeys.session(), {
        authenticated: false,
        user: null,
      });
    },
  });
  const sessionUser = sessionQuery.data?.user;
  const user: AuthUser | null = sessionUser
    ? { name: sessionUser.name, email: sessionUser.email }
    : null;

  const login = async (email: string, password: string) => {
    try {
      const response = await loginMutation.mutateAsync({ email, password });
      return response.session.authenticated;
    } catch {
      return false;
    }
  };

  const logout = async () => {
    await logoutMutation.mutateAsync();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading: sessionQuery.isPending,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

const authQueryKeys = {
  session: () => ["auth", "session"],
};
