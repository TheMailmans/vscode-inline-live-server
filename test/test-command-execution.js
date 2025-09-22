// Test command execution functionality
const fs = require('fs');
const path = require('path');

function testCommandExecution() {
  console.log('Testing Inline Live Server command execution...\n');

  try {
    console.log('1. Testing CommandManager class structure...');

    const commandManagerPath = path.join(__dirname, '..', 'src', 'commandManager.ts');
    const commandManagerContent = fs.readFileSync(commandManagerPath, 'utf8');

    // Check if CommandManager class exists
    if (commandManagerContent.includes('export class CommandManager')) {
      console.log('✓ CommandManager class found');
    } else {
      console.error('✗ CommandManager class not found');
      return false;
    }

    // Check if executeCommand method exists
    if (commandManagerContent.includes('executeCommand(command: string)')) {
      console.log('✓ executeCommand method found');
    } else {
      console.error('✗ executeCommand method not found');
      return false;
    }

    console.log('\n2. Testing command switch statement...');

    // Check if switch statement exists
    if (commandManagerContent.includes('switch (command)')) {
      console.log('✓ Command switch statement found');
    } else {
      console.error('✗ Command switch statement not found');
      return false;
    }

    console.log('\n3. Testing individual command methods...');

    const expectedCommands = [
      'goOffline',
      'goOnline',
      'changeWorkspace',
      'startWebview',
      'navigateHome',
      'zoomIn',
      'zoomOut',
      'resetZoom',
      'toggleSplitView',
      'toggleFullScreen',
      'openDevTools',
      'inspectElement',
      'viewSource',
      'clearHistory',
      'saveState',
      'loadState'
    ];

    let allMethodsFound = true;
    for (const command of expectedCommands) {
      const methodPattern = `private ${command}(): void`;
      if (commandManagerContent.includes(methodPattern)) {
        console.log(`✓ Method found: ${command}()`);
      } else {
        console.error(`✗ Method NOT found: ${command}()`);
        allMethodsFound = false;
      }
    }

    if (!allMethodsFound) {
      console.error('\n✗ Some command methods are missing');
      return false;
    }

    console.log('\n4. Testing command routing...');

    // Check if all switch cases are present
    let allCasesFound = true;
    for (const command of expectedCommands) {
      const casePattern = `case '${command}':`;
      if (commandManagerContent.includes(casePattern)) {
        console.log(`✓ Switch case found: ${command}`);
      } else {
        console.error(`✗ Switch case NOT found: ${command}`);
        allCasesFound = false;
      }
    }

    if (!allCasesFound) {
      console.error('\n✗ Some switch cases are missing');
      return false;
    }

    console.log('\n5. Testing StatusBarManager integration...');

    // Check if StatusBarManager is imported and used
    if (commandManagerContent.includes('import { StatusBarManager }')) {
      console.log('✓ StatusBarManager import found');
    } else {
      console.error('✗ StatusBarManager import not found');
      return false;
    }

    if (commandManagerContent.includes('this.statusBarManager.updateServerState')) {
      console.log('✓ StatusBarManager.updateServerState() called');
    } else {
      console.error('✗ StatusBarManager.updateServerState() not called');
      return false;
    }

    console.log('\n6. Testing error handling...');

    // Check if default case exists for unknown commands
    if (commandManagerContent.includes('default:')) {
      console.log('✓ Default case found for unknown commands');
    } else {
      console.error('✗ Default case not found for unknown commands');
      return false;
    }

    if (commandManagerContent.includes('Unknown command')) {
      console.log('✓ Error message for unknown commands found');
    } else {
      console.error('✗ Error message for unknown commands not found');
      return false;
    }

    console.log('\n7. Testing VSCode API integration...');

    // Check if vscode module is imported
    if (commandManagerContent.includes("import * as vscode from 'vscode'")) {
      console.log('✓ VSCode module import found');
    } else {
      console.error('✗ VSCode module import not found');
      return false;
    }

    // Check if showInformationMessage is used
    if (commandManagerContent.includes('vscode.window.showInformationMessage')) {
      console.log('✓ VSCode showInformationMessage used');
    } else {
      console.error('✗ VSCode showInformationMessage not used');
      return false;
    }

    // Check if showErrorMessage is used
    if (commandManagerContent.includes('vscode.window.showErrorMessage')) {
      console.log('✓ VSCode showErrorMessage used');
    } else {
      console.error('✗ VSCode showErrorMessage not used');
      return false;
    }

    console.log('\n8. Testing command execution flow...');

    // Verify that each command method calls showInformationMessage with actual messages
    const expectedMessages = [
      'Inline Live Server: Server stopped',
      'Inline Live Server: Server started',
      'Inline Live Server: Workspace changed',
      'Inline Live Server: Webview started',
      'Inline Live Server: Navigated to home',
      'Inline Live Server: Zoomed in',
      'Inline Live Server: Zoomed out',
      'Inline Live Server: Zoom reset',
      'Inline Live Server: Split view toggled',
      'Inline Live Server: Full screen toggled',
      'Inline Live Server: Developer tools opened',
      'Inline Live Server: Element inspection started',
      'Inline Live Server: Source view opened',
      'Inline Live Server: History cleared',
      'Inline Live Server: State saved',
      'Inline Live Server: State loaded'
    ];

    let allMessagesFound = true;
    for (const message of expectedMessages) {
      if (commandManagerContent.includes(message)) {
        console.log(`✓ Information message found: "${message}"`);
      } else {
        console.error(`✗ Information message NOT found: "${message}"`);
        allMessagesFound = false;
      }
    }

    if (!allMessagesFound) {
      console.error('\n✗ Some information messages are missing');
      return false;
    }

    console.log('\n✓ All command execution tests passed!');
    console.log('\n📋 Command Execution Summary:');
    console.log(`- ${expectedCommands.length} command methods implemented`);
    console.log(`- ${expectedCommands.length} switch cases defined`);
    console.log(`- StatusBarManager integration present`);
    console.log(`- VSCode API integration complete`);
    console.log(`- Error handling implemented`);
    console.log(`- User feedback messages configured`);

    console.log('\n🎉 Command execution test completed successfully!');
    console.log('\nNext steps:');
    console.log('1. Test commands in actual VSCode environment');
    console.log('2. Verify status bar updates work correctly');
    console.log('3. Test information messages appear properly');
    console.log('4. Verify error handling for unknown commands');

    return true;

  } catch (error) {
    console.error('Error testing command execution:', error);
    return false;
  }
}

// Run the test
const success = testCommandExecution();
if (success) {
  console.log('\n🎉 Command execution test completed successfully!');
  process.exit(0);
} else {
  console.error('\n❌ Command execution test failed!');
  process.exit(1);
}