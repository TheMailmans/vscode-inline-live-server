# Screenshot Generation for VS Code Extension

This directory contains a comprehensive Playwright test suite for automatically generating professional screenshots of the Inline Live Server VS Code extension.

## Overview

The screenshot generation system creates high-quality marketing and documentation images that showcase the extension's key features:

1. **Extension Activation** - Shows the extension successfully loaded in VS Code
2. **Multi-Server Setup** - Demonstrates running multiple projects simultaneously
3. **Server Management** - Displays start/stop/restart controls for server instances
4. **Preview Dropdown** - Shows the server selection interface
5. **Error Handling** - Illustrates robust error recovery mechanisms

## Usage

### Quick Start

Run the screenshot generation suite:

```bash
npm run test:screenshots
```

This command will:
- Launch Playwright in headed mode (visible browser)
- Run tests sequentially (not in parallel)
- Generate 7 professional screenshots
- Save them to `images/Screenshot/` with descriptive filenames

### Generated Screenshots

The following screenshots are automatically created:

- `01-extension-activated.png` - VS Code interface with extension loaded
- `02-first-project-created.png` - Portfolio project running on port 5500
- `03-second-project-created.png` - Dashboard project running on port 5501
- `04-both-servers-running.png` - Multi-server management interface
- `05-preview-dropdown-open.png` - Server selection dropdown
- `06-server-management.png` - Start/stop controls and server status
- `07-error-handling-scenarios.png` - Error recovery and resolution

### Configuration

The screenshot generation uses a dedicated Playwright project configuration:

- **Headed Mode**: `headless: false` for visual verification
- **Sequential Execution**: `fullyParallel: false, workers: 1`
- **High Resolution**: `1920x1080` viewport for crisp screenshots
- **Full Page**: Captures entire page content

### Customization

To modify the screenshots:

1. Edit `test/playwright/screenshot-generation.test.ts`
2. Adjust HTML content, styling, or test scenarios
3. Run `npm run test:screenshots` to regenerate

### File Structure

```
test/playwright/
├── screenshot-generation.test.ts  # Main test suite
├── README-Screenshots.md          # This documentation
└── ...other test files

images/Screenshot/
├── 01-extension-activated.png
├── 02-first-project-created.png
├── ...other generated screenshots
└── ...existing screenshots
```

## Technical Details

### Mock Implementation

Since this is a VS Code extension, the tests create realistic HTML mockups that simulate:

- VS Code interface elements
- Live server status indicators
- Multi-project management
- Error states and recovery flows

### Test Workspace

The tests create a temporary `test-workspace/` directory with:
- Portfolio project files
- Dashboard project files
- Realistic HTML content for each scenario

### Screenshot Quality

- **Resolution**: 1920x1080 for high-quality output
- **Format**: PNG for crisp text and UI elements
- **Timing**: 2-second delays ensure proper rendering
- **Cleanup**: Old screenshots are automatically removed before generation

## Maintenance

### Updating Screenshots

When the extension UI changes:

1. Update the HTML mockups in the test file
2. Adjust styling to match new design
3. Run the screenshot generation
4. Review generated images for accuracy

### Adding New Scenarios

To add new screenshot scenarios:

1. Add a new test case to the `test.describe.serial()` block
2. Create appropriate HTML mockup content
3. Call `takeScreenshot(page, 'descriptive-name')`
4. Update this documentation

## Troubleshooting

### Common Issues

- **Browser not opening**: Ensure Playwright browsers are installed (`npm run test:playwright:install`)
- **Screenshots not saving**: Check file permissions on `images/Screenshot/` directory
- **Tests failing**: Verify HTML content is valid and renders properly

### Debug Mode

For debugging screenshot generation:

```bash
npx playwright test screenshot-generation.test.ts --debug --project=screenshot-generation
```

This opens the Playwright inspector for step-by-step debugging.
