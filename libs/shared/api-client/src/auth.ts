import type {
  ApiMessageResponse,
  AuthSession,
  LoginRequest,
  LoginResponse,
} from "@banking/shared/types";
import { restClient } from "./client";
import { apiEndpoints } from "./endpoints";

export interface AuthApi {
  login: (credentials: LoginRequest) => Promise<LoginResponse>;
  getSession: () => Promise<AuthSession>;
  logout: () => Promise<ApiMessageResponse>;
}

export const authApi: AuthApi = {
  login: (credentials) =>
    restClient.request<LoginResponse, LoginRequest>(apiEndpoints.auth.login, {
      method: "POST",
      body: credentials,
    }),
  getSession: () => restClient.request<AuthSession>(apiEndpoints.auth.session),
  logout: () =>
    restClient.request<ApiMessageResponse>(apiEndpoints.auth.logout, {
      method: "POST",
    }),
};
