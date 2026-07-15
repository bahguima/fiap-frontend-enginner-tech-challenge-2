import "@testing-library/jest-dom";
import { areTestMocksEnabled } from "@/mocks/config";
import { resetMockDatabase } from "@/mocks/database";
import { server } from "@/mocks/server";

const testMocksEnabled = areTestMocksEnabled();

beforeAll(() => {
  if (testMocksEnabled) server.listen({ onUnhandledRequest: "error" });
});

afterEach(() => {
  if (testMocksEnabled) server.resetHandlers();
  resetMockDatabase();
});

afterAll(() => {
  if (testMocksEnabled) server.close();
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});
