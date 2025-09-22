# TBX Live Server

![TBX Live Server icon](https://raw.githubusercontent.com/TheMailmans/vscode-inline-live-server/main/images/icon-256.png)

[![VSCode Marketplace](https://img.shields.io/vscode-marketplace/v/Thinkback.tbx-live-server.svg?style=flat-square&label=vscode%20marketplace)](https://marketplace.visualstudio.com/items?itemName=Thinkback.tbx-live-server)
[![Total Installs](https://img.shields.io/vscode-marketplace/d/Thinkback.tbx-live-server.svg?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=Thinkback.tbx-live-server)
[![Average Rating](https://img.shields.io/vscode-marketplace/r/Thinkback.tbx-live-server.svg?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=Thinkback.tbx-live-server)
[![GitHub License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/TheMailmans/vscode-inline-live-server/blob/main/LICENSE)
[![GitHub Issues](https://img.shields.io/github/issues/TheMailmans/vscode-inline-live-server.svg?style=flat-square)](https://github.com/TheMailmans/vscode-inline-live-server/issues)
[![GitHub Stars](https://img.shields.io/github/stars/TheMailmans/vscode-inline-live-server.svg?style=flat-square)](https://github.com/TheMailmans/vscode-inline-live-server)

Professional live development server with integrated webview preview, multi-server management, and instant reload capabilities for modern web development in VS Code.

![TBX Live Server hero screenshot showing side-by-side editor and preview](https://raw.githubusercontent.com/TheMailmans/vscode-inline-live-server/main/images/Screenshot/hero-preview.png)

## ✨ Key Features

![TBX Live Server animated demo showing multi-server workflow](https://raw.githubusercontent.com/TheMailmans/vscode-inline-live-server/main/images/Screenshot/AnimatedPreview.gif)

### 🚀 **Integrated Webview Preview**

- **Side-by-side editing**: Code and preview in the same window
- **Instant reload**: Changes reflect immediately without manual refresh
- **Multi-format support**: HTML, CSS, JavaScript, and static assets
- **Responsive testing**: Built-in device simulation tools

### 🔄 **Multi-Server Management**

![Multi-server dropdown inside the TBX Live Server webview](https://raw.githubusercontent.com/TheMailmans/vscode-inline-live-server/main/images/Screenshot/multi-server-dropdown.png)

- **Multiple servers**: Run several projects simultaneously
- **Easy switching**: Quick dropdown to switch between active servers
- **Port management**: Automatic port assignment and conflict resolution
- **Status tracking**: Visual indicators for all running servers

### 📊 **Enhanced Status Bar**

![Status bar indicator displaying two running servers](https://raw.githubusercontent.com/TheMailmans/vscode-inline-live-server/main/images/Screenshot/status-bar.png)

- **Live indicators**: Real-time server status in the status bar
- **Quick actions**: Start/stop servers with one click
- **Port display**: See which ports are active at a glance
- **Error notifications**: Immediate feedback on server issues

### ⌨️ **Command Palette Integration**

![Command Palette commands for TBX Live Server](https://raw.githubusercontent.com/TheMailmans/vscode-inline-live-server/main/images/Screenshot/command-palette.png)

- **Quick commands**: Access all features via Command Palette
- **Keyboard shortcuts**: Efficient workflow with hotkeys
- **Context-aware**: Commands adapt to your current workspace
- **Batch operations**: Manage multiple servers efficiently

## 🎯 **Perfect For**

- **Frontend Development**: React, Vue, Angular, vanilla HTML/CSS/JS
- **Static Sites**: Documentation, portfolios, landing pages
- **Prototyping**: Quick mockups and proof-of-concepts
- **Learning**: Educational projects and tutorials
- **Testing**: Cross-browser compatibility and responsive design

## 🚀 **Quick Start**

1. **Install**: Search for "TBX Live Server" in VS Code Extensions
2. **Open Project**: Open any folder containing HTML files
3. **Start Server**: Right-click an HTML file → "Open with Live Server"
4. **Preview**: Your site opens in the integrated webview panel

## ⚙️ **Configuration**

Customize your development experience:

```json
{
  "liveServer.settings.port": 5500,
  "liveServer.settings.root": "/",
  "liveServer.settings.CustomBrowser": "chrome",
  "liveServer.settings.AdvanceCustomBrowserCmdLine": "",
  "liveServer.settings.NoBrowser": false,
  "liveServer.settings.ignoreFiles": [".vscode/**", "**/*.scss", "**/*.sass"]
}
```

## 🔧 **Advanced Features**

- **Custom ports**: Configure specific ports for different projects
- **File watching**: Intelligent file change detection
- **Browser sync**: Synchronized scrolling and interactions
- **HTTPS support**: Secure development environment
- **Proxy support**: Integration with backend APIs

## 📝 **Requirements**

- **VS Code**: Version 1.74.0 or higher
- **Node.js**: Version 14.0 or higher (for advanced features)
- **Modern Browser**: Chrome, Firefox, Safari, or Edge

## 🐛 **Troubleshooting**

**Port conflicts?** The extension automatically finds available ports.
**Files not reloading?** Check your file watching settings and firewall.
**Webview not loading?** Ensure VS Code has internet access for CDN resources.

## 📚 **Documentation**

- [Getting Started Guide](https://github.com/tbx/vscode-live-server/wiki/Getting-Started)
- [Configuration Options](https://github.com/tbx/vscode-live-server/wiki/Configuration)
- [Troubleshooting](https://github.com/tbx/vscode-live-server/wiki/Troubleshooting)
- [API Reference](https://github.com/tbx/vscode-live-server/wiki/API)

## 🤝 **Contributing**

We welcome contributions! Please see our [Contributing Guide](https://github.com/tbx/vscode-live-server/blob/main/CONTRIBUTING.md) for details.

## 📄 **License**

MIT License - see [LICENSE](LICENSE) for details.

## 💖 **Support This Project**

If TBX Live Server helped solve a problem or saved you time, consider buying me a coffee! Your support helps maintain and improve this extension for the entire community.

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-Support%20Development-orange?style=for-the-badge&logo=buy-me-a-coffee)](https://buymeacoffee.com/th3mailman)

## 🙏 **Acknowledgments**

Built with ❤️ by the TBX team. Special thanks to the VS Code community for their feedback and contributions.

---

**Ready to supercharge your web development?** Install TBX Live Server today! 🚀
