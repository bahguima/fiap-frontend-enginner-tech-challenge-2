import nextJest from "next/jest.js";
import { fileURLToPath } from "node:url";

const remoteDir = fileURLToPath(new URL(".", import.meta.url));
const createJestConfig = nextJest({ dir: remoteDir });

const customJestConfig = {
  rootDir: remoteDir,
  moduleNameMapper: { "^@/(.*)$": "<rootDir>/src/$1" },
  setupFiles: ["<rootDir>/src/test/polyfills.cjs"],
  setupFilesAfterEnv: ["<rootDir>/src/test/setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  testMatch: ["<rootDir>/src/**/*.{test,spec}.{ts,tsx}"],
};

export default createJestConfig(customJestConfig);
