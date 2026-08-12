import { http, HttpResponse } from "msw";
import type { ApiErrorResponse, CategoryListResponse } from "@banking/shared/types";
import { mockApiEndpoints } from "@banking/shared/api-client/endpoints";
import { mockCategories } from "../fixtures/categories";
import { applyMockBehavior } from "./behavior";

export const categoriesHandlers = [
  http.get<never, never, CategoryListResponse | ApiErrorResponse>(
    mockApiEndpoints.categories.list,
    async ({ request }) => {
      const forcedError = await applyMockBehavior(request, { status: 503 });
      if (forcedError) return forcedError;

      return HttpResponse.json<CategoryListResponse>({
        items: mockCategories,
      });
    },
  ),
];
