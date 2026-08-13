import type { ApiMessageResponse, AuthSession, LoginRequest, LoginResponse } from "@banking/shared/types";
export interface AuthApi {
    login: (credentials: LoginRequest) => Promise<LoginResponse>;
    getSession: () => Promise<AuthSession>;
    logout: () => Promise<ApiMessageResponse>;
}
export declare const authApi: AuthApi;
