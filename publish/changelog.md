# Changelog

All notable changes to Inline Live Server will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/1.0.0.html).

## [Unreleased]

### 🚀 **Major New Features**

- **Multi-Server Orchestration** – Run independent live-reload servers per workspace with automatic port assignment and quick switching
- **Integrated Webview Preview** – Side-by-side development with built-in browser and per-server controls
- **Enhanced Navigation** – Back/forward buttons, zoom controls, and address bar
- **Developer Tools Integration** – Built-in DevTools, inspect element, view source
- **State Persistence** – Save and restore navigation state across sessions
- **Split View Modes** – Tab, split, and window view options

### 🔧 **Improvements**

- **Performance Optimizations** – Faster startup and reduced memory usage
- **Better Error Handling** – Improved error recovery and user feedback
- **Enhanced UI** – Modern interface with better accessibility
- **Status Bar UX** – Dynamic status entry now reflects the number of running servers and links to management actions
- **Documentation Refresh** – Updated quick start, configuration guidance, and licensing notes honoring the original Live Server project
- **Marketplace Assets** – New icon and screenshots showcase the Inline Live Server experience

### 🐛 **Bug Fixes**

- Fixed various stability issues
- Improved compatibility with different VS Code versions
- Better handling of edge cases and error conditions
- Eliminated false "server already running" warnings when launching new servers

## [6.0.0] - 2024-01-15

### 🚀 **Major Release - Inline Live Server**

- **Complete Rebrand** - Now called "Inline Live Server" with enhanced features
- **Webview Integration** - Added integrated browser preview functionality
- **Modern Architecture** - Complete codebase modernization
- **Enhanced Configuration** - New settings for webview customization
- **Better Performance** - Improved startup time and resource usage

### ✨ **New Features**

- **Webview Panel** - Integrated browser preview alongside code
- **Navigation Controls** - Full browser-like navigation experience
- **Developer Tools** - Built-in debugging and inspection tools
- **State Management** - Persistent navigation and view state
- **Customizable UI** - Theme support and UI customization options

### 🔧 **Configuration Enhancements**

- Added `tbxLivePreview.*` configuration namespace
- Webview panel size and position controls
- Auto-show and auto-start options
- Theme and appearance customization
- Development and debugging settings

## [5.7.9] - 2023-12-01

### 🔧 **Improvements**

- **Activation Performance** - Improved extension load time
- **Memory Usage** - Reduced memory footprint
- **Error Handling** - Better error recovery mechanisms

### 🐛 **Bug Fixes**

- Fixed extension host termination issues
- Resolved compatibility problems with newer VS Code versions
- Fixed various stability issues

## [5.7.8] - 2023-11-15

### 🔧 **Improvements**

- **Package Updates** - Updated dependencies for better security
- **Code Quality** - Improved TypeScript definitions
- **Documentation** - Enhanced inline documentation

## [5.7.7] - 2023-10-01

### 🐛 **Bug Fixes**

- Fixed random port assignment issues
- Resolved file watching problems
- Fixed browser launch failures

## [5.7.6] - 2023-09-15

### ✨ **New Features**

- **Live Share Integration** - Share live server with live reload
- **Enhanced Browser Support** - Added support for Blisk browser
- **Custom Browser Settings** - Improved browser configuration options

### 🔧 **Improvements**

- **Multi-Root Workspace** - Better support for multi-root workspaces
- **Workspace Detection** - Smart workspace entry point detection
- **Command Improvements** - Enhanced command palette integration

## [5.7.5] - 2023-08-01

### 🐛 **Bug Fixes**

- Fixed multi-root workspace issues
- Resolved browser compatibility problems
- Fixed status bar button visibility

## [5.7.4] - 2023-07-15

### ✨ **New Features**

- **WebSocket Support** - Improved live reload mechanism
- **Local IP Support** - Use local IP instead of localhost
- **Status Bar Controls** - Option to hide status bar button
- **SPA Support** - Single Page Application support

### 🔧 **Improvements**

- **Documentation Updates** - Comprehensive settings documentation
- **Error Messages** - Better user feedback
- **Performance** - Faster server startup

## [5.7.3] - 2023-06-01

### 🐛 **Bug Fixes**

- Fixed extension deployment issues
- Resolved marketplace description problems
- Fixed changelog display issues

## [5.7.2] - 2023-05-15

### ✨ **New Features**

- **Mount Settings** - Mount directories to routes
- **CORS Support** - Cross-origin resource sharing enabled
- **Full Reload Option** - Force full page reload instead of CSS injection
- **Delay Settings** - Configurable delay before live reload

## [5.7.1] - 2023-04-01

### 🔧 **Improvements**

- **Keybinding Updates** - Better keyboard shortcuts for macOS
- **Browser Command Line** - Advanced browser configuration
- **Chrome Debugging** - Enhanced debugging attachment support

## [5.7.0] - 2023-03-15

### 🚀 **Major Features**

- **HTTPS Support** - Secure development server
- **Proxy Support** - Route requests through proxies
- **Web Extension Support** - Dynamic page support (PHP, etc.)
- **Advanced Settings** - Comprehensive configuration options

### 🐛 **Bug Fixes**

- Fixed CPU overload issues
- Resolved node_modules watching problems
- Fixed status bar button issues

## [5.6.1] - 2023-02-17

### 🐛 **Bug Fixes**

- Fixed extension host termination unexpectedly
- Resolved compatibility issues with VS Code Insiders

## [5.6.0] - 2023-02-17

### ✨ **New Features**

- **Browser Preview Integration** - Integrated with VS Code Browser Preview
- **Random Port Fallback** - Automatic port assignment when port is busy
- **File Watcher Updates** - Moved to vscode-chokidar for better performance

### 🔧 **Improvements**

- **Documentation Fixes** - Updated settings and usage documentation

## [5.5.1] - 2023-02-12

### 🐛 **Bug Fixes**

- Fixed extension host termination on macOS
- Resolved file watching issues

## [5.5.0] - 2023-02-12

### 🔧 **Improvements**

- **Ignore Files Settings** - Better file exclusion configuration
- **CPU Usage Optimization** - Reduced CPU load during development

## [5.4.0] - 2023-01-30

### 🐛 **Bug Fixes**

- Fixed fsevents issues on VS Code Insiders
- Resolved file system watching problems

## [5.3.1] - 2022-11-28

### 🔒 **Security Updates**

- Updated event-stream package for security
- Dependency security patches

## [5.3.0] - 2022-11-27

### 🔧 **Improvements**

- Package dependency updates
- Performance improvements

## [5.2.0] - 2022-11-16

### ✨ **New Features**

- **Live Share Integration** - Share development server with live reload
- **Documentation Updates** - Comprehensive documentation improvements

## [5.1.1] - 2022-06-20

### 🐛 **Bug Fixes**

- Fixed marketplace description issues
- Resolved changelog display problems

## [5.1.0] - 2022-06-20

### ✨ **New Features**

- **Multi-Root Workspace Support** - Full workspace support
- **Blisk Browser Support** - Added Blisk to browser options
- **Custom Browser Settings** - Enhanced browser configuration

## [5.0.0] - 2022-06-15

### 🚀 **Major Release**

- **Multi-Root Workspace Support** - Complete workspace support
- **Workspace Management** - Smart workspace detection and switching
- **Command Enhancements** - Improved command palette integration

## [4.0.1] - 2022-06-05

### ✨ **New Features**

- **Keyboard Shortcuts** - Enhanced keyboard navigation
- **Context Menu** - Added stop server option
- **Icon Refresh** - Updated extension icon
- **TypeScript Support** - Added TypeScript to ignore list

## [4.0.0] - 2022-05-14

### 🚀 **Major Release**

- **WebSocket Integration** - Real-time live reload
- **Local IP Support** - Network accessibility
- **Status Bar Controls** - Hide/show status bar button
- **SPA Support** - Single Page Application support

## [3.2.1] - 2022-02-17

### 🐛 **Bug Fixes**

- Fixed command not found errors
- Documentation updates

## [3.2.0] - 2022-02-09

### ✨ **New Features**

- **Mount Settings** - Directory mounting support

## [3.1.0] - 2022-01-24

### ✨ **New Features**

- **CORS Support** - Cross-origin resource sharing
- **Full Reload Settings** - Configurable reload behavior
- **Delay Settings** - Customizable reload delay

## [3.0.2] - 2021-12-19

### 🔧 **Improvements**

- **macOS Keybindings** - Better macOS support

## [3.0.1] - 2021-12-17

### 🐛 **Bug Fixes**

- Fixed browser command line settings
- Fixed Chrome debugging attachment

## [3.0.0] - 2021-10-23

### 🚀 **Major Release**

- **Web Extension Support** - Dynamic page support
- **HTTPS Support** - Secure connections
- **Proxy Support** - Request routing

## [2.2.1] - 2021-10-07

### 🐛 **Bug Fixes**

- Fixed CPU overload issues
- Status bar improvements

## [2.2.0] - 2021-10-02

### ✨ **New Features**

- **Private Mode Support** - Browser private modes
- **SVG Support** - Native SVG file support
- **Custom Hostname** - Configurable host settings

## [2.1.1] - 2021-09-11

### 🔧 **Improvements**

- **Warning Messages** - Configurable warning notifications

## [2.1.0] - 2021-09-10

### ✨ **New Features**

- **Live Reload Tags** - Support for custom HTML tags
- **Warning Prompts** - Better user feedback

## [2.0.0] - 2021-08-27

### 🚀 **Major Release**

- **Context Menu Support** - Right-click integration
- **Console Improvements** - Better logging
- **Bug Fixes** - Various stability improvements

## [1.6.11] - 2021-08-20

### 🐛 **Bug Fixes**

- Fixed Linux browser launch issues

## [1.6.10] - 2021-08-19

### 🐛 **Bug Fixes**

- Fixed Linux compatibility issues
- Fixed ignore files functionality

## [1.6.9] - 2021-08-15

### ✨ **New Features**

- **Info Message Control** - Disable info popups
- **Server Reuse** - Reuse existing server instances

## [1.6.8] - 2021-08-04

### ✨ **New Features**

- **Ignore Files Settings** - File exclusion configuration

## [1.6.7] - 2021-07-30

### ✨ **New Features**

- **No Browser Option** - Start server without opening browser

## [1.6.6] - 2021-07-28

### ✨ **New Features**

- **Remote Access** - Mobile device connectivity
- **HTM Support** - Additional file format support

## [1.6.5] - 2021-07-26

### 🐛 **Bug Fixes**

- Fixed macOS and Linux compatibility issues

## [1.6.4] - 2021-07-26

### 🐛 **Bug Fixes**

- Fixed critical macOS and Linux issues

## [1.6.3] - 2021-07-24

### 🔧 **Improvements**

- **Port Validation** - Better port range checking

## [1.6.2] - 2021-07-22

### 🐛 **Bug Fixes**

- Fixed port availability error handling

## [1.6.1] - 2021-07-20

### 🐛 **Bug Fixes**

- Fixed browser launch issues

## [1.6.0] - 2021-07-19

### ✨ **New Features**

- **Advanced Browser Settings** - Custom browser command line
- **Microsoft Edge Support** - Added Edge browser support

## [1.5.0] - 2021-07-17

### ✨ **New Features**

- **Chrome Debugging** - Integrated debugging support

## [1.4.4] - 2021-07-12

### 🔧 **Improvements**

- **Settings Validation** - Better configuration validation
- **Package Optimization** - Reduced package size

## [1.4.3] - 2021-07-10

### ✨ **New Features**

- **Status Bar Icon** - Visual status indicator

## [1.4.2] - 2021-07-08

### 🐛 **Bug Fixes**

- Fixed custom browser settings

## [1.4.1] - 2021-07-07

### 🐛 **Bug Fixes**

- Minor bug fixes and improvements

## [1.4.0] - 2021-07-04

### ✨ **New Features**

- **Root Directory Settings** - Custom server root configuration
- **Custom Browser Settings** - Browser selection options

## [1.3.1] - 2021-07-03

### 🐛 **Bug Fixes**

- Fixed file extension detection issues

## [1.3.0] - 2021-07-02

### ✨ **New Features**

- **Smart Status Bar** - Context-aware status bar button

## [1.2.0] - 2021-06-30

### ✨ **New Features**

- **Custom Port Settings** - Configurable server port

## [1.1.1] - 2021-06-30

### 🔧 **Improvements**

- **Keyboard Shortcuts** - Improved keyboard navigation

## [1.1.0] - 2021-06-30

### ✨ **New Features**

- **Context Menu Integration** - Right-click file options
- **Keyboard Shortcuts** - Quick server control

## [1.0.0] - 2021-06-29

### 🚀 **Initial Release**

- **Basic Live Server** - Core functionality
- **Live Reload** - Automatic browser refresh
- **Simple Configuration** - Easy setup and use

## [0.2.0] - 2021-06-28

### 🔧 **Improvements**

- **Status Bar Integration** - Visual controls
- **User Experience** - Enhanced interface

## [0.1.0] - 2021-06-28

### 🚀 **Pre-Release**

- **Core Development** - Initial development features

## [0.0.2] - 2021-06-28

### ✨ **New Features**

- **Extension Icon** - Visual identity
- **Description** - Extension description

## [0.0.1] - 2021-06-28

### 🚀 **Initial Development Release**

- **Basic Functionality** - Initial implementation

---

## Migration Guide

### From Live Server to TBX Live Server

1. **Backup Settings** - Export your current Live Server settings
2. **Install TBX Live Server** - Install from VS Code Marketplace
3. **Import Settings** - Your existing settings will be automatically migrated
4. **Explore New Features** - Try the new webview preview functionality

### Breaking Changes

- **Version 6.0.0**: Complete rebrand and architecture changes
- **Version 5.0.0**: Multi-root workspace support changes
- **Version 3.0.0**: Web extension support introduced

---

**Full commit history**: [View on GitHub](https://github.com/TheMailmans/vscode-inline-live-server/commits/main)
