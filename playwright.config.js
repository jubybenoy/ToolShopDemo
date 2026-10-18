// playwright.config.js
require('dotenv').config();
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: process.env.BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  testDir: './tests',             // usually 'tests', not 'test'
  retries: 0,
  fullyParallel: true,
  workers: 3,
  fullyParallel: true,
  timeout: 150 * 1000,

  expect: {
    timeout: 7000,
  },

  reporter: [
    ['html'],
    ['line'],
    ['line'],
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
        browserName: 'chromium',  // correct property name
        headless: false,
        ignoreHTTPSErrors: true,  // correct casing
        permissions: ['geolocation'],
        screenshot: 'retain-on-failure',
        trace: 'on',
        //trace:'retain-on-failure',
        video: 'retain-on-failure',
        launchOptions: {
          slowMo: 1000,
        },
      },
    },
  ],
});