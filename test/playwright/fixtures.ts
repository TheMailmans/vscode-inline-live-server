import { test as base } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';
import { execSync } from 'child_process';

// Types for our test fixtures
type ExtensionTestFixtures = {
  extensionPath: string;
  vsixPath: string;
  installExtension: () => Promise<void>;
  uninstallExtension: () => Promise<void>;
  waitForExtensionActivation: () => Promise<void>;
};

// Extend the base test with our fixtures
export const test = base.extend<ExtensionTestFixtures>({
  // Path to the extension source code
  extensionPath: async ({}, use) => {
    const extensionPath = path.resolve(__dirname, '../../');
    await use(extensionPath);
  },

  // Path to the built VSIX package
  vsixPath: async ({}, use) => {
    const vsixPath = path.resolve(__dirname, '../../tbx-live-server.vsix');
    await use(vsixPath);
  },

  // Fixture to install the extension
  installExtension: async ({ extensionPath, vsixPath }, use) => {
    const installExtension = async () => {
      // Build the extension first
      console.log('Building extension...');
      execSync('npm run compile:prod', {
        cwd: extensionPath,
        stdio: 'inherit'
      });

      // Package the extension
      console.log('Packaging extension...');
      execSync('npx vsce package --no-dependencies', {
        cwd: extensionPath,
        stdio: 'inherit'
      });

      // Install the extension in VS Code
      console.log('Installing extension...');
      execSync(`code --install-extension ${vsixPath}`, {
        stdio: 'inherit'
      });
    };

    await use(installExtension);
  },

  // Fixture to uninstall the extension
  uninstallExtension: async ({ extensionPath }, use) => {
    const uninstallExtension = async () => {
      console.log('Uninstalling extension...');
      execSync('code --uninstall-extension tbx.live-server', {
        stdio: 'inherit'
      });
    };

    await use(uninstallExtension);
  },

  // Fixture to wait for extension activation
  waitForExtensionActivation: async ({}, use) => {
    const waitForExtensionActivation = async () => {
      // Wait for VS Code to be ready
      await new Promise(resolve => setTimeout(resolve, 5000));

      // Check if extension is activated by looking for specific UI elements
      // This would be implemented based on the extension's UI
      console.log('Waiting for extension activation...');
      await new Promise(resolve => setTimeout(resolve, 3000));
    };

    await use(waitForExtensionActivation);
  },
});

export { expect } from '@playwright/test';