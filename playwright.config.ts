import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './test/playwright',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/junit.xml' }]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    /* Take screenshot only when test fails */
    screenshot: 'only-on-failure',

    /* Record video only when retrying */
    video: 'retain-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'vscode-extension',
      testDir: './test/playwright',
      testMatch: '**/*.test.ts',
      testIgnore: '**/screenshot-generation.test.ts',
      use: {
        ...devices['Desktop Chrome'],
        // VS Code specific configuration
        launchOptions: {
          args: [
            '--disable-web-security',
            '--disable-features=VizDisplayCompositor'
          ]
        }
      },
      metadata: {
        platform: 'vscode',
        description: 'VS Code Extension Tests'
      }
    },
    {
      name: 'screenshot-generation',
      testDir: './test/playwright',
      testMatch: '**/screenshot-generation.test.ts',
      fullyParallel: false,
      workers: 1,
      use: {
        ...devices['Desktop Chrome'],
        headless: false,
        viewport: { width: 1920, height: 1080 },
        screenshot: 'only-on-failure',
      },
      metadata: {
        platform: 'screenshot',
        description: 'Screenshot Generation for VS Code Extension'
      }
    }
  ],

  /* VS Code extension tests don't need a web server */
  // webServer configuration removed for VS Code extension testing
});