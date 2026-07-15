import type { ApiErrorResponse } from "@/api/contracts";

export interface ApiRequestOptions {
  accessToken?: string;
  headers?: HeadersInit;
  signal?: AbortSignal;
}

export interface ApiJsonRequestOptions extends ApiRequestOptions {
  body?: object;
}

export class ApiClientError extends Error {
  readonly status: number;
  readonly code: string;
  readonly details?: Record<string, string[]>;

  constructor(status: number, error: ApiErrorResponse) {
    super(error.message);
    this.name = "ApiClientError";
    this.status = status;
    this.code = error.code;
    this.details = error.details;
  }
}
