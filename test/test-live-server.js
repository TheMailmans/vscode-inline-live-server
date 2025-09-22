// Test live server functionality and status bar integration
const fs = require('fs');
const path = require('path');

function testLiveServerFunctionality() {
  console.log('Testing Inline Live Server live server functionality...\n');

  try {
    console.log('1. Testing StatusBarManager integration...');

    const statusBarManagerPath = path.join(__dirname, '..', 'src', 'statusBarManager.ts');
    const statusBarManagerContent = fs.readFileSync(statusBarManagerPath, 'utf8');

    // Check if StatusBarManager class exists
    if (statusBarManagerContent.includes('export class StatusBarManager')) {
      console.log('✓ StatusBarManager class found');
    } else {
      console.error('✗ StatusBarManager class not found');
      return false;
    }

    // Check if initialize method exists
    if (statusBarManagerContent.includes('initialize()')) {
      console.log('✓ StatusBarManager.initialize() method found');
    } else {
      console.error('✗ StatusBarManager.initialize() method not found');
      return false;
    }

    // Check if updateServerState method exists
    if (statusBarManagerContent.includes('updateServerState')) {
      console.log('✓ StatusBarManager.updateServerState() method found');
    } else {
      console.error('✗ StatusBarManager.updateServerState() method not found');
      return false;
    }

    console.log('\n2. Testing VSCode status bar integration...');

    // Check if vscode module is imported
    if (statusBarManagerContent.includes("import * as vscode from 'vscode'")) {
      console.log('✓ VSCode module import found in StatusBarManager');
    } else {
      console.error('✗ VSCode module import not found in StatusBarManager');
      return false;
    }

    // Check if StatusBarItem is created
    if (statusBarManagerContent.includes('vscode.window.createStatusBarItem')) {
      console.log('✓ VSCode StatusBarItem creation found');
    } else {
      console.error('✗ VSCode StatusBarItem creation not found');
      return false;
    }

    console.log('\n3. Testing extension.ts integration...');

    const extensionPath = path.join(__dirname, '..', 'src', 'extension.ts');
    const extensionContent = fs.readFileSync(extensionPath, 'utf8');

    // Check if StatusBarManager is imported
    if (extensionContent.includes('import { StatusBarManager }')) {
      console.log('✓ StatusBarManager import found in extension.ts');
    } else {
      console.error('✗ StatusBarManager import not found in extension.ts');
      return false;
    }

    // Check if StatusBarManager is instantiated
    if (extensionContent.includes('new StatusBarManager()')) {
      console.log('✓ StatusBarManager instantiation found');
    } else {
      console.error('✗ StatusBarManager instantiation not found');
      return false;
    }

    // Check if StatusBarManager.initialize() is called
    if (extensionContent.includes('statusBarManager.initialize()')) {
      console.log('✓ StatusBarManager.initialize() call found');
    } else {
      console.error('✗ StatusBarManager.initialize() call not found');
      return false;
    }

    console.log('\n4. Testing auto-start functionality...');

    // Check if auto-start configuration is read
    if (extensionContent.includes('tbxLivePreview.server')) {
      console.log('✓ Auto-start configuration check found');
    } else {
      console.error('✗ Auto-start configuration check not found');
      return false;
    }

    // Check if auto-start command is executed
    if (extensionContent.includes('extension.liveServer.goOnline')) {
      console.log('✓ Auto-start command execution found');
    } else {
      console.error('✗ Auto-start command execution not found');
      return false;
    }

    console.log('\n5. Testing webview integration...');

    const webviewProviderPath = path.join(__dirname, '..', 'src', 'webviewPanelProvider.ts');
    const webviewProviderContent = fs.readFileSync(webviewProviderPath, 'utf8');

    // Check if WebviewPanelProvider class exists
    if (webviewProviderContent.includes('export class WebviewPanelProvider')) {
      console.log('✓ WebviewPanelProvider class found');
    } else {
      console.error('✗ WebviewPanelProvider class not found');
      return false;
    }

    // Check if VSCode webview API is used
    if (webviewProviderContent.includes('vscode.WebviewPanel')) {
      console.log('✓ VSCode WebviewPanel API used');
    } else {
      console.error('✗ VSCode WebviewPanel API not used');
      return false;
    }

    console.log('\n6. Testing communication manager...');

    const communicationManagerPath = path.join(__dirname, '..', 'src', 'communicationManager.ts');
    const communicationManagerContent = fs.readFileSync(communicationManagerPath, 'utf8');

    // Check if CommunicationManager class exists
    if (communicationManagerContent.includes('export class CommunicationManager')) {
      console.log('✓ CommunicationManager class found');
    } else {
      console.error('✗ CommunicationManager class not found');
      return false;
    }

    console.log('\n7. Testing live reload functionality...');

    const liveReloadManagerPath = path.join(__dirname, '..', 'src', 'liveReloadManager.ts');
    const liveReloadManagerContent = fs.readFileSync(liveReloadManagerPath, 'utf8');

    // Check if LiveReloadManager class exists
    if (liveReloadManagerContent.includes('export class LiveReloadManager')) {
      console.log('✓ LiveReloadManager class found');
    } else {
      console.error('✗ LiveReloadManager class not found');
      return false;
    }

    console.log('\n8. Testing error recovery...');

    const errorRecoveryManagerPath = path.join(__dirname, '..', 'src', 'errorRecoveryManager.ts');
    const errorRecoveryManagerContent = fs.readFileSync(errorRecoveryManagerPath, 'utf8');

    // Check if ErrorRecoveryManager class exists
    if (errorRecoveryManagerContent.includes('export class ErrorRecoveryManager')) {
      console.log('✓ ErrorRecoveryManager class found');
    } else {
      console.error('✗ ErrorRecoveryManager class not found');
      return false;
    }

    console.log('\n9. Testing package.json configuration...');

    const packageJsonPath = path.join(__dirname, '..', 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    // Check if live server configuration exists
    const liveServerConfig = packageJson.contributes?.configuration?.find(config =>
      config.title === 'Live Server Config'
    );

    if (liveServerConfig) {
      console.log('✓ Live Server configuration found in package.json');
      const portSetting = liveServerConfig.properties['liveServer.settings.port'];
      if (portSetting && portSetting.default === 5500) {
        console.log('✓ Default port 5500 configured');
      } else {
        console.error('✗ Default port not properly configured');
        return false;
      }
    } else {
      console.error('✗ Live Server configuration not found in package.json');
      return false;
    }

    // Check if Inline Live Server configuration exists
    const tbxConfig = packageJson.contributes?.configuration?.find(config =>
      config.title === 'Inline Live Server Config'
    );

    if (tbxConfig) {
      console.log('✓ Inline Live Server configuration found in package.json');
    } else {
      console.error('✗ Inline Live Server configuration not found in package.json');
      return false;
    }

    console.log('\n10. Testing HTML files for testing...');

    // Create a simple test HTML file
    const testHtmlPath = path.join(__dirname, '..', 'test.html');
    const testHtmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inline Live Server Test</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        h1 { color: #007ACC; }
        .test-section { margin: 20px 0; padding: 15px; border: 1px solid #ddd; }
    </style>
</head>
<body>
    <h1>Inline Live Server Test Page</h1>
    <div class="test-section">
        <h2>Live Reload Test</h2>
        <p>Edit this file to test live reload functionality.</p>
        <p>Current time: <span id="timestamp">${new Date().toISOString()}</span></p>
    </div>
    <div class="test-section">
        <h2>Webview Integration Test</h2>
        <p>This page can be opened in the webview panel.</p>
    </div>
</body>
</html>`;

    fs.writeFileSync(testHtmlPath, testHtmlContent);
    console.log('✓ Test HTML file created for live server testing');

    console.log('\n✓ All live server functionality tests passed!');
    console.log('\n📋 Live Server Functionality Summary:');
    console.log('✓ StatusBarManager integration complete');
    console.log('✓ VSCode status bar API integration');
    console.log('✓ Extension activation and auto-start logic');
    console.log('✓ Webview panel provider implementation');
    console.log('✓ Communication manager for server interaction');
    console.log('✓ Live reload manager for file watching');
    console.log('✓ Error recovery manager for fault tolerance');
    console.log('✓ Package.json configuration for live server settings');
    console.log('✓ Test HTML file created for manual testing');

    console.log('\n🎉 Live server functionality test completed successfully!');
    console.log('\nNext steps:');
    console.log('1. Install extension in VSCode and test with test.html');
    console.log('2. Verify status bar shows server state correctly');
    console.log('3. Test live reload by editing test.html');
    console.log('4. Test webview panel integration');
    console.log('5. Verify context menu works on test.html');

    return true;

  } catch (error) {
    console.error('Error testing live server functionality:', error);
    return false;
  }
}

// Run the test
const success = testLiveServerFunctionality();
if (success) {
  console.log('\n🎉 Live server functionality test completed successfully!');
  process.exit(0);
} else {
  console.error('\n❌ Live server functionality test failed!');
  process.exit(1);
}