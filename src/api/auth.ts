import type { AuthSessionResponse, LoginRequest } from "./contracts";
import { apiEndpoints } from "./endpoints";
import { restClient } from "@/lib/http";

export const authApi = {
  login: (credentials: LoginRequest) =>
    restClient.post<AuthSessionResponse>(apiEndpoints.auth.login, { body: credentials }),
  session: (accessToken: string) =>
    restClient.get<AuthSessionResponse>(apiEndpoints.auth.session, { accessToken }),
  logout: (accessToken: string) =>
    restClient.postWithoutContent(apiEndpoints.auth.logout, { accessToken }),
};
