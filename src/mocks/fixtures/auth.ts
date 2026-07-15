import type { AuthSessionResponse, AuthUser } from "@/api/contracts";

export const mockAccessToken = "mock-access-token";
export const mockCredentials = {
  email: "email@teste.com",
  password: "123",
};

export const mockUser: AuthUser = {
  id: "user-1",
  name: "Fulano",
  email: mockCredentials.email,
  plan: "Premium",
  memberSince: "Jan 2025",
};

export const mockSession: AuthSessionResponse = {
  accessToken: mockAccessToken,
  expiresInSeconds: 3600,
  user: mockUser,
};
