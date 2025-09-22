# 🚀 TBX Live Preview v{VERSION}

**Launch a development server with live reload and integrated webview preview. See changes instantly with side-by-side development, mobile testing, and advanced debugging tools.**

## ✨ What's New in v{VERSION}

### 🎯 **Key Features**
- **Integrated Webview Preview** - Side-by-side development with built-in browser
- **Enhanced Navigation** - Back/forward buttons, zoom controls, and address bar
- **Developer Tools Integration** - Built-in DevTools, inspect element, view source
- **State Persistence** - Save and restore navigation state across sessions
- **Split View Modes** - Tab, split, and window view options

### 🔧 **Improvements**
- **Performance Optimizations** - Faster startup and reduced memory usage
- **Better Error Handling** - Improved error recovery and user feedback
- **Enhanced UI** - Modern interface with better accessibility
- **Keyboard Shortcuts** - Comprehensive keyboard navigation support

## 📦 Installation

### From VS Code Marketplace
1. Open VS Code
2. Press `Ctrl+P` (or `Cmd+P` on Mac)
3. Type: `ext install tbx.live-preview`
4. Press Enter and reload VS Code

### From VSIX Package
1. Download the latest `.vsix` file from this release
2. Open VS Code
3. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
4. Type: `Extensions: Install from VSIX...`
5. Select the downloaded `.vsix` file

## 🚀 Quick Start

### Method 1: Status Bar (Recommended)
1. Open any project with HTML files
2. Click the **"Go Live"** button in the status bar
3. Your default browser opens with live reload enabled

### Method 2: Context Menu
1. Right-click on any HTML file in the Explorer
2. Select **"Open with Live Server"**
3. Server starts and opens the file in your browser

### Method 3: Command Palette
1. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
2. Type: `Live Server: Open With Live Server`
3. Select your HTML file

### Method 4: Keyboard Shortcuts
- **Start Server**: `Alt+L, Alt+O` (Windows/Linux) or `Cmd+L, Cmd+O` (Mac)
- **Stop Server**: `Alt+L, Alt+C` (Windows/Linux) or `Cmd+L, Cmd+C` (Mac)
- **Toggle Webview**: `Alt+L, Alt+W` (Windows/Linux) or `Cmd+L, Cmd+W` (Mac)

## ⚙️ Configuration

### Basic Settings

All settings can be configured in your workspace `.vscode/settings.json` file:

```json
{
  "liveServer.settings.port": 5500,
  "liveServer.settings.root": "/",
  "liveServer.settings.CustomBrowser": "chrome",
  "liveServer.settings.NoBrowser": false,
  "liveServer.settings.host": "127.0.0.1"
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
  "tbxLivePreview.webviewPanel.autoShowOnStartup": true,
  "tbxLivePreview.server.autoStart": true
}
```

## 🎯 Usage Examples

### Static HTML Development
```html
<!DOCTYPE html>
<html>
<head>
    <title>My Project</title>
</head>
<body>
    <h1>Hello, TBX Live Preview!</h1>
    <p>Edit this file and see changes instantly in the browser.</p>
</body>
</html>
```

### React/Vue/Angular Development
Works seamlessly with modern frameworks:
- Create React App
- Vue CLI projects
- Angular projects
- Any static site generator

### Mobile Development Testing
1. Start your Live Server
2. Find your computer's IP address:
   - Windows: `ipconfig`
   - macOS/Linux: `ifconfig` or `ip addr`
3. Access from mobile: `http://YOUR_IP:PORT`

## 🔍 Webview Preview Features

### Navigation Controls
- **Address Bar** - Navigate to different URLs
- **Back/Forward** - Browser-style navigation
- **Refresh** - Reload current page
- **Home** - Return to project root

### Developer Tools
- **Zoom Controls** - Zoom in/out/reset
- **Full Screen** - Toggle full screen mode
- **Split View** - Toggle split/tab view
- **DevTools** - Open browser developer tools
- **Inspect Element** - Inspect DOM elements
- **View Source** - View page source code

### Advanced Features
- **Navigation History** - Maintains browsing history
- **State Persistence** - Saves/loads navigation state
- **Context Menu** - Right-click context menu
- **Keyboard Shortcuts** - Full keyboard navigation

## 🆚 Comparison with Other Extensions

| Feature | TBX Live Preview | Live Server | Browser Preview |
|---------|------------------|-------------|-----------------|
| Live Reload | ✅ | ✅ | ❌ |
| Webview Preview | ✅ | ❌ | ✅ |
| Multi-Browser | ✅ | ✅ | ✅ |
| Mobile Access | ✅ | ✅ | ❌ |
| Chrome Debugging | ✅ | ✅ | ✅ |
| HTTPS Support | ✅ | ✅ | ✅ |
| Multi-Root | ✅ | ✅ | ✅ |
| State Persistence | ✅ | ❌ | ✅ |
| Integrated DevTools | ✅ | ❌ | ✅ |

## 🐛 Troubleshooting

### Common Issues

**Server won't start**
- Check if the port is already in use
- Try using port 0 for random port assignment
- Ensure no firewall is blocking the port

**Live reload not working**
- Check if files are being saved
- Verify the file is in the workspace root or subfolder
- Try refreshing the browser manually

**Browser not opening**
- Check your default browser settings
- Try setting a specific browser in configuration
- Ensure no popup blockers are active

**Mobile connection issues**
- Verify both devices are on the same network
- Check firewall settings
- Try using IP address instead of localhost

### Debug Mode

Enable debug mode for detailed logging:

```json
{
  "tbxLivePreview.development.debugMode": true,
  "tbxLivePreview.development.logLevel": "debug"
}
```

## 📋 System Requirements

- **VS Code**: 1.74.0 or higher
- **Node.js**: Not required (extension is self-contained)
- **Memory**: 50MB available RAM
- **Storage**: 10MB disk space
- **Network**: Localhost access (127.0.0.1)

### Supported Platforms
- Windows 10/11 (x64, ARM64)
- macOS 10.15+
- Linux (Ubuntu 18.04+, CentOS 8+, Debian 10+)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md).

### Development Setup
1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/vscode-live-server.git`
3. Install dependencies: `npm install`
4. Open in VS Code: `code .`
5. Press F5 to start debugging

## 📜 Changelog

See [CHANGELOG.md](CHANGELOG.md) for detailed version history.

## 🙏 Acknowledgments

- Original Live Server by [Ritwick Dey](https://github.com/ritwickdey)
- Contributors: [Max Schmitt](https://github.com/mxschmitt), [Joydip Roy](https://github.com/rjoydip), [Ayo Adesugba](https://github.com/adesugbaa)
- Browser Preview integration by [Kenneth Auchenberg](https://github.com/auchenberg)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [Marketplace Page](https://marketplace.visualstudio.com/items?itemName=tbx.live-preview)
- [GitHub Repository](https://github.com/tbx/vscode-live-server)
- [Issue Tracker](https://github.com/tbx/vscode-live-server/issues)
- [Discussions](https://github.com/tbx/vscode-live-server/discussions)
- [Documentation](./docs/)

---

**Made with ❤️ by TBX Development Team**

## 📝 Release Notes

### Breaking Changes
- [List any breaking changes here]

### Deprecations
- [List any deprecated features here]

### Migration Guide
- [Provide migration instructions if needed]

---

**Full Changelog**: https://github.com/tbx/vscode-live-server/blob/main/CHANGELOG.md