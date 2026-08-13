export async function enableBrowserMocks() {
  if (
    process.env.NODE_ENV !== "development" ||
    process.env.NEXT_PUBLIC_API_MOCKING !== "enabled"
  ) {
    return;
  }

  const { worker } = await import("./browser");

  await worker.start({
    onUnhandledRequest: "bypass",
    serviceWorker: {
      url: "/mockServiceWorker.js",
    },
  });
}
