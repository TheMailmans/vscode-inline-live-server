// Simple test to verify command registration without vscode module
const fs = require('fs');
const path = require('path');

function testCommandRegistration() {
  console.log('Testing Inline Live Server command registration...\n');

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

  console.log('1. Verifying package.json command definitions...');

  try {
    const packageJsonPath = path.join(__dirname, '..', 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    const definedCommands = packageJson.contributes?.commands?.map(cmd => cmd.command) || [];

    console.log(`Found ${definedCommands.length} commands in package.json`);

    let allCommandsDefined = true;
    for (const command of expectedCommands) {
      if (definedCommands.includes(command)) {
        console.log(`✓ Command defined: ${command}`);
      } else {
        console.error(`✗ Command NOT defined: ${command}`);
        allCommandsDefined = false;
      }
    }

    if (allCommandsDefined) {
      console.log(`\n✓ All ${expectedCommands.length} commands are defined in package.json`);
    } else {
      console.error(`\n✗ Some commands are missing from package.json`);
      return false;
    }

  } catch (error) {
    console.error('Error reading package.json:', error);
    return false;
  }

  console.log('\n2. Verifying extension.ts command registration...');

  try {
    const extensionPath = path.join(__dirname, '..', 'src', 'extension.ts');
    const extensionContent = fs.readFileSync(extensionPath, 'utf8');

    // Check if all expected commands are registered in extension.ts
    let allCommandsRegistered = true;
    for (const command of expectedCommands) {
      if (extensionContent.includes(command)) {
        console.log(`✓ Command registered: ${command}`);
      } else {
        console.error(`✗ Command NOT registered: ${command}`);
        allCommandsRegistered = false;
      }
    }

    if (allCommandsRegistered) {
      console.log(`\n✓ All ${expectedCommands.length} commands are registered in extension.ts`);
    } else {
      console.error(`\n✗ Some commands are missing from extension.ts`);
      return false;
    }

  } catch (error) {
    console.error('Error reading extension.ts:', error);
    return false;
  }

  console.log('\n3. Verifying commandManager.ts command handling...');

  try {
    const commandManagerPath = path.join(__dirname, '..', 'src', 'commandManager.ts');
    const commandManagerContent = fs.readFileSync(commandManagerPath, 'utf8');

    // Check if all expected commands are handled in commandManager.ts
    let allCommandsHandled = true;
    for (const command of expectedCommands) {
      const commandName = command.replace('extension.liveServer.', '');
      const casePattern = `case '${commandName}':`;
      if (commandManagerContent.includes(casePattern)) {
        console.log(`✓ Command handled: ${commandName}`);
      } else {
        console.error(`✗ Command NOT handled: ${commandName}`);
        allCommandsHandled = false;
      }
    }

    if (allCommandsHandled) {
      console.log(`\n✓ All ${expectedCommands.length} commands are handled in commandManager.ts`);
    } else {
      console.error(`\n✗ Some commands are missing from commandManager.ts`);
      return false;
    }

  } catch (error) {
    console.error('Error reading commandManager.ts:', error);
    return false;
  }

  console.log('\n4. Verifying extension compilation...');

  try {
    const extensionJsPath = path.join(__dirname, '..', 'dist', 'extension.js');
    if (fs.existsSync(extensionJsPath)) {
      console.log('✓ extension.js exists in dist/ directory');
      const extensionJsContent = fs.readFileSync(extensionJsPath, 'utf8');

      // Check if the compiled extension contains command registrations
      let compiledCommandsFound = 0;
      for (const command of expectedCommands) {
        if (extensionJsContent.includes(command)) {
          compiledCommandsFound++;
        }
      }

      console.log(`✓ Found ${compiledCommandsFound}/${expectedCommands.length} commands in compiled extension.js`);

      if (compiledCommandsFound === expectedCommands.length) {
        console.log('✓ All commands are present in compiled extension');
      } else {
        console.error('✗ Some commands are missing from compiled extension');
        return false;
      }

    } else {
      console.error('✗ extension.js not found in dist/ directory');
      return false;
    }

  } catch (error) {
    console.error('Error checking extension compilation:', error);
    return false;
  }

  console.log('\n✓ All static tests passed!');
  console.log('\n📋 Summary:');
  console.log(`- ${expectedCommands.length} commands defined in package.json`);
  console.log(`- ${expectedCommands.length} commands registered in extension.ts`);
  console.log(`- ${expectedCommands.length} commands handled in commandManager.ts`);
  console.log(`- ${expectedCommands.length} commands present in compiled extension.js`);
  console.log('\n🎉 Command registration test completed successfully!');
  console.log('\nNext steps:');
  console.log('1. Install the extension in VSCode development environment');
  console.log('2. Use VSCode Command Palette to verify commands appear');
  console.log('3. Test context menu integration for HTML files');
  console.log('4. Execute commands to verify functionality');

  return true;
}

// Run the test
const success = testCommandRegistration();
if (success) {
  console.log('\n🎉 Command registration test completed successfully!');
  process.exit(0);
} else {
  console.error('\n❌ Command registration test failed!');
  process.exit(1);
}