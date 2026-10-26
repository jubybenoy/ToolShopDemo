// playwright.config.js
require('dotenv').config();
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',            
  retries: 0,
  fullyParallel: true,
  workers: 1,
  timeout: 150 * 1000,

  expect: {
    timeout: 7000,
  },

  reporter: [
    ['html'],
    ['line'], // <--- Keep only ONE line reporter
    ['allure-playwright', { outputFolder: 'allure-results' }]
  ],

  use: {
    baseURL: process.env.BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',  
        headless: false,
        ignoreHTTPSErrors: true,  
        permissions: ['geolocation'],
        screenshot: 'retain-on-failure',
        trace: 'on',
        video: 'on',
        launchOptions: {
          slowMo: 1000,
        },
      },
    },
  ],
});