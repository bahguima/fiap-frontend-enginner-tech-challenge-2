import type { UserProfileResponse } from "@banking/shared/types";
export interface ProfileApi {
    get: (signal?: AbortSignal) => Promise<UserProfileResponse>;
}
export declare const profileApi: ProfileApi;
