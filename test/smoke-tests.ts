import * as vscode from 'vscode';
import * as assert from 'assert';

export async function runSmokeTests() {
  console.log('Running smoke tests for Inline Live Server extension...');

  // Test 1: Verify all commands are registered
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

  console.log('Test 1: Verifying command registration...');
  const registeredCommands = await vscode.commands.getCommands(true);

  for (const command of expectedCommands) {
    if (registeredCommands.includes(command)) {
      console.log(`✓ Command registered: ${command}`);
    } else {
      console.error(`✗ Command NOT registered: ${command}`);
      throw new Error(`Command not registered: ${command}`);
    }
  }

  console.log(`✓ All ${expectedCommands.length} commands are properly registered`);

  // Test 2: Test command execution
  console.log('Test 2: Testing command execution...');

  try {
    // Test goOnline command
    await vscode.commands.executeCommand('extension.liveServer.goOnline');
    console.log('✓ goOnline command executed successfully');

    // Test goOffline command
    await vscode.commands.executeCommand('extension.liveServer.goOffline');
    console.log('✓ goOffline command executed successfully');

    // Test startWebview command
    await vscode.commands.executeCommand('extension.liveServer.startWebview');
    console.log('✓ startWebview command executed successfully');

  } catch (error) {
    console.error('✗ Command execution failed:', error);
    throw error;
  }

  console.log('✓ All smoke tests passed!');
}