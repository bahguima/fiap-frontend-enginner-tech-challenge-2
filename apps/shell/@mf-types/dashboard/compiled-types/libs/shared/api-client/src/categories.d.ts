import type { CategoryListResponse } from "@banking/shared/types";
export interface CategoriesApi {
    list: () => Promise<CategoryListResponse>;
}
export declare const categoriesApi: CategoriesApi;
