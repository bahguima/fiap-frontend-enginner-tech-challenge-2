import type {
  ApiErrorCode,
  ApiErrorResponse,
} from "@banking/shared/types";

export type RestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface RestRequestOptions<RequestBody> {
  method?: RestMethod;
  body?: RequestBody;
  headers?: HeadersInit;
  signal?: AbortSignal;
}

export interface RestClientOptions {
  baseUrl?: string;
  fetcher?: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
}

export interface MultipartRequestOptions {
  method?: "POST" | "PUT" | "PATCH";
  signal?: AbortSignal;
}

export class RestClientError extends Error {
  readonly status: number;
  readonly code: ApiErrorCode;
  readonly details: Record<string, string[]> | null;

  constructor(
    status: number,
    code: ApiErrorCode,
    message: string,
    details: Record<string, string[]> | null = null,
  ) {
    super(message);
    this.name = "RestClientError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export class RestClient {
  private readonly baseUrl: string;
  private readonly fetcher:
    | ((input: RequestInfo | URL, init?: RequestInit) => Promise<Response>)
    | null;

  constructor(options: RestClientOptions = {}) {
    this.baseUrl = options.baseUrl ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
    this.fetcher = options.fetcher ?? null;
  }

  async request<ResponseBody, RequestBody = never>(
    path: string,
    options: RestRequestOptions<RequestBody> = {},
  ): Promise<ResponseBody> {
    const headers = new Headers(options.headers);
    const requestInit: RequestInit = {
      method: options.method ?? "GET",
      headers,
      signal: options.signal,
      credentials: "include",
    };

    if (options.body !== undefined) {
      headers.set("Content-Type", "application/json");
      requestInit.body = JSON.stringify(options.body);
    }

    const fetcher = this.fetcher ?? fetch;
    const response = await fetcher(this.resolveUrl(path), requestInit);

    if (!response.ok) {
      throw await createRestClientError(response);
    }

    return response.json();
  }

  async requestMultipart<ResponseBody>(
    path: string,
    body: FormData,
    options: MultipartRequestOptions = {},
  ): Promise<ResponseBody> {
    const fetcher = this.fetcher ?? fetch;
    const response = await fetcher(this.resolveUrl(path), {
      method: options.method ?? "POST",
      body,
      signal: options.signal,
      credentials: "include",
    });

    if (!response.ok) {
      throw await createRestClientError(response);
    }

    return response.json();
  }

  private resolveUrl(path: string) {
    if (this.baseUrl) {
      return new URL(path, this.baseUrl).toString();
    }

    if (globalThis.location?.origin) {
      return new URL(path, globalThis.location.origin).toString();
    }

    return path;
  }
}

async function createRestClientError(response: Response) {
  let errorResponse: ApiErrorResponse | null = null;

  try {
    errorResponse = await response.json();
  } catch {
    return new RestClientError(
      response.status,
      "INTERNAL_ERROR",
      "Não foi possível processar a resposta da API.",
    );
  }

  if (
    !errorResponse ||
    !errorResponse.error ||
    !errorResponse.error.code ||
    !errorResponse.error.message
  ) {
    return new RestClientError(
      response.status,
      "INTERNAL_ERROR",
      "A API retornou um erro sem conteúdo.",
    );
  }

  return new RestClientError(
    response.status,
    errorResponse.error.code,
    errorResponse.error.message,
    errorResponse.error.details ?? null,
  );
}

export const restClient = new RestClient();
