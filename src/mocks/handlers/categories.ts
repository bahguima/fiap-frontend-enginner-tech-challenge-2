import { http, HttpResponse } from "msw";
import type { CategoriesResponse } from "@/api/contracts";
import { apiEndpoints } from "@/api/endpoints";
import { categoryFixtures } from "../fixtures/categories";
import { applyMockState, mockEndpoint, requireAuthorization } from "./common";

export const categoryHandlers = [
  http.get(mockEndpoint(apiEndpoints.categories.list), async ({ request }) => {
    const mockResponse = await applyMockState(request);
    if (mockResponse) return mockResponse;

    const unauthorizedResponse = requireAuthorization(request);
    if (unauthorizedResponse) return unauthorizedResponse;

    const response: CategoriesResponse = { data: categoryFixtures };
    return HttpResponse.json(response);
  }),
  http.get(mockEndpoint(apiEndpoints.categories.suggestion), async ({ request }) => {
    const mockResponse = await applyMockState(request);
    if (mockResponse) return mockResponse;

    const unauthorizedResponse = requireAuthorization(request);
    if (unauthorizedResponse) return unauthorizedResponse;

    const requestUrl = new URL(request.url);
    const description = requestUrl.searchParams.get("description")?.toLocaleLowerCase("pt-BR") ?? "";
    const type = requestUrl.searchParams.get("type");
    const categoryId = suggestCategoryId(description, type);
    const category = categoryFixtures.find((item) => item.id === categoryId) ?? categoryFixtures[categoryFixtures.length - 1];
    return HttpResponse.json({ data: category });
  }),
];

function suggestCategoryId(description: string, type: string | null): string {
  if (includesKeyword(description, ["salário", "salario", "salary", "bonus", "bônus"])) return "salary";
  if (includesKeyword(description, ["freelance", "cliente", "client", "invoice"])) return "freelance";
  if (includesKeyword(description, ["mercado", "grocery", "restaurante", "restaurant"])) return "food";
  if (includesKeyword(description, ["aluguel", "rent", "moradia"])) return "housing";
  if (includesKeyword(description, ["uber", "transporte", "transport"])) return "transport";
  if (includesKeyword(description, ["netflix", "cinema", "entretenimento"])) return "entertainment";
  if (includesKeyword(description, ["energia", "electric", "internet", "água", "agua"])) return "utilities";
  if (includesKeyword(description, ["seguro", "insurance"])) return "insurance";
  if (includesKeyword(description, ["saúde", "saude", "academia", "gym", "health"])) return "health";
  if (includesKeyword(description, ["amazon", "compra", "shopping"])) return "shopping";
  if (includesKeyword(description, ["invest", "dividend", "juros", "interest"])) return "investment";
  if (includesKeyword(description, ["transfer"])) return "transfer";
  if (includesKeyword(description, ["pagamento", "payment", "boleto"])) return "payment";
  if (includesKeyword(description, ["saque", "withdrawal"])) return "withdrawal";
  if (includesKeyword(description, ["depósito", "deposito", "deposit"])) return "deposit";
  return type === "income" ? "deposit" : "other";
}

function includesKeyword(description: string, keywords: string[]): boolean {
  return keywords.some((keyword) => description.includes(keyword));
}
