// Test context menu integration for HTML files
const fs = require('fs');
const path = require('path');

function testContextMenuIntegration() {
  console.log('Testing Inline Live Server context menu integration...\n');

  try {
    const packageJsonPath = path.join(__dirname, '..', 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    const menus = packageJson.contributes?.menus || {};
    const editorContext = menus['editor/context'] || [];
    const explorerContext = menus['explorer/context'] || [];

    console.log('1. Testing editor/context menu integration...');

    // Check for HTML file context menu items
    const htmlEditorCommands = editorContext.filter(item =>
      item.when && item.when.includes('html')
    );

    console.log(`Found ${htmlEditorCommands.length} context menu items for HTML files in editor`);

    if (htmlEditorCommands.length > 0) {
      htmlEditorCommands.forEach((item, index) => {
        console.log(`✓ Editor context menu ${index + 1}: ${item.command} (when: ${item.when})`);
      });
    } else {
      console.error('✗ No context menu items found for HTML files in editor');
      return false;
    }

    console.log('\n2. Testing explorer/context menu integration...');

    // Check for HTML file context menu items in explorer
    const htmlExplorerCommands = explorerContext.filter(item =>
      item.when && item.when.includes('html')
    );

    console.log(`Found ${htmlExplorerCommands.length} context menu items for HTML files in explorer`);

    if (htmlExplorerCommands.length > 0) {
      htmlExplorerCommands.forEach((item, index) => {
        console.log(`✓ Explorer context menu ${index + 1}: ${item.command} (when: ${item.when})`);
      });
    } else {
      console.error('✗ No context menu items found for HTML files in explorer');
      return false;
    }

    console.log('\n3. Testing XML file support...');

    // Check for XML file context menu items
    const xmlEditorCommands = editorContext.filter(item =>
      item.when && item.when.includes('xml')
    );

    const xmlExplorerCommands = explorerContext.filter(item =>
      item.when && item.when.includes('xml')
    );

    console.log(`Found ${xmlEditorCommands.length} context menu items for XML files in editor`);
    console.log(`Found ${xmlExplorerCommands.length} context menu items for XML files in explorer`);

    if (xmlEditorCommands.length > 0) {
      xmlEditorCommands.forEach((item, index) => {
        console.log(`✓ XML Editor context menu ${index + 1}: ${item.command} (when: ${item.when})`);
      });
    }

    if (xmlExplorerCommands.length > 0) {
      xmlExplorerCommands.forEach((item, index) => {
        console.log(`✓ XML Explorer context menu ${index + 1}: ${item.command} (when: ${item.when})`);
      });
    }

    console.log('\n4. Testing command availability...');

    // Verify that the commands referenced in context menus are actually defined
    const allContextCommands = [
      ...htmlEditorCommands,
      ...htmlExplorerCommands,
      ...xmlEditorCommands,
      ...xmlExplorerCommands
    ].map(item => item.command);

    const definedCommands = packageJson.contributes?.commands?.map(cmd => cmd.command) || [];

    let allContextCommandsAvailable = true;
    for (const command of allContextCommands) {
      if (definedCommands.includes(command)) {
        console.log(`✓ Context menu command available: ${command}`);
      } else {
        console.error(`✗ Context menu command NOT available: ${command}`);
        allContextCommandsAvailable = false;
      }
    }

    if (!allContextCommandsAvailable) {
      console.error('\n✗ Some context menu commands are not defined');
      return false;
    }

    console.log('\n5. Testing "when" clause syntax...');

    // Test that when clauses are properly formatted
    const whenClauses = [
      ...htmlEditorCommands,
      ...htmlExplorerCommands,
      ...xmlEditorCommands,
      ...xmlExplorerCommands
    ].map(item => item.when);

    let validWhenClauses = true;
    for (const whenClause of whenClauses) {
      if (whenClause && whenClause.includes('resourceLangId')) {
        console.log(`✓ Valid when clause: ${whenClause}`);
      } else {
        console.error(`✗ Invalid when clause: ${whenClause}`);
        validWhenClauses = false;
      }
    }

    if (!validWhenClauses) {
      console.error('\n✗ Some when clauses are invalid');
      return false;
    }

    console.log('\n✓ All context menu tests passed!');
    console.log('\n📋 Context Menu Summary:');
    console.log(`- ${htmlEditorCommands.length} HTML editor context menu items`);
    console.log(`- ${htmlExplorerCommands.length} HTML explorer context menu items`);
    console.log(`- ${xmlEditorCommands.length} XML editor context menu items`);
    console.log(`- ${xmlExplorerCommands.length} XML explorer context menu items`);
    console.log(`- All referenced commands are properly defined`);
    console.log(`- All when clauses use correct syntax`);

    console.log('\n🎉 Context menu integration test completed successfully!');
    console.log('\nNext steps:');
    console.log('1. Create test HTML file to verify context menus appear');
    console.log('2. Test right-click context menu on HTML files');
    console.log('3. Verify commands execute from context menu');
    console.log('4. Test XML file context menu support');

    return true;

  } catch (error) {
    console.error('Error testing context menu integration:', error);
    return false;
  }
}

// Run the test
const success = testContextMenuIntegration();
if (success) {
  console.log('\n🎉 Context menu integration test completed successfully!');
  process.exit(0);
} else {
  console.error('\n❌ Context menu integration test failed!');
  process.exit(1);
}