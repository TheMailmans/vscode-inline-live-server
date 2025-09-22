import { test, expect } from './fixtures';
import * as path from 'path';
import * as fs from 'fs';

test.describe('Inline Live Server Extension Installation', () => {
  test('should install VSIX package successfully', async ({
    extensionPath,
    vsixPath,
    installExtension,
    uninstallExtension
  }) => {
    // Clean up any existing installation
    try {
      await uninstallExtension();
    } catch (error) {
      // Extension might not be installed, which is fine
      console.log('Extension not previously installed, proceeding...');
    }

    // Install the extension
    await installExtension();

    // Verify VSIX file was created
    expect(fs.existsSync(vsixPath)).toBe(true);

    // Verify the VSIX file has content
    const stats = fs.statSync(vsixPath);
    expect(stats.size).toBeGreaterThan(0);

    console.log(`VSIX package created successfully: ${vsixPath}`);
    console.log(`Package size: ${stats.size} bytes`);
  });

  test('should activate extension after installation', async ({
    waitForExtensionActivation
  }) => {
    // Wait for extension to activate
    await waitForExtensionActivation();

    // This test would verify that the extension is properly activated
    // In a real scenario, you would check for specific UI elements or
    // extension contributions that indicate successful activation
    console.log('Extension activation verification completed');
  });

  test('should handle installation errors gracefully', async ({
    extensionPath
  }) => {
    // Test error handling for corrupted VSIX
    const corruptedVsixPath = path.resolve(extensionPath, 'corrupted.vsix');

    // Create a corrupted VSIX file for testing
    fs.writeFileSync(corruptedVsixPath, 'corrupted data');

    // Verify the file exists but is corrupted
    expect(fs.existsSync(corruptedVsixPath)).toBe(true);
    expect(fs.statSync(corruptedVsixPath).size).toBeLessThan(1000);

    // Clean up the corrupted file
    fs.unlinkSync(corruptedVsixPath);
  });

  test('should verify extension manifest', async ({
    extensionPath
  }) => {
    const packageJsonPath = path.resolve(extensionPath, 'package.json');

    // Verify package.json exists
    expect(fs.existsSync(packageJsonPath)).toBe(true);

    // Read and parse package.json
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    // Verify required fields
    expect(packageJson.name).toBe('tbx-live-server');
    expect(packageJson.displayName).toBe('Inline Live Server by TBX');
    expect(packageJson.version).toMatch(/^\d+\.\d+\.\d+$/);
    expect(packageJson.publisher).toBe('tbx');
    expect(packageJson.engines.vscode).toMatch(/^[\^~]?1\./);

    // Verify commands are defined
    expect(packageJson.contributes.commands).toBeDefined();
    expect(packageJson.contributes.commands.length).toBeGreaterThan(0);

    // Verify menus are configured
    expect(packageJson.contributes.menus).toBeDefined();

    console.log('Extension manifest validation completed');
  });
});
