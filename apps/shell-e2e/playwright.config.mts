import { workspaceRoot } from "@nx/devkit";
import { nxE2EPreset } from "@nx/playwright/preset";
import { defineConfig, devices } from "@playwright/test";

const baseURL =
  process.env.BASE_URL ?? "http://127.0.0.1:4200";
const reuseExistingServer = !process.env.CI;

export default defineConfig({
  ...nxE2EPreset(import.meta.dirname, {
    testDir: "./src",
    openHtmlReport: "never",
  }),
  fullyParallel: false,
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  webServer: [
    {
      command: "npm run dev:institutional",
      url: "http://127.0.0.1:8101/remoteEntry.js",
      reuseExistingServer,
      cwd: workspaceRoot,
    },
    {
      command: "npm run dev:dashboard",
      url: "http://127.0.0.1:8102/remoteEntry.js",
      reuseExistingServer,
      cwd: workspaceRoot,
    },
    {
      command: "npm run dev:shell",
      url: baseURL,
      reuseExistingServer,
      cwd: workspaceRoot,
    },
  ],
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
