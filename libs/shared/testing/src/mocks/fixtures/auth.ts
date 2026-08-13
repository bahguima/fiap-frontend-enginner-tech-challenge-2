import type { AuthUser } from "@banking/shared/types";

export interface MockAuthCredentials {
  email: string;
  password: string;
}

export const mockAuthCredentials: MockAuthCredentials = {
  email: "email@teste.com",
  password: "123",
};

export const mockAuthUser: AuthUser = {
  id: "user-1",
  name: "Fulano",
  email: "email@teste.com",
};
