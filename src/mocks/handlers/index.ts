import { attachmentHandlers } from "./attachments";
import { authHandlers } from "./auth";
import { categoryHandlers } from "./categories";
import { dashboardHandlers } from "./dashboard";
import { transactionHandlers } from "./transactions";

export const handlers = [
  ...authHandlers,
  ...dashboardHandlers,
  ...transactionHandlers,
  ...categoryHandlers,
  ...attachmentHandlers,
];
