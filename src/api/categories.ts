import type {
  CategoriesResponse,
  CategorySuggestionInput,
  CategorySuggestionResponse,
} from "./contracts";
import { apiEndpoints } from "./endpoints";
import { restClient } from "@/lib/http";

export const categoriesApi = {
  list: (accessToken: string) =>
    restClient.get<CategoriesResponse>(apiEndpoints.categories.list, { accessToken }),
  suggest: (accessToken: string, input: CategorySuggestionInput) => {
    const searchParams = new URLSearchParams({
      description: input.description,
      type: input.type,
    });
    return restClient.get<CategorySuggestionResponse>(
      `${apiEndpoints.categories.suggestion}?${searchParams.toString()}`,
      { accessToken },
    );
  },
};
