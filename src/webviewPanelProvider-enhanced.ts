import * as vscode from 'vscode';
import { WebviewPanelProvider } from './webviewPanelProvider';

export class WebviewPanelProviderEnhanced extends WebviewPanelProvider {
  private enhancedFeatures: Map<string, boolean> = new Map();

  constructor(extensionUri: vscode.Uri) {
    super(extensionUri);
    this.initializeEnhancedFeatures();
  }

  private initializeEnhancedFeatures(): void {
    this.enhancedFeatures.set('splitView', true);
    this.enhancedFeatures.set('fullScreen', true);
    this.enhancedFeatures.set('devTools', true);
    this.enhancedFeatures.set('navigationHistory', true);
  }

  public createEnhancedPanel(
    viewColumn: vscode.ViewColumn = vscode.ViewColumn.One,
    preserveFocus: boolean = false
  ): vscode.WebviewPanel {
    const panel = this.createWebviewPanel(viewColumn, preserveFocus);

    // Add enhanced features to the panel
    this.addEnhancedFeatures(panel);

    return panel;
  }

  private addEnhancedFeatures(panel: vscode.WebviewPanel): void {
    // Add enhanced HTML content
    const enhancedHtml = this.getEnhancedWebviewContent();
    panel.webview.html = enhancedHtml;

    // Add enhanced message handling
    panel.webview.onDidReceiveMessage((message: any) => {
      this.handleEnhancedMessage(message, panel);
    });
  }

  private getEnhancedWebviewContent(): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inline Live Server - Enhanced</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: var(--vscode-font-family);
            background-color: var(--vscode-editor-background);
            color: var(--vscode-editor-foreground);
        }
        .enhanced-toolbar {
            display: flex;
            gap: 5px;
            padding: 5px;
            background-color: var(--vscode-toolbar-background);
            border-bottom: 1px solid var(--vscode-toolbar-border);
        }
        .enhanced-content {
            display: flex;
            height: calc(100vh - 40px);
        }
        .split-view {
            display: flex;
            width: 100%;
        }
        .split-panel {
            flex: 1;
            border: 1px solid var(--vscode-panel-border);
            margin: 2px;
        }
        .navigation-history {
            position: fixed;
            bottom: 10px;
            right: 10px;
            background: var(--vscode-editorWidget-background);
            border: 1px solid var(--vscode-widget-border);
            padding: 5px;
            border-radius: 3px;
        }
    </style>
</head>
<body>
    <div class="enhanced-toolbar">
        <button onclick="toggleSplitView()">Split View</button>
        <button onclick="toggleFullScreen()">Full Screen</button>
        <button onclick="openDevTools()">Dev Tools</button>
        <button onclick="showHistory()">History</button>
    </div>
    <div class="enhanced-content" id="enhanced-content">
        <div class="split-panel" id="main-panel">
            <p>Enhanced Inline Live Server Panel</p>
            <p>Advanced features enabled!</p>
        </div>
    </div>

    <div class="navigation-history" id="nav-history" style="display: none;">
        <div>Navigation History:</div>
        <div id="history-list"></div>
    </div>

    <script>
        const vscode = acquireVsCodeApi();
        let isSplitView = false;
        let isFullScreen = false;
        let navigationHistory = [];

        function toggleSplitView() {
            isSplitView = !isSplitView;
            vscode.postMessage({
                type: 'toggleSplitView',
                enabled: isSplitView
            });
        }

        function toggleFullScreen() {
            isFullScreen = !isFullScreen;
            vscode.postMessage({
                type: 'toggleFullScreen',
                enabled: isFullScreen
            });
        }

        function openDevTools() {
            vscode.postMessage({ type: 'openDevTools' });
        }

        function showHistory() {
            const historyDiv = document.getElementById('nav-history');
            historyDiv.style.display = historyDiv.style.display === 'none' ? 'block' : 'none';
        }

        window.addEventListener('message', event => {
            const message = event.data;
            switch (message.type) {
                case 'navigation':
                    if (message.url) {
                        navigationHistory.push(message.url);
                        updateHistoryDisplay();
                    }
                    break;
            }
        });

        function updateHistoryDisplay() {
            const historyList = document.getElementById('history-list');
            historyList.innerHTML = navigationHistory.map((url, index) =>
                \`<div onclick="navigateTo(\${index})">\${index + 1}. \${url}</div>\`
            ).join('');
        }

        function navigateTo(index) {
            const url = navigationHistory[index];
            if (url) {
                vscode.postMessage({
                    type: 'navigate',
                    url: url
                });
            }
        }
    </script>
</body>
</html>`;
  }

  private handleEnhancedMessage(message: any, panel: vscode.WebviewPanel): void {
    switch (message.type) {
      case 'toggleSplitView':
        this.handleSplitViewToggle(message.enabled);
        break;
      case 'toggleFullScreen':
        this.handleFullScreenToggle(message.enabled);
        break;
    }
  }

  private handleSplitViewToggle(enabled: boolean): void {
    console.log('Split view toggled:', enabled);
  }

  private handleFullScreenToggle(enabled: boolean): void {
    console.log('Full screen toggled:', enabled);
  }

  public isFeatureEnabled(feature: string): boolean {
    return this.enhancedFeatures.get(feature) || false;
  }

  public enableFeature(feature: string): void {
    this.enhancedFeatures.set(feature, true);
  }

  public disableFeature(feature: string): void {
    this.enhancedFeatures.set(feature, false);
  }
}