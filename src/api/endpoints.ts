const configuredApiUrl = process.env.NEXT_PUBLIC_API_URL ?? "/api";

export const apiBaseUrl = configuredApiUrl.endsWith("/")
  ? configuredApiUrl.slice(0, -1)
  : configuredApiUrl;

export const apiEndpoints = {
  auth: {
    login: `${apiBaseUrl}/auth/login`,
    logout: `${apiBaseUrl}/auth/logout`,
    session: `${apiBaseUrl}/auth/session`,
  },
  dashboard: `${apiBaseUrl}/dashboard`,
  transactions: {
    list: `${apiBaseUrl}/transactions`,
    detail: (transactionId: string) =>
      `${apiBaseUrl}/transactions/${encodeURIComponent(transactionId)}`,
    attachments: (transactionId: string) =>
      `${apiBaseUrl}/transactions/${encodeURIComponent(transactionId)}/attachments`,
  },
  categories: {
    list: `${apiBaseUrl}/categories`,
    suggestion: `${apiBaseUrl}/categories/suggestion`,
  },
  attachments: {
    detail: (attachmentId: string) =>
      `${apiBaseUrl}/attachments/${encodeURIComponent(attachmentId)}`,
    content: (attachmentId: string) =>
      `${apiBaseUrl}/attachments/${encodeURIComponent(attachmentId)}/content`,
  },
};
