import { defineConfig, devices } from '@playwright/test';
import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';
import path from 'path';

const PORT = 8765;
const PROJECT_ROOT = 'c:/Users/ojuli/MELHORES CURSOS';

async function waitForServer() {
  for (let i = 0; i < 30; i++) {
    try {
      await new Promise((resolve, reject) => {
        const req = http.get(`http://localhost:${PORT}/`, (res) => {
          if (res.statusCode === 200) resolve();
          else reject();
        });
        req.on('error', reject);
      });
      return;
    } catch {
      await new Promise(r => setTimeout(r, 100));
    }
  }
  throw new Error('Server failed to start');
}

export default defineConfig({
  testDir: './',
  testMatch: '**/test-logos.spec.js',
  fullyParallel: false,
  forbidOnly: false,
  retries: 0,
  workers: 1,
  reporter: 'list',
  use: {
    baseURL: `http://localhost:${PORT}`,
    headless: false,
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
