import { defineConfig, devices } from '@playwright/test';
// const BASE_URL = process.env.E2E_BASE_URL || 'http://localhost:4173';
const BASE_URL = 'http://localhost:4173';

export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  retries: process.env.CI ? 2 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: BASE_URL,            // ✅ BaseURL
    trace: 'retain-on-failure',   // ✅ Traces on failure
    screenshot: 'only-on-failure',// ✅ Screenshots on failure
    video: 'retain-on-failure',
    viewport: { width: 1280, height: 800 },
    serviceWorkers: 'block',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
