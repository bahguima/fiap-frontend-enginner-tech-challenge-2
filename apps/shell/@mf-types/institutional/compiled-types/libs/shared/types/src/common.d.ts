export type ApiErrorCode = "INVALID_CREDENTIALS" | "VALIDATION_ERROR" | "NOT_FOUND" | "MOCK_ERROR" | "INTERNAL_ERROR";
export interface ApiError {
    code: ApiErrorCode;
    message: string;
    details?: Record<string, string[]>;
}
export interface ApiErrorResponse {
    error: ApiError;
}
export interface ApiMessageResponse {
    message: string;
}
