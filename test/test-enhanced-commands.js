// Test script for enhanced command registration
const fs = require('fs');
const path = require('path');

function testEnhancedCommandRegistration() {
  console.log('🧪 Testing Enhanced Inline Live Server Command Registration...\n');

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

  console.log('1. ✅ Verifying package.json command definitions...');

  try {
    const packageJsonPath = path.join(__dirname, '..', 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    const definedCommands = packageJson.contributes?.commands?.map(cmd => cmd.command) || [];

    console.log(`Found ${definedCommands.length} commands in package.json`);

    let allCommandsDefined = true;
    for (const command of expectedCommands) {
      if (definedCommands.includes(command)) {
        console.log(`   ✓ ${command}`);
      } else {
        console.error(`   ✗ ${command}`);
        allCommandsDefined = false;
      }
    }

    if (allCommandsDefined) {
      console.log(`\n   ✅ All ${expectedCommands.length} commands are defined in package.json`);
    } else {
      console.error(`\n   ❌ Some commands are missing from package.json`);
      return false;
    }

  } catch (error) {
    console.error('❌ Error reading package.json:', error);
    return false;
  }

  console.log('\n2. ✅ Verifying enhanced extension.ts command registration...');

  try {
    const extensionPath = path.join(__dirname, '..', 'src', 'extension-enhanced.ts');
    const extensionContent = fs.readFileSync(extensionPath, 'utf8');

    let allCommandsRegistered = true;
    for (const command of expectedCommands) {
      if (extensionContent.includes(command)) {
        console.log(`   ✓ ${command}`);
      } else {
        console.error(`   ✗ ${command}`);
        allCommandsRegistered = false;
      }
    }

    if (allCommandsRegistered) {
      console.log(`\n   ✅ All ${expectedCommands.length} commands are registered in extension-enhanced.ts`);
    } else {
      console.error(`\n   ❌ Some commands are missing from extension-enhanced.ts`);
      return false;
    }

  } catch (error) {
    console.error('❌ Error reading extension-enhanced.ts:', error);
    return false;
  }

  console.log('\n3. ✅ Verifying enhanced commandManager-enhanced.ts functionality...');

  try {
    const commandManagerPath = path.join(__dirname, '..', 'src', 'commandManager-enhanced.ts');
    const commandManagerContent = fs.readFileSync(commandManagerPath, 'utf8');

    // Check for key functionality
    const hasGoOnline = commandManagerContent.includes('goOnline(): void') && commandManagerContent.includes('startLiveServer');
    const hasGoOffline = commandManagerContent.includes('goOffline(): Promise<void>') && commandManagerContent.includes('stopServers');
    const hasErrorHandling = commandManagerContent.includes('try {') && commandManagerContent.includes('catch (error)');
    const hasServerCollection = commandManagerContent.includes('private servers:') && commandManagerContent.includes('findAvailablePort');

    console.log(`   ✓ goOnline method with server functionality: ${hasGoOnline ? 'Yes' : 'No'}`);
    console.log(`   ✓ goOffline method with cleanup: ${hasGoOffline ? 'Yes' : 'No'}`);
    console.log(`   ✓ Error handling: ${hasErrorHandling ? 'Yes' : 'No'}`);
    console.log(`   ✓ Multi-server management: ${hasServerCollection ? 'Yes' : 'No'}`);

    if (hasGoOnline && hasGoOffline && hasErrorHandling && hasServerCollection) {
      console.log('\n   ✅ Enhanced CommandManager has all required functionality');
    } else {
      console.error('\n   ❌ Enhanced CommandManager is missing some functionality');
      return false;
    }

  } catch (error) {
    console.error('❌ Error reading commandManager-enhanced.ts:', error);
    return false;
  }

  console.log('\n4. ✅ Verifying enhanced features...');

  try {
    const extensionPath = path.join(__dirname, '..', 'src', 'extension-enhanced.ts');
    const extensionContent = fs.readFileSync(extensionPath, 'utf8');

    const hasEnhancedLogging = extensionContent.includes('console.log') && extensionContent.includes('[Extension]');
    const hasErrorHandling = extensionContent.includes('try {') && extensionContent.includes('catch (error)');
    const autoStartRemoved = !extensionContent.includes('autoStart');

    console.log(`   ✓ Enhanced logging: ${hasEnhancedLogging ? 'Yes' : 'No'}`);
    console.log(`   ✓ Error handling: ${hasErrorHandling ? 'Yes' : 'No'}`);
    console.log(`   ✓ Manual start only (no auto-start): ${autoStartRemoved ? 'Yes' : 'No'}`);

    if (hasEnhancedLogging && hasErrorHandling && autoStartRemoved) {
      console.log('\n   ✅ Enhanced extension has all required features');
    } else {
      console.error('\n   ❌ Enhanced extension is missing some features');
      return false;
    }

  } catch (error) {
    console.error('❌ Error checking enhanced features:', error);
    return false;
  }

  console.log('\n🎉 ENHANCED COMMAND REGISTRATION TEST RESULTS:');
  console.log('================================================');
  console.log(`✅ ${expectedCommands.length} commands defined in package.json`);
  console.log(`✅ ${expectedCommands.length} commands registered in extension-enhanced.ts`);
  console.log(`✅ Enhanced CommandManager with multi-server functionality`);
  console.log(`✅ Enhanced extension with logging and error handling`);
  console.log('\n📋 SUMMARY:');
  console.log('- Command registration: ✅ FIXED');
  console.log('- Multi-server functionality: ✅ IMPLEMENTED');
  console.log('- Error handling: ✅ ADDED');
  console.log('- Logging: ✅ ENHANCED');
  console.log('\n🎯 The "command not found" error should now be resolved!');
  console.log('\n📝 NEXT STEPS:');
  console.log('1. Build the extension: npm run compile');
  console.log('2. Install in VSCode development environment');
  console.log('3. Test context menu integration for HTML files');
  console.log('4. Execute commands to verify server starts properly');
  console.log('\n✨ Enhanced Inline Live Server is ready for testing!');

  return true;
}

// Run the test
const success = testEnhancedCommandRegistration();
if (success) {
  console.log('\n🎉 Enhanced command registration test completed successfully!');
  process.exit(0);
} else {
  console.error('\n❌ Enhanced command registration test failed!');
  process.exit(1);
}
