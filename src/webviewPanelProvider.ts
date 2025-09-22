import * as vscode from 'vscode';
import { WebviewPanelState } from './communicationTypes';

export class WebviewPanelProvider implements vscode.WebviewPanelSerializer {
  private panels: Map<string, vscode.WebviewPanel> = new Map();

  constructor(private extensionUri: vscode.Uri) {
    // Private constructor for singleton pattern
  }

  public async deserializeWebviewPanel(
    webviewPanel: vscode.WebviewPanel,
    state: any
  ): Promise<void> {
    // Restore webview panel state
    this.panels.set(webviewPanel.viewColumn?.toString() || 'main', webviewPanel);
    this.setupWebviewPanel(webviewPanel, state);
  }

  public createWebviewPanel(
    viewColumn: vscode.ViewColumn = vscode.ViewColumn.One,
    preserveFocus: boolean = false
  ): vscode.WebviewPanel {
    const panel = vscode.window.createWebviewPanel(
      'tbxLivePreview',
      'Inline Live Server',
      viewColumn,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
        enableFindWidget: true,
        localResourceRoots: [this.extensionUri]
      }
    );

    this.panels.set(viewColumn.toString(), panel);
    this.setupWebviewPanel(panel);

    return panel;
  }

  private setupWebviewPanel(panel: vscode.WebviewPanel, state?: WebviewPanelState): void {
    // Set up webview content
    panel.webview.html = this.getWebviewContent();

    // Handle panel events
    panel.onDidDispose(() => {
      this.panels.delete(panel.viewColumn?.toString() || 'main');
    });

    panel.onDidChangeViewState(() => {
      // Handle view state changes
    });

    // Handle messages from webview
    panel.webview.onDidReceiveMessage(
      (message) => {
        this.handleWebviewMessage(message, panel);
      }
    );
  }

  private getWebviewContent(): string {
    // Return HTML content for the webview
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TBX Live Server</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: var(--vscode-font-family);
            font-size: var(--vscode-font-size);
            background-color: var(--vscode-editor-background);
            color: var(--vscode-editor-foreground);
            height: 100vh;
        }
        .container {
            display: flex;
            flex-direction: column;
            height: 100vh;
        }
        .toolbar {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px 16px;
            background: linear-gradient(135deg, var(--vscode-editorWidget-background) 0%, var(--vscode-sideBar-background) 100%);
            border-bottom: 1px solid var(--vscode-panel-border);
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            min-height: 56px;
        }
        .address-bar {
            flex: 1;
            padding: 8px 12px;
            background-color: var(--vscode-input-background);
            color: var(--vscode-input-foreground);
            border: 1px solid var(--vscode-input-border);
            border-radius: 6px;
            font-family: var(--vscode-editor-font-family);
            font-size: 13px;
            transition: all 0.2s ease;
        }
        .address-bar:focus {
            outline: none;
            border-color: var(--vscode-focusBorder);
            box-shadow: 0 0 0 2px var(--vscode-focusBorder);
        }
        .toolbar button {
            padding: 8px 16px;
            background-color: var(--vscode-button-background);
            color: var(--vscode-button-foreground);
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 13px;
            font-weight: 500;
            font-family: var(--vscode-font-family);
            transition: all 0.2s ease;
            min-height: 32px;
        }
        .toolbar button:hover {
            background-color: var(--vscode-button-hoverBackground);
            transform: translateY(-1px);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }
        .toolbar button:active {
            transform: translateY(0);
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
        }
        .content {
            flex: 1;
            background-color: var(--vscode-editorWidget-background);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 40px;
            text-align: center;
        }
        .content p {
            color: var(--vscode-descriptionForeground);
            font-size: 14px;
            line-height: 1.5;
            margin: 8px 0;
        }
        .status-bar {
            padding: 8px 16px;
            background-color: var(--vscode-statusBar-background);
            color: var(--vscode-statusBar-foreground);
            font-size: 12px;
            border-top: 1px solid var(--vscode-panel-border);
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .status-indicator {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: var(--vscode-charts-green);
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="toolbar">
            <input type="text" class="address-bar" placeholder="Enter URL or file path..." />
            <button onclick="navigateHome()">Home</button>
            <button onclick="refresh()">Refresh</button>
            <button onclick="toggleDevTools()">Dev Tools</button>
        </div>
        <div class="content" id="content">
            <p>TBX Live Server Panel</p>
            <p>Server will start when you open a file or use the command palette.</p>
        </div>
        <div class="status-bar" id="status-bar">
            <div class="status-indicator"></div>
            <span>Ready</span>
        </div>
    </div>

    <script>
        const vscode = acquireVsCodeApi();
        const content = document.getElementById('content');
        const statusBar = document.getElementById('status-bar');
        const addressBar = document.querySelector('.address-bar');

        // Handle messages from extension
        window.addEventListener('message', event => {
            const message = event.data;
            switch (message.type) {
                case 'update':
                    content.innerHTML = message.html || message.text || 'No content';
                    break;
                case 'navigate':
                    if (message.url) {
                        addressBar.value = message.url;
                    }
                    break;
                case 'status':
                    statusBar.textContent = message.text || 'Ready';
                    break;
            }
        });

        function navigateHome() {
            vscode.postMessage({ type: 'navigateHome' });
        }

        function refresh() {
            vscode.postMessage({ type: 'refresh' });
        }

        function toggleDevTools() {
            vscode.postMessage({ type: 'toggleDevTools' });
        }

        addressBar.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                vscode.postMessage({
                    type: 'navigate',
                    url: addressBar.value
                });
            }
        });
    </script>
</body>
</html>`;
  }

  private handleWebviewMessage(message: any, panel: vscode.WebviewPanel): void {
    switch (message.type) {
      case 'navigateHome':
        vscode.commands.executeCommand('extension.liveServer.navigateHome');
        break;
      case 'refresh':
        vscode.commands.executeCommand('extension.liveServer.goOnline');
        break;
      case 'toggleDevTools':
        vscode.commands.executeCommand('extension.liveServer.openDevTools');
        break;
      case 'navigate':
        if (message.url) {
          // Handle navigation to specific URL
          console.log('Navigate to:', message.url);
        }
        break;
    }
  }

  public getPanel(viewColumn: vscode.ViewColumn): vscode.WebviewPanel | undefined {
    return this.panels.get(viewColumn.toString());
  }

  public dispose(): void {
    this.panels.forEach(panel => panel.dispose());
    this.panels.clear();
  }
}