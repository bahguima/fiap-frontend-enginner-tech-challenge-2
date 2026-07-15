export interface AuthUser {
  id: string;
  name: string;
  email: string;
  plan: string;
  memberSince: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthSessionResponse {
  accessToken: string;
  expiresInSeconds: number;
  user: AuthUser;
}
