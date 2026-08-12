import type { UserProfileResponse } from "@banking/shared/types";
import { apiEndpoints } from "./endpoints";
import { restClient } from "./client";

export interface ProfileApi {
  get: (signal?: AbortSignal) => Promise<UserProfileResponse>;
}

export const profileApi: ProfileApi = {
  get: (signal) =>
    restClient.request<UserProfileResponse>(apiEndpoints.profile, { signal }),
};
