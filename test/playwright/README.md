# Inline Live Server Extension - Playwright Test Suite

This directory contains a comprehensive Playwright test suite for the Inline Live Server VS Code extension. The tests are designed to automatically test the extension functionality and detect the specific "Cannot read properties of undefined" error mentioned in the requirements.

## 🚀 Quick Start

### Prerequisites

1. **Node.js** (version 16 or higher)
2. **VS Code** (for extension testing)
3. **VSCE** (VS Code Extension Manager) - `npm install -g @vscode/vsce`

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Install Playwright browsers:
   ```bash
   npm run test:playwright:install
   ```

3. Run the full test suite:
   ```bash
   npm run test:playwright:full
   ```

## 📁 Test Structure

```
test/playwright/
├── fixtures.ts                    # Test fixtures and utilities
├── extension-installation.test.ts # VSIX installation tests
├── context-menu.test.ts          # Context menu functionality tests
├── command-execution.test.ts     # Command execution and error detection
├── live-server.test.ts           # Live server integration tests
├── test-runner.ts               # Automated test runner
└── README.md                    # This file
```

## 🧪 Test Categories

### 1. Extension Installation Tests (`extension-installation.test.ts`)
- ✅ VSIX package creation and validation
- ✅ Extension installation process
- ✅ Extension activation verification
- ✅ Package.json manifest validation
- ✅ Error handling for corrupted packages

### 2. Context Menu Tests (`context-menu.test.ts`)
- ✅ Context menu visibility on HTML files
- ✅ Command registration verification
- ✅ Multiple HTML file handling
- ✅ Non-HTML file handling (should not show commands)

### 3. Command Execution Tests (`command-execution.test.ts`)
- ✅ **Error Detection**: Specifically monitors for "Cannot read properties of undefined"
- ✅ Command execution without undefined property errors
- ✅ Server startup error handling
- ✅ Error recovery mechanisms
- ✅ Error logging and debugging information

### 4. Live Server Integration Tests (`live-server.test.ts`)
- ✅ Live server startup functionality
- ✅ Server configuration validation
- ✅ Server lifecycle management
- ✅ VS Code workspace integration
- ✅ Status feedback mechanisms

## 🔧 Configuration

### Playwright Configuration (`playwright.config.ts`)

The test suite is configured with:
- **HTML reporting** with screenshots and videos
- **JSON reporting** for CI/CD integration
- **JUnit XML** for test result aggregation
- **Trace collection** for debugging failed tests
- **VS Code extension testing** environment

### Test Fixtures (`fixtures.ts`)

Provides reusable test utilities:
- Extension path management
- VSIX package handling
- Extension installation/uninstallation
- Extension activation waiting
- Error monitoring and detection

## 🎯 Error Detection

The test suite specifically targets the "Cannot read properties of undefined" error:

### Detection Methods
1. **Console Log Monitoring**: Captures and analyzes console output
2. **Error Event Listeners**: Monitors JavaScript runtime errors
3. **Extension State Validation**: Checks extension state consistency
4. **Command Execution Analysis**: Verifies command execution results

### Error Scenarios Tested
- Undefined server instance access
- Undefined configuration object access
- Undefined workspace reference access
- Undefined webview panel access
- Null/undefined property access chains

## 📊 Test Reports

### HTML Report
- Visual test results with screenshots
- Video recordings of test execution
- Timeline of test steps
- Detailed error information

### JSON Report
- Machine-readable test results
- Test timing and performance metrics
- Error details and stack traces
- Test metadata and tags

### JUnit XML Report
- CI/CD integration support
- Test aggregation across multiple runs
- Historical trend analysis
- Test categorization and filtering

## 🚦 Running Specific Tests

### Run All Tests
```bash
npm run test:playwright:full
```

### Run Individual Test Files
```bash
npx playwright test extension-installation.test.ts
npx playwright test context-menu.test.ts
npx playwright test command-execution.test.ts
npx playwright test live-server.test.ts
```

### Run with UI Mode
```bash
npm run test:playwright:ui
```

### Debug Mode
```bash
npm run test:playwright:debug
```

### Custom Test Runner
```bash
node test/playwright/test-runner.js
```

## 🔍 Debugging

### Enable Debug Logging
Set the log level in VS Code settings:
```json
{
  "tbxLivePreview.development.logLevel": "debug"
}
```

### View Test Traces
1. Run tests with trace collection enabled
2. Open `test-results/` directory
3. View trace files in VS Code or browser

### Console Output Analysis
The test runner provides detailed console output:
- Step-by-step execution progress
- Timing information for each step
- Error details and stack traces
- Success/failure indicators

## 🛠️ Development

### Adding New Tests
1. Create test file in `test/playwright/`
2. Use the fixtures from `fixtures.ts`
3. Follow the naming convention: `*.test.ts`
4. Add test descriptions and comments

### Test Utilities
The fixtures provide several utilities:
- `installExtension()`: Installs the extension
- `uninstallExtension()`: Removes the extension
- `waitForExtensionActivation()`: Waits for activation
- `extensionPath`: Path to extension source
- `vsixPath`: Path to built VSIX package

### Error Monitoring
To add error detection for new scenarios:
1. Use the error monitoring fixtures
2. Add console log listeners
3. Implement error recovery tests
4. Verify error reporting mechanisms

## 📈 CI/CD Integration

### GitHub Actions
The test suite includes GitHub Actions workflow:
- Automatic test execution on push/PR
- Test result aggregation
- Failure notifications
- Artifact collection

### Environment Variables
- `CI`: Enables CI-specific configuration
- `DEBUG`: Enables debug logging
- `PLAYWRIGHT_BROWSERS_PATH`: Custom browser path

## 🐛 Troubleshooting

### Common Issues

1. **VSIX Installation Fails**
   - Verify VS Code is installed
   - Check VSCE installation
   - Ensure extension path is correct

2. **Playwright Browser Installation**
   - Run `npm run test:playwright:install`
   - Check network connectivity
   - Verify disk space

3. **Extension Activation Issues**
   - Check VS Code version compatibility
   - Verify extension manifest
   - Review activation events

4. **"Cannot read properties of undefined" Error**
   - Check the command execution tests
   - Review console logs for details
   - Verify extension state management

### Getting Help
- Check the test reports in `test-results/`
- Review console output for error details
- Examine trace files for debugging
- Check GitHub issues for similar problems

## 📝 Contributing

When contributing to the test suite:
1. Follow the existing test structure
2. Add appropriate test fixtures
3. Include error detection for new functionality
4. Update this README with new test descriptions
5. Ensure all tests pass before submitting

## 🔄 Test Maintenance

### Regular Updates
- Update Playwright to latest version
- Review and update test selectors
- Update VS Code API compatibility
- Refresh test data and scenarios

### Performance Optimization
- Monitor test execution time
- Optimize test parallelism
- Review resource usage
- Update browser versions

---

**Note**: This test suite is specifically designed to detect and help debug the "Cannot read properties of undefined" error in the Inline Live Server extension. The tests provide comprehensive coverage of the extension functionality and include detailed error reporting to help identify and fix integration issues.