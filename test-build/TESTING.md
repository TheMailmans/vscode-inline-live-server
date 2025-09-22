# Inline Live Server v6.0.0 - Testing Guide

## 📋 Test Overview

This document provides comprehensive testing procedures for Inline Live Server v6.0.0. Follow these tests to ensure the extension is functioning correctly after installation.

## 🏗️ Test Environment Setup

### Prerequisites
- **VS Code**: 1.74.0 or higher
- **Extension**: Inline Live Server v6.0.0 installed
- **Test Files**: HTML, CSS, and JavaScript files for testing
- **Network**: Localhost access (127.0.0.1)

### Test Project Structure
Create a test directory with the following structure:
```
test-project/
├── index.html
├── styles.css
├── script.js
└── assets/
    └── test-image.png
```

## 🧪 Core Functionality Tests

### Test 1: Basic Installation Verification
**Objective:** Verify extension is properly installed and accessible

**Steps:**
1. Open VS Code
2. Go to Extensions panel (`Ctrl+Shift+X`)
3. Search for "Inline Live Server"
4. Verify version 6.0.0 is installed and enabled
5. Check for any error notifications

**Expected Results:**
- ✅ Extension appears in installed extensions
- ✅ No error messages in VS Code
- ✅ Extension status shows "Enabled"

**Pass/Fail:** [ ]

### Test 2: Live Server Startup
**Objective:** Test basic server functionality

**Steps:**
1. Create or open an HTML file
2. Click "Go Live" button in status bar
3. Verify server starts on port 5500 (or configured port)
4. Check browser opens automatically
5. Verify live reload functionality

**Expected Results:**
- ✅ Server starts without errors
- ✅ Browser opens with correct URL
- ✅ Page loads successfully
- ✅ Live reload works on file changes

**Pass/Fail:** [ ]

### Test 3: Webview Preview
**Objective:** Test integrated webview functionality

**Steps:**
1. Open an HTML file
2. Press `Alt+L, Alt+W` (Windows/Linux) or `Cmd+L, Cmd+W` (Mac)
3. Verify webview panel opens
4. Test navigation controls (back, forward, refresh)
5. Test zoom controls
6. Test split view toggle

**Expected Results:**
- ✅ Webview panel opens successfully
- ✅ Navigation controls work properly
- ✅ Zoom controls function correctly
- ✅ Split view toggles without issues
- ✅ Content updates on file changes

**Pass/Fail:** [ ]

### Test 4: Multi-Browser Support
**Objective:** Test browser compatibility

**Steps:**
1. Configure different browsers in settings
2. Test with Chrome
3. Test with Firefox
4. Test with Edge
5. Verify live reload works in all browsers

**Expected Results:**
- ✅ All browsers open correctly
- ✅ Live reload functions in each browser
- ✅ No browser-specific errors
- ✅ Consistent behavior across browsers

**Pass/Fail:** [ ]

## 🔧 Advanced Feature Tests

### Test 5: Chrome Debugging Integration
**Objective:** Test debugging capabilities

**Steps:**
1. Enable Chrome debugging in settings:
   ```json
   {
     "liveServer.settings.ChromeDebuggingAttachment": true
   }
   ```
2. Start Live Server
3. Open Chrome DevTools
4. Set breakpoints in your code
5. Test debugging functionality

**Expected Results:**
- ✅ Chrome debugging attachment works
- ✅ Breakpoints are hit correctly
- ✅ Variables can be inspected
- ✅ Step debugging functions properly

**Pass/Fail:** [ ]

### Test 6: Mobile Device Testing
**Objective:** Test mobile accessibility

**Steps:**
1. Start Live Server
2. Find your computer's IP address
3. Access server from mobile device: `http://YOUR_IP:5500`
4. Test live reload from mobile
5. Test responsive design features

**Expected Results:**
- ✅ Mobile device can access server
- ✅ Live reload works from mobile
- ✅ Responsive design functions correctly
- ✅ No mobile-specific errors

**Pass/Fail:** [ ]

### Test 7: HTTPS Support
**Objective:** Test secure server functionality

**Steps:**
1. Configure HTTPS in settings:
   ```json
   {
     "liveServer.settings.https": {
       "enable": true,
       "cert": "/path/to/cert.pem",
       "key": "/path/to/key.pem"
     }
   }
   ```
2. Start server with HTTPS
3. Verify secure connection
4. Test live reload over HTTPS

**Expected Results:**
- ✅ HTTPS server starts successfully
- ✅ Secure connection is established
- ✅ Live reload works over HTTPS
- ✅ No certificate errors

**Pass/Fail:** [ ]

### Test 8: Multi-Root Workspace Support
**Objective:** Test workspace functionality

**Steps:**
1. Open multi-root workspace
2. Test server in different workspace folders
3. Verify workspace switching
4. Test file operations across workspaces

**Expected Results:**
- ✅ Server works in different workspace roots
- ✅ Workspace switching functions correctly
- ✅ File operations work across workspaces
- ✅ No workspace-related conflicts

**Pass/Fail:** [ ]

## 🎯 Configuration Testing

### Test 9: Custom Port Configuration
**Objective:** Test port customization

**Steps:**
1. Set custom port in settings:
   ```json
   {
     "liveServer.settings.port": 8080
   }
   ```
2. Start server
3. Verify server runs on port 8080
4. Test random port assignment (port: 0)

**Expected Results:**
- ✅ Server starts on specified port
- ✅ Random port assignment works
- ✅ Port conflicts are handled gracefully
- ✅ No firewall blocking issues

**Pass/Fail:** [ ]

### Test 10: File Ignoring
**Objective:** Test file exclusion functionality

**Steps:**
1. Configure file ignoring:
   ```json
   {
     "liveServer.settings.ignoreFiles": [
       ".vscode/**",
       "**/*.scss",
       "**/*.ts",
       "node_modules/**"
     ]
   }
   ```
2. Create files matching ignore patterns
3. Modify ignored files
4. Verify they don't trigger reload

**Expected Results:**
- ✅ Ignored files don't trigger reload
- ✅ Non-ignored files still trigger reload
- ✅ Pattern matching works correctly
- ✅ No performance impact from ignored files

**Pass/Fail:** [ ]

## 🐛 Error Recovery Tests

### Test 11: Server Recovery
**Objective:** Test error handling and recovery

**Steps:**
1. Start server
2. Simulate port conflict
3. Test automatic recovery
4. Verify error messages
5. Test manual restart functionality

**Expected Results:**
- ✅ Graceful handling of port conflicts
- ✅ Clear error messages displayed
- ✅ Automatic recovery when possible
- ✅ Manual restart works correctly

**Pass/Fail:** [ ]

### Test 12: Webview Error Handling
**Objective:** Test webview robustness

**Steps:**
1. Open webview panel
2. Navigate to invalid URLs
3. Test with broken HTML/CSS/JS
4. Verify error boundaries
5. Test recovery mechanisms

**Expected Results:**
- ✅ Invalid URLs handled gracefully
- ✅ Broken code doesn't crash webview
- ✅ Error messages are informative
- ✅ Recovery mechanisms work
- ✅ No memory leaks from errors

**Pass/Fail:** [ ]

## 📊 Performance Tests

### Test 13: Memory Usage
**Objective:** Monitor resource consumption

**Steps:**
1. Start server and webview
2. Monitor VS Code memory usage
3. Open multiple panels
4. Test with large files
5. Monitor over extended period

**Expected Results:**
- ✅ Memory usage stays reasonable (<100MB)
- ✅ No memory leaks detected
- ✅ Multiple panels don't cause excessive usage
- ✅ Large files handled efficiently

**Pass/Fail:** [ ]

### Test 14: Load Time Testing
**Objective:** Measure startup performance

**Steps:**
1. Measure extension activation time
2. Time server startup
3. Measure webview opening time
4. Test with different file sizes
5. Monitor network response times

**Expected Results:**
- ✅ Extension activates in <2 seconds
- ✅ Server starts in <1 second
- ✅ Webview opens in <0.5 seconds
- ✅ Performance consistent across file sizes

**Pass/Fail:** [ ]

## 🔍 Webpack Build Verification

### Test 15: Build Integrity
**Objective:** Verify webpack fixes are working

**Steps:**
1. Check extension loads without errors
2. Verify all dependencies are resolved
3. Test native module handling
4. Verify source maps work
5. Check bundle analysis output

**Expected Results:**
- ✅ No webpack-related errors
- ✅ All native modules handled correctly
- ✅ Source maps function properly
- ✅ Bundle analysis generates correctly
- ✅ No dynamic require issues

**Pass/Fail:** [ ]

## 📝 Test Documentation

### Manual Test Results
Record your test results in the table below:

| Test # | Test Name | Status | Notes |
|--------|-----------|--------|-------|
| 1 | Installation Verification | [ ] | |
| 2 | Live Server Startup | [ ] | |
| 3 | Webview Preview | [ ] | |
| 4 | Multi-Browser Support | [ ] | |
| 5 | Chrome Debugging | [ ] | |
| 6 | Mobile Testing | [ ] | |
| 7 | HTTPS Support | [ ] | |
| 8 | Multi-Root Workspace | [ ] | |
| 9 | Custom Port Configuration | [ ] | |
| 10 | File Ignoring | [ ] | |
| 11 | Server Recovery | [ ] | |
| 12 | Webview Error Handling | [ ] | |
| 13 | Memory Usage | [ ] | |
| 14 | Load Time Testing | [ ] | |
| 15 | Build Integrity | [ ] | |

### Automated Test Suite
Run the included test suite:
```bash
# Unit tests
npm run test:unit

# End-to-end tests
npm run test:e2e

# Smoke tests
npm run test
```

## 🚨 Known Issues & Limitations

### Current Limitations
- **Large Files**: Files >10MB may cause performance issues
- **Network Restrictions**: Firewall rules may block server access
- **Browser Extensions**: Some browser extensions may interfere
- **Antivirus Software**: May flag development server as suspicious

### Workarounds
- Use file ignoring for large assets
- Configure firewall exceptions for development ports
- Temporarily disable conflicting browser extensions
- Add development server to antivirus exclusions

## 📊 Test Report Template

Use this template for reporting test results:

```
Inline Live Server v6.0.0 - Test Report
=====================================

Environment:
- VS Code Version: [version]
- OS: [Windows/macOS/Linux]
- Extension Version: 6.0.0
- Test Date: [date]

Test Results:
- Passed: [count]/15
- Failed: [count]/15
- Blocked: [count]/15

Issues Found:
1. [Issue description]
   - Steps to reproduce
   - Expected vs actual behavior
   - Severity: [Low/Medium/High]

Recommendations:
- [Suggested fixes or improvements]
```

## 🎯 Testing Checklist

- [ ] All core functionality tests completed
- [ ] Advanced features tested
- [ ] Configuration options verified
- [ ] Error scenarios tested
- [ ] Performance benchmarks met
- [ ] Cross-platform compatibility confirmed
- [ ] Documentation updated with findings
- [ ] Test report generated and filed

---

**Testing completed on:** __________
**Tester:** __________
**Overall Status:** ✅ PASS / ❌ FAIL