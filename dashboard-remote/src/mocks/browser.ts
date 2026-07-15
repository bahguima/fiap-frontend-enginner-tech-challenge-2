import { setupWorker } from "msw/browser";
import { dashboardHandlers } from "./handlers/dashboard";

export const worker = setupWorker(...dashboardHandlers);
