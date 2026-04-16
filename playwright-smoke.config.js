import { defineConfig, devices } from '@playwright/test';

const PORT = 8765;
const PROJECT_ROOT = 'c:/Users/ojuli/MELHORES CURSOS';

export default defineConfig({
  testDir: './',
  testMatch: '**/smoke-test.spec.js',
  fullyParallel: false,
  forbidOnly: false,
  retries: 0,
  workers: 1,
  reporter: 'list',
  use: {
    baseURL: `http://localhost:${PORT}`,
    headless: true,
    trace: 'off',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: `npx http-server "${PROJECT_ROOT}" -p ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: false,
  },
});
