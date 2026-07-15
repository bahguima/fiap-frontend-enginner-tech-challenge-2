export type MockScenario = "success" | "error";

const defaultDelayMs = process.env.NODE_ENV === "test" ? 0 : 300;

export function areBrowserMocksEnabled(): boolean {
  return shouldEnableBrowserMocks(process.env.NEXT_PUBLIC_API_MOCKING);
}

export function shouldEnableBrowserMocks(
  browserMocking: string | undefined,
): boolean {
  return browserMocking !== "disabled";
}

export function areTestMocksEnabled(): boolean {
  return process.env.MSW_ENABLED !== "false";
}

export function getMockScenario(request: Request): MockScenario {
  const scenario = request.headers.get("x-mock-scenario") ?? process.env.NEXT_PUBLIC_MSW_SCENARIO;
  return scenario === "error" ? "error" : "success";
}

export function getMockDelayMs(request: Request): number {
  const configuredDelay = request.headers.get("x-mock-delay") ?? process.env.NEXT_PUBLIC_MSW_DELAY_MS;
  if (!configuredDelay) return defaultDelayMs;

  const delayMs = parseInt(configuredDelay, 10);
  return Number.isNaN(delayMs) || delayMs < 0 ? defaultDelayMs : delayMs;
}
