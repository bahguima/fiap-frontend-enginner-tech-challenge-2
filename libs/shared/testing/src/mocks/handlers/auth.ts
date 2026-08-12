import { http, HttpResponse } from "msw";
import type {
  ApiErrorResponse,
  ApiMessageResponse,
  AuthSession,
  LoginRequest,
  LoginResponse,
} from "@banking/shared/types";
import { mockApiEndpoints } from "@banking/shared/api-client/endpoints";
import { mockAuthCredentials } from "../fixtures/auth";
import {
  authenticateMockSession,
  clearMockSession,
  getMockSession,
} from "../state";
import { applyMockBehavior, createErrorResponse } from "./behavior";

export const authHandlers = [
  http.post<never, LoginRequest, LoginResponse | ApiErrorResponse>(
    mockApiEndpoints.auth.login,
    async ({ request }) => {
      const forcedError = await applyMockBehavior(request, { status: 503 });
      if (forcedError) return forcedError;

      const credentials = await request.json();

      if (
        credentials.email !== mockAuthCredentials.email ||
        credentials.password !== mockAuthCredentials.password
      ) {
        return createErrorResponse(
          401,
          "INVALID_CREDENTIALS",
          "E-mail ou senha inválidos.",
        );
      }

      return HttpResponse.json<LoginResponse>({
        session: authenticateMockSession(),
      });
    },
  ),
  http.get<never, never, AuthSession | ApiErrorResponse>(
    mockApiEndpoints.auth.session,
    async ({ request }) => {
      const forcedError = await applyMockBehavior(request, { status: 503 });
      if (forcedError) return forcedError;

      return HttpResponse.json<AuthSession>(getMockSession());
    },
  ),
  http.post<never, never, ApiMessageResponse | ApiErrorResponse>(
    mockApiEndpoints.auth.logout,
    async ({ request }) => {
      const forcedError = await applyMockBehavior(request, { status: 503 });
      if (forcedError) return forcedError;

      clearMockSession();
      return HttpResponse.json<ApiMessageResponse>({
        message: "Sessão encerrada com sucesso.",
      });
    },
  ),
];
