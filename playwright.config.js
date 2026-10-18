// playwright.config.js
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',             // usually 'tests', not 'test'
  retries: 0,
  workers: 1,
  fullyParallel: true,
  timeout: 150 * 1000,

  expect: {
    timeout: 7000,
  },

  reporter: [
    ['html'],
    ['line'],
  
  ],

  projects: [
    
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',  // correct property name
        headless: false,
        ignoreHTTPSErrors: true,  // correct casing
        permissions: ['geolocation'],
        screenshot: 'on',
        trace: 'on',
        //trace:'retain-on-failure',
        video: 'on',
        launchOptions: {
          slowMo: 1000,
        },
      },
    },
  ],
});