import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  setupFiles: ["<rootDir>/src/test/polyfills.cjs"],
  setupFilesAfterEnv: ["<rootDir>/src/test/setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  testEnvironmentOptions: {
    customExportConditions: [""],
  },
  testMatch: ["<rootDir>/src/**/*.{test,spec}.{ts,tsx}"],
  transformIgnorePatterns: [
    "node_modules/(?!(msw|@mswjs/interceptors|@open-draft/deferred-promise|rettime|until-async)/)",
  ],
  testPathIgnorePatterns: [
    "<rootDir>/.next/",
    "<rootDir>/node_modules/",
  ],
};

export default createJestConfig(customJestConfig);
