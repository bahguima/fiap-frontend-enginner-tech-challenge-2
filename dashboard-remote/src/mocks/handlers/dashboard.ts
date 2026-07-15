import { delay, http, HttpResponse } from "msw";
import { dashboardOverviewFixture } from "../fixtures/dashboard";

export const dashboardHandlers = [
  http.get("*/api/dashboard/overview", async () => {
    await delay(200);
    return HttpResponse.json(dashboardOverviewFixture);
  }),
];
