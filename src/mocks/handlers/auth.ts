import { http, HttpResponse } from "msw";
import type { LoginRequest } from "@/api/contracts";
import { apiEndpoints } from "@/api/endpoints";
import { mockCredentials, mockSession } from "../fixtures/auth";
import { apiError, applyMockState, isRecord, mockEndpoint, requireAuthorization } from "./common";

export const authHandlers = [
  http.post(mockEndpoint(apiEndpoints.auth.login), async ({ request }) => {
    const mockResponse = await applyMockState(request);
    if (mockResponse) return mockResponse;

    let payload: unknown;
    try {
      payload = await request.json();
    } catch {
      return apiError(400, "INVALID_JSON", "O corpo da requisição deve conter um JSON válido.");
    }

    if (!isLoginRequest(payload)) {
      return apiError(422, "VALIDATION_ERROR", "Informe e-mail e senha válidos.", {
        email: ["O e-mail é obrigatório."],
        password: ["A senha é obrigatória."],
      });
    }

    if (payload.email !== mockCredentials.email || payload.password !== mockCredentials.password) {
      return apiError(401, "INVALID_CREDENTIALS", "E-mail ou senha inválidos.");
    }

    return HttpResponse.json(mockSession);
  }),
  http.get(mockEndpoint(apiEndpoints.auth.session), async ({ request }) => {
    const mockResponse = await applyMockState(request);
    if (mockResponse) return mockResponse;

    const unauthorizedResponse = requireAuthorization(request);
    return unauthorizedResponse ?? HttpResponse.json(mockSession);
  }),
  http.post(mockEndpoint(apiEndpoints.auth.logout), async ({ request }) => {
    const mockResponse = await applyMockState(request);
    if (mockResponse) return mockResponse;

    const unauthorizedResponse = requireAuthorization(request);
    return unauthorizedResponse ?? new HttpResponse(null, { status: 204 });
  }),
];

function isLoginRequest(value: unknown): value is LoginRequest {
  return isRecord(value) && typeof value.email === "string" && typeof value.password === "string";
}
