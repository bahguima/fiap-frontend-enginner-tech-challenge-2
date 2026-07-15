export const areBrowserMocksEnabled = () =>
  shouldEnableBrowserMocks(process.env.NEXT_PUBLIC_API_MOCKING);

export const shouldEnableBrowserMocks = (
  browserMocking: string | undefined,
) => browserMocking !== "disabled";
