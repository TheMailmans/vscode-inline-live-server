import { test } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

test.describe.serial('Marketplace Listing Screenshots', () => {
  const screenshotDir = path.resolve(__dirname, '../../images/Screenshot');
  const testWorkspace = path.resolve(__dirname, '../../test-workspace');

  test.beforeAll(async () => {
    // Ensure directories exist
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }
    if (!fs.existsSync(testWorkspace)) {
      fs.mkdirSync(testWorkspace, { recursive: true });
    }

    // Clean old marketplace screenshots
    const marketplaceFiles = ['hero-preview.png', 'multi-server-dropdown.png', 'status-bar.png', 'command-palette.png'];
    marketplaceFiles.forEach(filename => {
      const filePath = path.join(screenshotDir, filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    });
  });

  const takeMarketplaceScreenshot = async (page: any, filename: string) => {
    await page.waitForTimeout(2000); // Allow time for rendering
    await page.screenshot({
      path: path.join(screenshotDir, filename),
      fullPage: true
    });
    console.log(`📸 Marketplace screenshot saved: ${filename}`);
  };

  test('Hero Screenshot - Inline Preview + Code', async ({ page }) => {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VS Code - Inline Live Server</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #1e1e1e;
            color: #cccccc;
            overflow: hidden;
            height: 100vh;
        }

        /* VS Code Title Bar */
        .title-bar {
            height: 30px;
            background: #323233;
            display: flex;
            align-items: center;
            padding: 0 10px;
            border-bottom: 1px solid #2d2d30;
        }
        .title-bar .controls {
            margin-left: auto;
            display: flex;
            gap: 10px;
        }
        .title-bar .control { width: 12px; height: 12px; border-radius: 50%; }
        .control.close { background: #ff5f57; }
        .control.minimize { background: #ffbd2e; }
        .control.maximize { background: #28ca42; }

        /* Main Layout */
        .vscode-layout {
            display: flex;
            height: calc(100vh - 52px); /* Account for title bar and status bar */
        }

        /* Activity Bar */
        .activity-bar {
            width: 48px;
            background: #333333;
            border-right: 1px solid #2d2d30;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 10px 0;
        }
        .activity-icon {
            width: 32px;
            height: 32px;
            margin: 8px 0;
            background: #007acc;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 16px;
        }

        /* Sidebar */
        .sidebar {
            width: 300px;
            background: #252526;
            border-right: 1px solid #2d2d30;
            display: flex;
            flex-direction: column;
        }
        .sidebar-header {
            padding: 10px 15px;
            font-size: 11px;
            font-weight: bold;
            text-transform: uppercase;
            color: #cccccc;
            background: #2d2d30;
        }
        .file-tree {
            flex: 1;
            padding: 5px 0;
        }
        .file-item {
            padding: 4px 20px;
            font-size: 13px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 6px;
        }
        .file-item:hover { background: #2a2d2e; }
        .file-item.active { background: #094771; }
        .file-icon { width: 16px; height: 16px; }

        /* Main Editor Area */
        .editor-area {
            flex: 1;
            display: flex;
            flex-direction: column;
        }

        /* Tab Bar */
        .tab-bar {
            height: 35px;
            background: #2d2d30;
            border-bottom: 1px solid #2d2d30;
            display: flex;
            align-items: center;
        }
        .tab {
            height: 35px;
            padding: 0 15px;
            background: #1e1e1e;
            border-right: 1px solid #2d2d30;
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 13px;
            cursor: pointer;
        }
        .tab.active { background: #1e1e1e; }
        .tab-close { width: 16px; height: 16px; opacity: 0.6; }
        .tab-close:hover { opacity: 1; }

        /* Split View */
        .editor-split {
            flex: 1;
            display: flex;
        }

        /* Code Editor */
        .code-editor {
            flex: 1;
            background: #1e1e1e;
            padding: 20px;
            font-family: 'Consolas', 'Monaco', monospace;
            font-size: 14px;
            line-height: 1.5;
            overflow-y: auto;
        }
        .line-numbers {
            color: #858585;
            margin-right: 20px;
            user-select: none;
            width: 30px;
            display: inline-block;
            text-align: right;
        }
        .code-line { margin: 2px 0; }
        .code-tag { color: #569cd6; }
        .code-attr { color: #9cdcfe; }
        .code-string { color: #ce9178; }
        .code-comment { color: #6a9955; }

        /* Webview Panel */
        .webview-panel {
            flex: 1;
            background: #252526;
            border-left: 1px solid #2d2d30;
            display: flex;
            flex-direction: column;
        }

        /* Webview Header */
        .webview-header {
            height: 40px;
            background: #2d2d30;
            border-bottom: 1px solid #3c3c3c;
            display: flex;
            align-items: center;
            padding: 0 15px;
            gap: 10px;
        }
        .webview-title {
            font-size: 13px;
            font-weight: bold;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .brain-icon {
            width: 16px;
            height: 16px;
            background: #007acc;
            border-radius: 3px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 10px;
        }

        /* Server Dropdown */
        .server-dropdown {
            position: relative;
            margin-left: auto;
        }
        .dropdown-button {
            background: #0e639c;
            color: white;
            border: none;
            padding: 6px 12px;
            border-radius: 3px;
            font-size: 12px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 6px;
        }
        .dropdown-content {
            position: absolute;
            top: 100%;
            right: 0;
            background: #3c3c3c;
            min-width: 280px;
            border-radius: 4px;
            border: 1px solid #464647;
            box-shadow: 0 4px 12px rgba(0,0,0,0.4);
            z-index: 1000;
            margin-top: 2px;
        }
        .dropdown-item {
            padding: 10px 15px;
            border-bottom: 1px solid #464647;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 12px;
        }
        .dropdown-item:hover { background: #094771; }
        .dropdown-item:last-child { border-bottom: none; }
        .server-status {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #4CAF50;
        }

        /* Webview Content */
        .webview-content {
            flex: 1;
            background: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: Arial, sans-serif;
            color: #333;
        }
        .preview-content {
            text-align: center;
            padding: 40px;
        }
        .preview-content h1 {
            color: #2c3e50;
            margin-bottom: 20px;
            font-size: 2.5em;
        }
        .preview-content p {
            color: #7f8c8d;
            font-size: 1.2em;
            margin-bottom: 30px;
        }
        .feature-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            max-width: 600px;
        }
        .feature-card {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #007acc;
        }

        /* Status Bar */
        .status-bar {
            height: 22px;
            background: #007acc;
            display: flex;
            align-items: center;
            padding: 0 15px;
            font-size: 12px;
            color: white;
            gap: 20px;
        }
        .status-item {
            display: flex;
            align-items: center;
            gap: 5px;
        }
        .status-icon {
            width: 16px;
            height: 16px;
            background: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #007acc;
            font-size: 10px;
        }
    </style>
</head>
<body>
    <div class="title-bar">
        <span style="font-size: 12px;">VS Code - Inline Live Server Demo</span>
        <div class="controls">
            <div class="control minimize"></div>
            <div class="control maximize"></div>
            <div class="control close"></div>
        </div>
    </div>

    <div class="vscode-layout">
        <div class="activity-bar">
            <div class="activity-icon">📁</div>
            <div class="activity-icon">🔍</div>
            <div class="activity-icon">🌿</div>
            <div class="activity-icon">🐛</div>
        </div>

        <div class="sidebar">
            <div class="sidebar-header">Explorer</div>
            <div class="file-tree">
                <div class="file-item">
                    <span class="file-icon">📁</span>
                    <span>portfolio-site</span>
                </div>
                <div class="file-item active" style="padding-left: 35px;">
                    <span class="file-icon">📄</span>
                    <span>index.html</span>
                </div>
                <div class="file-item" style="padding-left: 35px;">
                    <span class="file-icon">🎨</span>
                    <span>styles.css</span>
                </div>
                <div class="file-item" style="padding-left: 35px;">
                    <span class="file-icon">⚡</span>
                    <span>script.js</span>
                </div>
                <div class="file-item">
                    <span class="file-icon">📁</span>
                    <span>dashboard-app</span>
                </div>
                <div class="file-item" style="padding-left: 35px;">
                    <span class="file-icon">📄</span>
                    <span>index.html</span>
                </div>
            </div>
        </div>

        <div class="editor-area">
            <div class="tab-bar">
                <div class="tab active">
                    <span>📄</span>
                    <span>index.html</span>
                    <span class="tab-close">×</span>
                </div>
                <div class="tab">
                    <span>🎨</span>
                    <span>styles.css</span>
                    <span class="tab-close">×</span>
                </div>
            </div>

            <div class="editor-split">
                <div class="code-editor">
                    <div class="code-line">
                        <span class="line-numbers">1</span>
                        <span class="code-comment">&lt;!-- Portfolio Site - Live Preview Demo --&gt;</span>
                    </div>
                    <div class="code-line">
                        <span class="line-numbers">2</span>
                        <span class="code-tag">&lt;!DOCTYPE</span> <span class="code-attr">html</span><span class="code-tag">&gt;</span>
                    </div>
                    <div class="code-line">
                        <span class="line-numbers">3</span>
                        <span class="code-tag">&lt;html</span> <span class="code-attr">lang</span>=<span class="code-string">"en"</span><span class="code-tag">&gt;</span>
                    </div>
                    <div class="code-line">
                        <span class="line-numbers">4</span>
                        <span class="code-tag">&lt;head&gt;</span>
                    </div>
                    <div class="code-line">
                        <span class="line-numbers">5</span>
                        <span style="margin-left: 20px;"><span class="code-tag">&lt;meta</span> <span class="code-attr">charset</span>=<span class="code-string">"UTF-8"</span><span class="code-tag">&gt;</span></span>
                    </div>
                    <div class="code-line">
                        <span class="line-numbers">6</span>
                        <span style="margin-left: 20px;"><span class="code-tag">&lt;meta</span> <span class="code-attr">name</span>=<span class="code-string">"viewport"</span> <span class="code-attr">content</span>=<span class="code-string">"width=device-width, initial-scale=1.0"</span><span class="code-tag">&gt;</span></span>
                    </div>
                    <div class="code-line">
                        <span class="line-numbers">7</span>
                        <span style="margin-left: 20px;"><span class="code-tag">&lt;title&gt;</span>My Portfolio<span class="code-tag">&lt;/title&gt;</span></span>
                    </div>
                    <div class="code-line">
                        <span class="line-numbers">8</span>
                        <span style="margin-left: 20px;"><span class="code-tag">&lt;link</span> <span class="code-attr">rel</span>=<span class="code-string">"stylesheet"</span> <span class="code-attr">href</span>=<span class="code-string">"styles.css"</span><span class="code-tag">&gt;</span></span>
                    </div>
                    <div class="code-line">
                        <span class="line-numbers">9</span>
                        <span class="code-tag">&lt;/head&gt;</span>
                    </div>
                    <div class="code-line">
                        <span class="line-numbers">10</span>
                        <span class="code-tag">&lt;body&gt;</span>
                    </div>
                    <div class="code-line">
                        <span class="line-numbers">11</span>
                        <span style="margin-left: 20px;"><span class="code-tag">&lt;header&gt;</span></span>
                    </div>
                    <div class="code-line">
                        <span class="line-numbers">12</span>
                        <span style="margin-left: 40px;"><span class="code-tag">&lt;h1&gt;</span>Welcome to My Portfolio<span class="code-tag">&lt;/h1&gt;</span></span>
                    </div>
                    <div class="code-line">
                        <span class="line-numbers">13</span>
                        <span style="margin-left: 40px;"><span class="code-tag">&lt;p&gt;</span>Showcasing my web development projects<span class="code-tag">&lt;/p&gt;</span></span>
                    </div>
                    <div class="code-line">
                        <span class="line-numbers">14</span>
                        <span style="margin-left: 20px;"><span class="code-tag">&lt;/header&gt;</span></span>
                    </div>
                    <div class="code-line">
                        <span class="line-numbers">15</span>
                        <span style="margin-left: 20px;"><span class="code-tag">&lt;main&gt;</span></span>
                    </div>
                    <div class="code-line">
                        <span class="line-numbers">16</span>
                        <span style="margin-left: 40px;"><span class="code-comment">&lt;!-- Portfolio content --&gt;</span></span>
                    </div>
                </div>

                <div class="webview-panel">
                    <div class="webview-header">
                        <div class="webview-title">
                            <div class="brain-icon">🧠</div>
                            <span>Inline Live Server</span>
                        </div>
                        <div class="server-dropdown">
                            <button class="dropdown-button">
                                Portfolio (5500) ▼
                            </button>
                            <div class="dropdown-content">
                                <div class="dropdown-item">
                                    <div class="server-status"></div>
                                    <div>
                                        <div><strong>Portfolio Site</strong></div>
                                        <div style="font-size: 10px; color: #999;">Port 5500 • http://localhost:5500</div>
                                    </div>
                                </div>
                                <div class="dropdown-item">
                                    <div class="server-status"></div>
                                    <div>
                                        <div><strong>Dashboard App</strong></div>
                                        <div style="font-size: 10px; color: #999;">Port 5501 • http://localhost:5501</div>
                                    </div>
                                </div>
                                <div class="dropdown-item" style="border-top: 1px solid #464647;">
                                    <div style="width: 8px; height: 8px; border-radius: 50%; background: #666;"></div>
                                    <div>
                                        <div><strong>+ Start New Server</strong></div>
                                        <div style="font-size: 10px; color: #999;">Create new live server instance</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="webview-content">
                        <div class="preview-content">
                            <h1>Welcome to My Portfolio</h1>
                            <p>Showcasing my web development projects</p>
                            <div class="feature-grid">
                                <div class="feature-card">
                                    <h3>🚀 Live Updates</h3>
                                    <p>See changes instantly</p>
                                </div>
                                <div class="feature-card">
                                    <h3>📱 Responsive</h3>
                                    <p>Mobile-first design</p>
                                </div>
                                <div class="feature-card">
                                    <h3>⚡ Fast Loading</h3>
                                    <p>Optimized performance</p>
                                </div>
                                <div class="feature-card">
                                    <h3>🎨 Modern UI</h3>
                                    <p>Clean and professional</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="status-bar">
        <div class="status-item">
            <div class="status-icon">⚡</div>
            <span>Inline Live Server (2)</span>
        </div>
        <div class="status-item">
            <span>Ln 12, Col 45</span>
        </div>
        <div class="status-item">
            <span>HTML</span>
        </div>
        <div class="status-item" style="margin-left: auto;">
            <span>Server started on port 5500</span>
        </div>
    </div>
</body>
</html>`;

    await page.setContent(html);
    await takeMarketplaceScreenshot(page, 'hero-preview.png');
  });

  test('Multi-Server Management Panel', async ({ page }) => {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VS Code - Multi-Server Management</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #1e1e1e;
            color: #cccccc;
            overflow: hidden;
            height: 100vh;
        }

        /* Focus on webview panel header area */
        .webview-panel {
            width: 100%;
            height: 100vh;
            background: #252526;
            display: flex;
            flex-direction: column;
        }

        /* Webview Header with controls */
        .webview-header {
            height: 50px;
            background: #2d2d30;
            border-bottom: 1px solid #3c3c3c;
            display: flex;
            align-items: center;
            padding: 0 20px;
            gap: 15px;
        }
        .webview-title {
            font-size: 14px;
            font-weight: bold;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .brain-icon {
            width: 20px;
            height: 20px;
            background: #007acc;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 12px;
        }

        /* Server Controls */
        .server-controls {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-left: 20px;
        }
        .control-btn {
            background: #0e639c;
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 4px;
            font-size: 12px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 6px;
        }
        .control-btn:hover { background: #1177bb; }
        .control-btn.stop { background: #d32f2f; }
        .control-btn.stop:hover { background: #f44336; }
        .control-btn.refresh { background: #388e3c; }
        .control-btn.refresh:hover { background: #4caf50; }

        /* Server Dropdown */
        .server-dropdown {
            position: relative;
            margin-left: auto;
        }
        .dropdown-button {
            background: #0e639c;
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 4px;
            font-size: 12px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 8px;
            min-width: 200px;
            justify-content: space-between;
        }
        .dropdown-content {
            position: absolute;
            top: 100%;
            right: 0;
            background: #3c3c3c;
            min-width: 320px;
            border-radius: 6px;
            border: 1px solid #464647;
            box-shadow: 0 8px 24px rgba(0,0,0,0.4);
            z-index: 1000;
            margin-top: 4px;
        }
        .dropdown-header {
            padding: 12px 16px;
            border-bottom: 1px solid #464647;
            font-weight: bold;
            font-size: 11px;
            color: #cccccc;
            background: #2d2d30;
            text-transform: uppercase;
        }
        .dropdown-item {
            padding: 12px 16px;
            border-bottom: 1px solid #464647;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 13px;
        }
        .dropdown-item:hover { background: #094771; }
        .dropdown-item:last-child { border-bottom: none; }
        .server-status {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: #4CAF50;
            flex-shrink: 0;
        }
        .server-info {
            flex: 1;
        }
        .server-name {
            font-weight: bold;
            margin-bottom: 3px;
        }
        .server-details {
            font-size: 11px;
            color: #999;
        }

        /* Status Text */
        .status-text {
            background: #1e1e1e;
            padding: 15px 20px;
            border-bottom: 1px solid #3c3c3c;
            font-size: 13px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .status-icon {
            width: 16px;
            height: 16px;
            background: #4CAF50;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 10px;
        }

        /* Quick Pick Dialog */
        .quick-pick-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.4);
            display: flex;
            align-items: flex-start;
            justify-content: center;
            padding-top: 100px;
            z-index: 2000;
        }
        .quick-pick {
            background: #252526;
            border: 1px solid #464647;
            border-radius: 6px;
            min-width: 500px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.6);
        }
        .quick-pick-header {
            padding: 15px 20px;
            border-bottom: 1px solid #3c3c3c;
            font-size: 13px;
            font-weight: bold;
        }
        .quick-pick-item {
            padding: 12px 20px;
            border-bottom: 1px solid #3c3c3c;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 13px;
        }
        .quick-pick-item:hover { background: #094771; }
        .quick-pick-item:last-child { border-bottom: none; }
        .quick-pick-icon {
            width: 16px;
            height: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        /* Content area */
        .webview-content {
            flex: 1;
            background: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: Arial, sans-serif;
            color: #666;
            font-size: 18px;
        }
    </style>
</head>
<body>
    <div class="webview-panel">
        <div class="webview-header">
            <div class="webview-title">
                <div class="brain-icon">🧠</div>
                <span>Inline Live Server</span>
            </div>

            <div class="server-controls">
                <button class="control-btn">
                    ▶️ Start
                </button>
                <button class="control-btn stop">
                    ⏹️ Stop
                </button>
                <button class="control-btn refresh">
                    🔄 Refresh
                </button>
                <button class="control-btn">
                    🌐 Open
                </button>
            </div>

            <div class="server-dropdown">
                <button class="dropdown-button">
                    <span>Portfolio (5500)</span>
                    <span>▼</span>
                </button>
                <div class="dropdown-content">
                    <div class="dropdown-header">
                        Active Servers (2)
                    </div>
                    <div class="dropdown-item">
                        <div class="server-status"></div>
                        <div class="server-info">
                            <div class="server-name">🎨 Portfolio Site</div>
                            <div class="server-details">Port 5500 • http://localhost:5500 • /portfolio</div>
                        </div>
                    </div>
                    <div class="dropdown-item">
                        <div class="server-status"></div>
                        <div class="server-info">
                            <div class="server-name">📊 Dashboard App</div>
                            <div class="server-details">Port 5501 • http://localhost:5501 • /dashboard</div>
                        </div>
                    </div>
                    <div class="dropdown-item" style="border-top: 1px solid #464647; margin-top: 5px;">
                        <div style="width: 10px; height: 10px; border-radius: 50%; background: #666; flex-shrink: 0;"></div>
                        <div class="server-info">
                            <div class="server-name">➕ Start New Server</div>
                            <div class="server-details">Create a new live server instance</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="status-text">
            <div class="status-icon">✓</div>
            <span><strong>Server running at</strong> http://127.0.0.1:5500</span>
            <span style="margin-left: auto; color: #999;">Uptime: 00:15:32</span>
        </div>

        <div class="webview-content">
            Live preview content loads here...
        </div>

        <!-- Stop Confirmation Quick Pick -->
        <div class="quick-pick-overlay">
            <div class="quick-pick">
                <div class="quick-pick-header">
                    Stop Server - Multiple servers are running
                </div>
                <div class="quick-pick-item">
                    <div class="quick-pick-icon">🎨</div>
                    <div>
                        <div><strong>Stop Portfolio Server (Port 5500)</strong></div>
                        <div style="font-size: 11px; color: #999;">Keep Dashboard Server running</div>
                    </div>
                </div>
                <div class="quick-pick-item">
                    <div class="quick-pick-icon">📊</div>
                    <div>
                        <div><strong>Stop Dashboard Server (Port 5501)</strong></div>
                        <div style="font-size: 11px; color: #999;">Keep Portfolio Server running</div>
                    </div>
                </div>
                <div class="quick-pick-item">
                    <div class="quick-pick-icon">⏹️</div>
                    <div>
                        <div><strong>Stop All Servers</strong></div>
                        <div style="font-size: 11px; color: #999;">Stop all running live server instances</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`;

    await page.setContent(html);
    await takeMarketplaceScreenshot(page, 'multi-server-dropdown.png');
  });

  test('Status Bar Toggle Detail', async ({ page }) => {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VS Code - Status Bar Detail</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #1e1e1e;
            color: #cccccc;
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 40px;
        }

        .status-bar-demo {
            width: 100%;
            max-width: 1200px;
            background: #252526;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }

        .demo-label {
            padding: 15px 20px;
            background: #2d2d30;
            font-size: 14px;
            font-weight: bold;
            border-bottom: 1px solid #3c3c3c;
        }

        /* Status Bar with Multiple Servers */
        .status-bar {
            height: 24px;
            background: #007acc;
            display: flex;
            align-items: center;
            padding: 0 15px;
            font-size: 12px;
            color: white;
            gap: 20px;
        }

        .status-item {
            display: flex;
            align-items: center;
            gap: 6px;
            cursor: pointer;
            padding: 2px 6px;
            border-radius: 3px;
            transition: background-color 0.2s;
        }

        .status-item:hover {
            background: rgba(255,255,255,0.1);
        }

        .status-icon {
            width: 16px;
            height: 16px;
            background: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #007acc;
            font-size: 10px;
            font-weight: bold;
        }

        .server-count {
            background: rgba(255,255,255,0.2);
            padding: 2px 6px;
            border-radius: 10px;
            font-weight: bold;
            margin-left: 4px;
        }

        /* Stopped State */
        .status-bar.stopped {
            background: #6c6c6c;
        }

        .status-bar.stopped .status-icon {
            background: #cccccc;
            color: #6c6c6c;
        }

        .zoom-indicator {
            position: absolute;
            top: 20px;
            right: 20px;
            background: #007acc;
            color: white;
            padding: 8px 12px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: bold;
        }

        .comparison-title {
            font-size: 18px;
            font-weight: bold;
            color: #cccccc;
            text-align: center;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="zoom-indicator">🔍 Status Bar Detail View</div>

    <div class="comparison-title">Multiple Servers Running</div>
    <div class="status-bar-demo">
        <div class="demo-label">Status Bar - 2 Active Servers</div>
        <div class="status-bar">
            <div class="status-item">
                <div class="status-icon">⚡</div>
                <span>Inline Live Server</span>
                <span class="server-count">2</span>
            </div>
            <div class="status-item">
                <span>Ln 15, Col 28</span>
            </div>
            <div class="status-item">
                <span>HTML</span>
            </div>
            <div class="status-item">
                <span>UTF-8</span>
            </div>
            <div class="status-item" style="margin-left: auto;">
                <span>Portfolio: 5500 | Dashboard: 5501</span>
            </div>
            <div class="status-item">
                <span>🔄 Live Reload</span>
            </div>
        </div>
    </div>

    <div class="comparison-title">All Servers Stopped</div>
    <div class="status-bar-demo">
        <div class="demo-label">Status Bar - No Active Servers</div>
        <div class="status-bar stopped">
            <div class="status-item">
                <div class="status-icon">○</div>
                <span>Inline Live Server</span>
            </div>
            <div class="status-item">
                <span>Ln 15, Col 28</span>
            </div>
            <div class="status-item">
                <span>HTML</span>
            </div>
            <div class="status-item">
                <span>UTF-8</span>
            </div>
            <div class="status-item" style="margin-left: auto;">
                <span>Click to start server</span>
            </div>
        </div>
    </div>

    <div style="text-align: center; margin-top: 30px; color: #999; font-size: 14px;">
        <p>💡 Click the status bar item to toggle servers or view server management</p>
    </div>
</body>
</html>`;

    await page.setContent(html);
    await takeMarketplaceScreenshot(page, 'status-bar.png');
  });

  test('Command Palette / Quick Start', async ({ page }) => {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VS Code - Command Palette</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #1e1e1e;
            color: #cccccc;
            height: 100vh;
            overflow: hidden;
        }

        /* VS Code Background */
        .vscode-bg {
            width: 100%;
            height: 100%;
            background: #1e1e1e;
            position: relative;
        }

        /* Command Palette Overlay */
        .command-palette-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.4);
            display: flex;
            align-items: flex-start;
            justify-content: center;
            padding-top: 80px;
        }

        /* Command Palette */
        .command-palette {
            background: #252526;
            border: 1px solid #464647;
            border-radius: 6px;
            width: 600px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.6);
            overflow: hidden;
        }

        /* Search Input */
        .search-input {
            width: 100%;
            background: #3c3c3c;
            border: none;
            padding: 15px 20px;
            font-size: 14px;
            color: #cccccc;
            font-family: inherit;
            border-bottom: 1px solid #464647;
        }
        .search-input::placeholder {
            color: #999;
        }
        .search-input:focus {
            outline: none;
            background: #404040;
        }

        /* Command List */
        .command-list {
            max-height: 400px;
            overflow-y: auto;
        }

        .command-item {
            padding: 12px 20px;
            border-bottom: 1px solid #2d2d30;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 13px;
        }

        .command-item:hover {
            background: #094771;
        }

        .command-item.selected {
            background: #0e639c;
        }

        .command-item:last-child {
            border-bottom: none;
        }

        .command-icon {
            width: 16px;
            height: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }

        .command-info {
            flex: 1;
        }

        .command-name {
            font-weight: bold;
            margin-bottom: 2px;
        }

        .command-description {
            font-size: 11px;
            color: #999;
        }

        .command-keybinding {
            font-size: 11px;
            color: #999;
            background: rgba(255,255,255,0.1);
            padding: 2px 6px;
            border-radius: 3px;
            font-family: 'Consolas', monospace;
        }

        /* Notification Toast */
        .notification {
            position: absolute;
            top: 20px;
            right: 20px;
            background: #0e639c;
            color: white;
            padding: 12px 20px;
            border-radius: 4px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 13px;
            animation: slideIn 0.3s ease-out;
        }

        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        .notification-icon {
            width: 16px;
            height: 16px;
            background: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #0e639c;
            font-size: 10px;
        }

        /* Background Editor Hint */
        .editor-hint {
            position: absolute;
            bottom: 40px;
            left: 50%;
            transform: translateX(-50%);
            color: #666;
            font-size: 12px;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="vscode-bg">
        <div class="command-palette-overlay">
            <div class="command-palette">
                <input type="text" class="search-input" placeholder="Type 'inline live server' to search commands..." value="inline live server">

                <div class="command-list">
                    <div class="command-item selected">
                        <div class="command-icon">🚀</div>
                        <div class="command-info">
                            <div class="command-name">Inline Live Server: Open with Inline Live Server</div>
                            <div class="command-description">Start a new live server and open in webview panel</div>
                        </div>
                        <div class="command-keybinding">Ctrl+Shift+L</div>
                    </div>

                    <div class="command-item">
                        <div class="command-icon">⏹️</div>
                        <div class="command-info">
                            <div class="command-name">Inline Live Server: Stop Inline Live Server</div>
                            <div class="command-description">Stop the currently running live server</div>
                        </div>
                        <div class="command-keybinding">Ctrl+Shift+Q</div>
                    </div>

                    <div class="command-item">
                        <div class="command-icon">🔄</div>
                        <div class="command-info">
                            <div class="command-name">Inline Live Server: Restart Server</div>
                            <div class="command-description">Restart the current live server instance</div>
                        </div>
                    </div>

                    <div class="command-item">
                        <div class="command-icon">🌐</div>
                        <div class="command-info">
                            <div class="command-name">Inline Live Server: Open in Browser</div>
                            <div class="command-description">Open the current server in external browser</div>
                        </div>
                    </div>

                    <div class="command-item">
                        <div class="command-icon">⚙️</div>
                        <div class="command-info">
                            <div class="command-name">Inline Live Server: Change Workspace</div>
                            <div class="command-description">Change the root directory for the live server</div>
                        </div>
                    </div>

                    <div class="command-item">
                        <div class="command-icon">📊</div>
                        <div class="command-info">
                            <div class="command-name">Inline Live Server: Show Server Status</div>
                            <div class="command-description">Display information about running servers</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="notification">
            <div class="notification-icon">✓</div>
            <span><strong>Live Server started</strong> on port 5500</span>
        </div>

        <div class="editor-hint">
            Press Ctrl+Shift+P to open Command Palette • Type commands to quickly access Inline Live Server features
        </div>
    </div>
</body>
</html>`;

    await page.setContent(html);
    await takeMarketplaceScreenshot(page, 'command-palette.png');
  });
});
