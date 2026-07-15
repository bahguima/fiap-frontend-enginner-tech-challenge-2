import { areBrowserMocksEnabled } from "./config";

let startPromise: Promise<void> | null = null;

export const enableBrowserMocks = (): Promise<void> => {
  if (!areBrowserMocksEnabled()) return Promise.resolve();
  if (startPromise) return startPromise;

  startPromise = startBrowserMocks();
  return startPromise;
};

const startBrowserMocks = async (): Promise<void> => {
  const { worker } = await import("./browser");
  await worker.start({ onUnhandledRequest: "bypass" });
};
