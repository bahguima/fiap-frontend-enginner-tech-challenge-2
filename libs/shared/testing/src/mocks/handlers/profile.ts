import { http, HttpResponse } from "msw";
import type {
  ApiErrorResponse,
  UserProfileResponse,
} from "@banking/shared/types";
import { mockApiEndpoints } from "@banking/shared/api-client/endpoints";
import { mockUserProfile } from "../fixtures/profile";
import { applyMockBehavior } from "./behavior";

export const profileHandlers = [
  http.get<never, never, UserProfileResponse | ApiErrorResponse>(
    mockApiEndpoints.profile,
    async ({ request }) => {
      const forcedError = await applyMockBehavior(request, { status: 503 });
      if (forcedError) return forcedError;

      return HttpResponse.json<UserProfileResponse>(mockUserProfile);
    },
  ),
];
