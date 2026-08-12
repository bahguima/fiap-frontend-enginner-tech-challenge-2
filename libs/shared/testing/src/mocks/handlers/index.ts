import { attachmentHandlers } from "./attachments";
import { authHandlers } from "./auth";
import { categoriesHandlers } from "./categories";
import { dashboardHandlers } from "./dashboard";
import { profileHandlers } from "./profile";
import { transactionHandlers } from "./transactions";

export const handlers = [
  ...authHandlers,
  ...dashboardHandlers,
  ...profileHandlers,
  ...transactionHandlers,
  ...categoriesHandlers,
  ...attachmentHandlers,
];
