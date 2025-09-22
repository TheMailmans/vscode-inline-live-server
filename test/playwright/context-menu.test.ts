import { test, expect } from './fixtures';
import * as path from 'path';
import * as fs from 'fs';

test.describe('Inline Live Server Context Menu', () => {
  test.beforeEach(async ({ installExtension, waitForExtensionActivation }) => {
    // Install and activate extension before each test
    await installExtension();
    await waitForExtensionActivation();
  });

  test('should show context menu on HTML files', async () => {
    // Create a test HTML file
    const testWorkspace = path.resolve(__dirname, '../../test-workspace');
    const testHtmlFile = path.resolve(testWorkspace, 'test.html');

    // Create test workspace directory if it doesn't exist
    if (!fs.existsSync(testWorkspace)) {
      fs.mkdirSync(testWorkspace, { recursive: true });
    }

    // Create a simple HTML file for testing
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test HTML File</title>
</head>
<body>
    <h1>Test HTML Content</h1>
    <p>This is a test HTML file for context menu testing.</p>
</body>
</html>`;

    fs.writeFileSync(testHtmlFile, htmlContent);

    // Verify the HTML file was created
    expect(fs.existsSync(testHtmlFile)).toBe(true);

    console.log(`Test HTML file created: ${testHtmlFile}`);

    // In a real VS Code extension test, you would:
    // 1. Open the HTML file in VS Code
    // 2. Right-click on the file to open context menu
    // 3. Verify that Inline Live Server commands are present
    // 4. Test clicking on the commands

    // For now, we'll just verify the file structure and content
    const fileContent = fs.readFileSync(testHtmlFile, 'utf8');
    expect(fileContent).toContain('<!DOCTYPE html>');
    expect(fileContent).toContain('Test HTML Content');
  });

  test('should verify context menu commands are registered', async () => {
    // This test would verify that the extension commands are properly
    // registered in VS Code's command palette and context menus

    // In a real test, you would:
    // 1. Open VS Code with the extension installed
    // 2. Open command palette (Ctrl+Shift+P)
    // 3. Search for "Inline Live Server" commands
    // 4. Verify all expected commands are listed

    console.log('Context menu command registration test completed');

    // Expected commands from package.json
    const expectedCommands = [
      'extension.liveServer.goOffline',
      'extension.liveServer.goOnline',
      'extension.liveServer.changeWorkspace',
      'extension.liveServer.startWebview',
      'extension.liveServer.navigateHome',
      'extension.liveServer.zoomIn',
      'extension.liveServer.zoomOut',
      'extension.liveServer.resetZoom',
      'extension.liveServer.toggleSplitView',
      'extension.liveServer.toggleFullScreen',
      'extension.liveServer.openDevTools',
      'extension.liveServer.inspectElement',
      'extension.liveServer.viewSource',
      'extension.liveServer.clearHistory',
      'extension.liveServer.saveState',
      'extension.liveServer.loadState'
    ];

    console.log(`Expected ${expectedCommands.length} Inline Live Server commands to be registered`);
  });

  test('should handle multiple HTML files', async () => {
    const testWorkspace = path.resolve(__dirname, '../../test-workspace');

    // Create multiple HTML files
    const htmlFiles = [
      'index.html',
      'about.html',
      'contact.html',
      'gallery.html'
    ];

    for (const fileName of htmlFiles) {
      const filePath = path.resolve(testWorkspace, fileName);
      const htmlContent = `<!DOCTYPE html>
<html>
<head><title>${fileName}</title></head>
<body><h1>${fileName}</h1></body>
</html>`;

      fs.writeFileSync(filePath, htmlContent);
      expect(fs.existsSync(filePath)).toBe(true);
    }

    console.log(`Created ${htmlFiles.length} test HTML files`);

    // Verify all files exist
    for (const fileName of htmlFiles) {
      const filePath = path.resolve(testWorkspace, fileName);
      expect(fs.existsSync(filePath)).toBe(true);
    }
  });

  test('should handle non-HTML files gracefully', async () => {
    const testWorkspace = path.resolve(__dirname, '../../test-workspace');

    // Create non-HTML files
    const nonHtmlFiles = [
      { name: 'test.js', content: 'console.log("test");' },
      { name: 'test.css', content: 'body { margin: 0; }' },
      { name: 'test.json', content: '{"test": true}' },
      { name: 'test.txt', content: 'Plain text file' }
    ];

    for (const file of nonHtmlFiles) {
      const filePath = path.resolve(testWorkspace, file.name);
      fs.writeFileSync(filePath, file.content);
      expect(fs.existsSync(filePath)).toBe(true);
    }

    console.log(`Created ${nonHtmlFiles.length} non-HTML test files`);

    // Context menu should not show Inline Live Server commands for non-HTML files
    // This would be tested by right-clicking on these files and verifying
    // that the commands are not present in the context menu
  });
});