export interface AuthUser {
    id: string;
    name: string;
    email: string;
}
export interface AuthSession {
    authenticated: boolean;
    user: AuthUser | null;
}
export interface LoginRequest {
    email: string;
    password: string;
}
export interface LoginResponse {
    session: AuthSession;
}
