# Inline Live Server v6.0.0 - Installation Guide

## 📦 Package Information

**Extension Name:** Inline Live Server
**Version:** 6.0.0
**Publisher:** TBX Development Team
**VS Code Compatibility:** 1.74.0 or higher
**File:** `tbx-live-server-6.0.0.vsix`

## 🚀 Installation Instructions

### Method 1: VS Code Extension Manager (Recommended)

1. **Open VS Code**
   - Launch Visual Studio Code on your system

2. **Open Command Palette**
   - Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)
   - Type: `Extensions: Install from VSIX...`

3. **Select the Package**
   - Navigate to the `test-build` folder
   - Select `tbx-live-server-6.0.0.vsix`
   - Click **Install**

4. **Reload VS Code**
   - Close and reopen VS Code to complete installation
   - The extension will be available in the Extensions panel

### Method 2: Command Line Installation

```bash
# Navigate to the test-build folder
cd /path/to/test-build

# Install using VS Code CLI
code --install-extension tbx-live-server-6.0.0.vsix
```

### Method 3: Manual Installation via Developer Mode

1. **Enable Developer Mode**
   - Go to VS Code Settings (`Ctrl+,`)
   - Search for "extensions"
   - Check "Extensions: Support Untrusted Workspaces"

2. **Install the Extension**
   - Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)
   - Type: `Extensions: Install from VSIX...`
   - Select the `.vsix` file

## ✅ Post-Installation Verification

After installation, verify the extension is working:

1. **Check Installation**
   - Go to Extensions panel (`Ctrl+Shift+X`)
   - Search for "Inline Live Server"
   - Verify version 6.0.0 is installed

2. **Test Basic Functionality**
   - Open any HTML file
   - Look for "Go Live" button in status bar
   - Right-click on HTML file → "Open with Live Server"

3. **Check Commands**
   - Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)
   - Type "Live Server" to see available commands

## 📋 Package Contents

### Core Features
- **Live Reload Server** - Instant updates without saving
- **Integrated Webview** - Side-by-side preview in VS Code
- **Multi-Browser Support** - Chrome, Firefox, Safari, Edge
- **Mobile Testing** - Access via WLAN from mobile devices
- **Chrome Debugging** - Attach debugger to browser
- **HTTPS Support** - Secure development with SSL
- **Multi-Root Workspace** - Full workspace support

### Webview Preview Features
- **Split/Tab/Window Views** - Multiple viewing modes
- **Navigation Controls** - Back, forward, refresh, zoom
- **Developer Tools** - Built-in DevTools integration
- **State Persistence** - Maintains context across sessions
- **Keyboard Shortcuts** - Full keyboard navigation

### Advanced Capabilities
- **Custom Port Configuration** - Any port or random assignment
- **Proxy Support** - Route through custom proxies
- **CORS Enabled** - Cross-origin resource sharing
- **File Ignoring** - Exclude specific files from reload
- **SVG Support** - Native SVG preview and reload

## ⚙️ Configuration

### Basic Settings
```json
{
  "liveServer.settings.port": 5500,
  "liveServer.settings.root": "/",
  "liveServer.settings.CustomBrowser": "chrome",
  "liveServer.settings.NoBrowser": false
}
```

### Webview Preview Settings
```json
{
  "tbxLivePreview.webviewPanel.defaultView": "split",
  "tbxLivePreview.webviewPanel.initialSize": {
    "width": 800,
    "height": 600
  },
  "tbxLivePreview.webviewPanel.autoShowOnStartup": true
}
```

## 🔧 Webpack Build Fixes Applied

This package includes several critical webpack configuration fixes:

### Native Module Handling
- **External Dependencies** - All native modules properly externalized
- **Dynamic Requires** - Context replacement for live-server module
- **Module Ignoring** - Native modules that cause bundling issues ignored
- **FSEvents Fix** - Proper handling of macOS file system events

### Build Optimizations
- **Source Maps** - Full debugging support with source maps
- **Code Splitting** - Disabled for VS Code extension compatibility
- **Bundle Analysis** - Production builds include bundle analysis
- **Performance Hints** - Warnings for large bundles

### Key Fixes
1. **Live Server Module** - Context replacement plugin for dynamic requires
2. **Native Dependencies** - All native modules marked as external
3. **VS Code Compatibility** - Proper target and library configuration
4. **Debug Support** - Source maps and function name preservation

## 🐛 Troubleshooting

### Installation Issues

**"Failed to install extension"**
- Ensure VS Code is closed and reopened
- Check if another version is already installed
- Verify the `.vsix` file is not corrupted
- Try installing in a new VS Code window

**"Extension is not compatible"**
- Verify VS Code version is 1.74.0 or higher
- Check system requirements
- Ensure no conflicting extensions

**"Command 'Live Server' not found"**
- Restart VS Code completely
- Check Extensions panel for installation status
- Try disabling/re-enabling the extension

### Runtime Issues

**Server won't start**
- Check if port 5500 is available
- Try setting port to 0 for random assignment
- Verify firewall settings
- Check for conflicting applications

**Live reload not working**
- Ensure files are being saved
- Check file is in workspace root
- Verify no file ignoring rules blocking it
- Try manual browser refresh

**Webview not opening**
- Check VS Code webview permissions
- Try toggling webview settings
- Verify no extension conflicts
- Check developer console for errors

### Performance Issues

**High memory usage**
- Close unused webview panels
- Check for memory leaks in your code
- Monitor with VS Code's built-in profiler
- Consider adjusting panel timeout settings

**Slow reload times**
- Check network connectivity
- Verify file sizes are reasonable
- Consider excluding large files from watching
- Check for excessive DOM manipulation

## 📞 Support

For issues or questions:
1. Check the [FAQ Documentation](../../docs/faqs.md)
2. Search [existing issues](https://github.com/tbx/vscode-live-server/issues)
3. Create a [new issue](https://github.com/tbx/vscode-live-server/issues/new) with:
   - VS Code version
   - Extension version (6.0.0)
   - Operating system
   - Steps to reproduce
   - Expected vs actual behavior

## 📄 License

This extension is licensed under the MIT License.

---

**Inline Live Server v6.0.0** - Built with ❤️ by TBX Development Team