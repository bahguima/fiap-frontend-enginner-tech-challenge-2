import { delay, HttpResponse } from "msw";
import type { ApiErrorResponse } from "@/api/contracts";
import { mockAccessToken } from "../fixtures/auth";
import { getMockDelayMs, getMockScenario } from "../config";

export async function applyMockState(request: Request): Promise<Response | null> {
  await delay(getMockDelayMs(request));

  if (getMockScenario(request) !== "error") return null;

  return apiError(503, "MOCK_FORCED_ERROR", "O mock foi configurado para simular uma indisponibilidade.");
}

export function requireAuthorization(request: Request): Response | null {
  if (request.headers.get("Authorization") === `Bearer ${mockAccessToken}`) return null;
  return apiError(401, "UNAUTHORIZED", "A autenticação é obrigatória para acessar este recurso.");
}

export function apiError(
  status: number,
  code: string,
  message: string,
  details?: Record<string, string[]>,
): Response {
  const payload: ApiErrorResponse = { code, message, details };
  return HttpResponse.json(payload, { status });
}

export function getPathParameter(value: string | readonly string[] | undefined): string | null {
  return typeof value === "string" ? value : null;
}

export function mockEndpoint(endpoint: string): string {
  return endpoint.startsWith("http://") || endpoint.startsWith("https://") ? endpoint : `*${endpoint}`;
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object";
}
