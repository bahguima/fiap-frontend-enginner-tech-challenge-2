import type { ApiErrorCode } from "@banking/shared/types";
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
export declare class RestClientError extends Error {
    readonly status: number;
    readonly code: ApiErrorCode;
    readonly details: Record<string, string[]> | null;
    constructor(status: number, code: ApiErrorCode, message: string, details?: Record<string, string[]> | null);
}
export declare class RestClient {
    private readonly baseUrl;
    private readonly fetcher;
    constructor(options?: RestClientOptions);
    request<ResponseBody, RequestBody = never>(path: string, options?: RestRequestOptions<RequestBody>): Promise<ResponseBody>;
    requestMultipart<ResponseBody>(path: string, body: FormData, options?: MultipartRequestOptions): Promise<ResponseBody>;
    private resolveUrl;
}
export declare const restClient: RestClient;
