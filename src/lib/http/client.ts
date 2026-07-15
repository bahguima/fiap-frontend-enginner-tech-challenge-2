import type { ApiErrorResponse } from "@/api/contracts";
import type { ApiJsonRequestOptions, ApiRequestOptions } from "./interface";
import { ApiClientError } from "./interface";

const fallbackError: ApiErrorResponse = {
  code: "UNEXPECTED_API_ERROR",
  message: "Não foi possível concluir a requisição.",
};

class RestClient {
  get<T>(url: string, options: ApiRequestOptions = {}): Promise<T> {
    return this.request<T>(url, "GET", options);
  }

  post<T>(url: string, options: ApiJsonRequestOptions = {}): Promise<T> {
    return this.request<T>(url, "POST", options);
  }

  postWithoutContent(url: string, options: ApiRequestOptions = {}): Promise<void> {
    return this.requestWithoutContent(url, "POST", options);
  }

  put<T>(url: string, options: ApiJsonRequestOptions = {}): Promise<T> {
    return this.request<T>(url, "PUT", options);
  }

  postForm<T>(url: string, formData: FormData, options: ApiRequestOptions = {}): Promise<T> {
    return this.request<T>(url, "POST", options, formData);
  }

  delete(url: string, options: ApiRequestOptions = {}): Promise<void> {
    return this.requestWithoutContent(url, "DELETE", options);
  }

  private async request<T>(
    url: string,
    method: string,
    options: ApiJsonRequestOptions,
    formData?: FormData,
  ): Promise<T> {
    const response = await fetch(resolveRequestUrl(url), createRequestInit(method, options, formData));

    if (!response.ok) {
      throw await createApiClientError(response);
    }

    return response.json();
  }

  private async requestWithoutContent(
    url: string,
    method: string,
    options: ApiRequestOptions,
  ): Promise<void> {
    const response = await fetch(resolveRequestUrl(url), createRequestInit(method, options));

    if (!response.ok) {
      throw await createApiClientError(response);
    }
  }
}

function createRequestInit(
  method: string,
  options: ApiJsonRequestOptions,
  formData?: FormData,
): RequestInit {
  const headers = new Headers(options.headers);
  const body = formData ?? (options.body ? JSON.stringify(options.body) : null);

  headers.set("Accept", "application/json");

  if (options.accessToken) {
    headers.set("Authorization", `Bearer ${options.accessToken}`);
  }

  if (options.body) {
    headers.set("Content-Type", "application/json");
  }

  return { method, headers, body, signal: options.signal };
}

async function createApiClientError(response: Response): Promise<ApiClientError> {
  try {
    const payload: unknown = await response.json();

    if (isApiErrorResponse(payload)) {
      return new ApiClientError(response.status, payload);
    }
  } catch {
    return new ApiClientError(response.status, fallbackError);
  }

  return new ApiClientError(response.status, fallbackError);
}

function isApiErrorResponse(payload: unknown): payload is ApiErrorResponse {
  if (!isRecord(payload)) return false;
  return typeof payload.code === "string" && typeof payload.message === "string";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object";
}

function resolveRequestUrl(url: string): string {
  if (url.startsWith("http://") || url.startsWith("https://") || typeof window !== "undefined") {
    return url;
  }

  return new URL(url, "http://localhost").toString();
}

export const restClient = new RestClient();
