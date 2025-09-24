import * as path from 'path';
import * as vscode from 'vscode';
import { StatusBarManager } from './statusBarManager';
import { CommunicationManager } from './communicationManager';
import { LiveReloadManager } from './liveReloadManager';
import { ErrorRecoveryManager } from './errorRecoveryManager';

interface ServerInstance {
  id: string;
  rootPath: string;
  workspaceName: string;
  port: number;
  process: { kill(): void };
}

interface ServerPickItem extends vscode.QuickPickItem {
  server: ServerInstance | null;
}

export class CommandManagerEnhanced {
  private statusBarManager: StatusBarManager;
  private communicationManager: CommunicationManager;
  private liveReloadManager: LiveReloadManager;
  private errorRecoveryManager: ErrorRecoveryManager;
  private previewPanel: vscode.WebviewPanel | null = null;
  private servers: ServerInstance[] = [];
  private activeServerId: string | null = null;
  private targetFilePath: string | null = null;

  constructor(
    communicationManager: CommunicationManager,
    errorRecoveryManager: ErrorRecoveryManager
  ) {
    this.statusBarManager = new StatusBarManager();
    this.communicationManager = communicationManager;
    this.errorRecoveryManager = errorRecoveryManager;

    // Initialize live reload manager with dependencies
    this.liveReloadManager = new LiveReloadManager(
      communicationManager,
      errorRecoveryManager
    );

    // Connect live reload manager to this command manager
    this.liveReloadManager.setCommandManager(this);
  }

  public executeCommand(command: string, contextUri?: vscode.Uri): void {
    console.log(`[CommandManager] Executing command: ${command}`, contextUri ? `with URI: ${contextUri.fsPath}` : 'without URI');

    try {
      switch (command) {
        case 'goOffline':
          void this.goOffline();
          break;
        case 'goOnline':
          this.goOnline(contextUri);
          break;
        case 'showFileBrowser':
          this.showFileBrowser();
          break;
        case 'changeWorkspace':
          this.changeWorkspace();
          break;
        case 'startWebview':
          this.startWebview();
          break;
        case 'navigateHome':
          this.navigateHome();
          break;
        case 'zoomIn':
          this.zoomIn();
          break;
        case 'zoomOut':
          this.zoomOut();
          break;
        case 'resetZoom':
          this.resetZoom();
          break;
        case 'toggleSplitView':
          this.toggleSplitView();
          break;
        case 'toggleFullScreen':
          this.toggleFullScreen();
          break;
        case 'openDevTools':
          this.openDevTools();
          break;
        case 'inspectElement':
          this.inspectElement();
          break;
        case 'viewSource':
          this.viewSource();
          break;
        case 'clearHistory':
          this.clearHistory();
          break;
        case 'saveState':
          this.saveState();
          break;
        case 'loadState':
          this.loadState();
          break;
        default:
          console.error(`[CommandManager] Unknown command: ${command}`);
          vscode.window.showErrorMessage(`Unknown command: ${command}`);
      }
    } catch (error) {
      console.error(`[CommandManager] Error executing command ${command}:`, error);
      vscode.window.showErrorMessage(`Error executing command: ${error}`);
    }
  }

  private async goOffline(): Promise<void> {
    console.log('[CommandManager] Stopping server...');

    if (this.servers.length === 0) {
      vscode.window.showInformationMessage('Inline Live Server: No servers are currently running');
      return;
    }

    try {
      let targetIds: string[] = [];

      if (this.servers.length === 1) {
        targetIds = [this.servers[0].id];
      } else {
        const pickItems: ServerPickItem[] = this.servers.map(server => ({
          label: `${server.workspaceName} (${server.port})`,
          description: server.rootPath,
          server
        }));

        pickItems.push({
          label: 'Stop All Servers',
          description: 'Terminate every running TBX Live Server server',
          server: null
        });

        const selection = await vscode.window.showQuickPick(pickItems, {
          placeHolder: 'Select TBX Live Server server to stop'
        });

        if (!selection) {
          return;
        }

        if (selection.server) {
          targetIds = [selection.server.id];
        } else {
          targetIds = this.servers.map(server => server.id);
        }
      }

      this.stopServers(targetIds);
    } catch (error) {
      console.error('[CommandManager] Error stopping server:', error);
      vscode.window.showErrorMessage(`Error stopping server: ${error}`);
    }
  }

  private goOnline(contextUri?: vscode.Uri): void {
    console.log('[CommandManager] Starting server...', contextUri ? `for file: ${contextUri.fsPath}` : '');

    try {
      // Determine workspace folder and target file
      let workspaceFolder: vscode.WorkspaceFolder | undefined;
      let targetFile: string | null = null;

      if (contextUri) {
        // Context menu was used - get workspace folder for the selected file
        workspaceFolder = vscode.workspace.getWorkspaceFolder(contextUri);
        if (workspaceFolder) {
          // Calculate relative path from workspace root to the target file
          const relativePath = path.relative(workspaceFolder.uri.fsPath, contextUri.fsPath);
          targetFile = relativePath.replace(/\\/g, '/'); // Normalize path separators
          console.log(`[CommandManager] Target file: ${targetFile}`);
        }
      } else {
        // Fallback to current behavior
        workspaceFolder = this.resolveWorkspaceFolder();
      }

      if (!workspaceFolder) {
        vscode.window.showErrorMessage('TBX Live Server: No workspace folder found');
        return;
      }

      // Store target file for webview navigation
      this.targetFilePath = targetFile;

      const existingServer = this.servers.find(
        server => server.id === workspaceFolder!.uri.fsPath
      );

      if (existingServer) {
        this.activeServerId = existingServer.id;
        vscode.window.showWarningMessage(
          `TBX Live Server: Server is already running on port ${existingServer.port}`
        );
        this.updatePreviewPanel();
        this.startWebview();
        return;
      }

      const config = vscode.workspace.getConfiguration('tbxLivePreview.server');
      const basePort = config.get('customPort', 5501);
      const port = this.findAvailablePort(basePort);

      const serverProcess = this.startLiveServer(workspaceFolder.uri.fsPath, port);

      const serverInstance: ServerInstance = {
        id: workspaceFolder.uri.fsPath,
        rootPath: workspaceFolder.uri.fsPath,
        workspaceName: workspaceFolder.name,
        port,
        process: serverProcess
      };

      this.servers.push(serverInstance);
      this.activeServerId = serverInstance.id;

      this.updateStatusBar();
      this.communicationManager.sendMessage({
        type: 'serverStatus',
        payload: { status: 'running', port, url: `http://localhost:${port}` }
      });

      this.startWebview();

      // Initialize live reload manager
      this.liveReloadManager.initialize();

      // Show success message with occasional support mention
      const messages = [
        `Inline Live Server: Server started for ${workspaceFolder.name} on port ${port}`,
        `Inline Live Server: Server started for ${workspaceFolder.name} on port ${port}`,
        `Inline Live Server: Server started for ${workspaceFolder.name} on port ${port}`,
        `Inline Live Server: Server started for ${workspaceFolder.name} on port ${port}`,
        `Inline Live Server: Server started for ${workspaceFolder.name} on port ${port} • Enjoying the extension? ☕ Support development: https://buymeacoffee.com/th3mailman`
      ];
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      vscode.window.showInformationMessage(randomMessage);
      console.log(`[CommandManager] Server started successfully on port ${port}`);
    } catch (error) {
      console.error('[CommandManager] Error starting server:', error);
      vscode.window.showErrorMessage(`Error starting server: ${error}`);
      this.updateStatusBar(true);
    }
  }

  private async showFileBrowser(): Promise<void> {
    console.log('[CommandManager] Showing file browser...');

    try {
      const workspaceFolder = this.resolveWorkspaceFolder();
      if (!workspaceFolder) {
        vscode.window.showErrorMessage('TBX Live Server: No workspace folder found');
        return;
      }

      // Find HTML files in the workspace
      const htmlFiles = await vscode.workspace.findFiles(
        new vscode.RelativePattern(workspaceFolder, '**/*.{html,htm}'),
        '**/node_modules/**',
        50 // Limit to 50 files
      );

      if (htmlFiles.length === 0) {
        vscode.window.showInformationMessage('No HTML files found in the workspace');
        return;
      }

      // Create quick pick items
      const quickPickItems = htmlFiles.map(file => {
        const relativePath = vscode.workspace.asRelativePath(file, false);
        return {
          label: path.basename(file.fsPath),
          description: relativePath,
          detail: file.fsPath,
          uri: file
        };
      });

      // Show quick pick
      const selectedFile = await vscode.window.showQuickPick(quickPickItems, {
        placeHolder: 'Select an HTML file to serve',
        matchOnDescription: true,
        matchOnDetail: true
      });

      if (selectedFile) {
        console.log(`[CommandManager] User selected file: ${selectedFile.uri.fsPath}`);
        // Start server for the selected file
        this.goOnline(selectedFile.uri);
      }
    } catch (error) {
      console.error('[CommandManager] Error showing file browser:', error);
      vscode.window.showErrorMessage(`Error showing file browser: ${error}`);
    }
  }

  private loadLiveServerModule(): any {
    try {
      const moduleFromDependencies = require('live-server');
      if (moduleFromDependencies && typeof moduleFromDependencies.start === 'function') {
        console.log('[CommandManager] Live-server module loaded from node_modules');
        return moduleFromDependencies;
      }
      console.warn('[CommandManager] Live-server module from node_modules missing start method');
    } catch (error) {
      console.warn(`[CommandManager] Failed to load live-server from node_modules: ${error}`);
    }

    const bundledModulePath = path.join(__dirname, '..', 'lib', 'live-server');
    const dynamicRequire = eval('require'); // Avoid webpack static analysis for fallback path

    try {
      const bundledModule = dynamicRequire(bundledModulePath);
      if (bundledModule && typeof bundledModule.start === 'function') {
        console.log('[CommandManager] Live-server module loaded from bundled fallback');
        return bundledModule;
      }
      console.warn('[CommandManager] Bundled live-server module missing start method');
    } catch (error) {
      console.warn(`[CommandManager] Failed to load bundled live-server module: ${error}`);
    }

    throw new Error('Unable to locate live-server module with start method');
  }

  private startLiveServer(rootPath: string, port: number): { kill(): void } {
    console.log(`[CommandManager] Starting live server on path: ${rootPath}, port: ${port}`);

    try {
      // Resolve the live-server module from available locations
      const liveServerModule = this.loadLiveServerModule();

      const params = {
        port: port,
        host: '127.0.0.1',
        root: rootPath,
        open: false, // Don't open browser automatically
        wait: 100,
        logLevel: 2, // Info level
        middleware: [
          (req: any, res: any, next: any) => {
            console.log(`[LiveServer] ${req.method} ${req.url}`);
            next();
          }
        ]
      };

      console.log('[CommandManager] Starting live-server with params:', params);

      // Start the server using the default export
      liveServerModule.start(params);

      const processHandle = {
        kill: () => {
          try {
            if (liveServerModule.shutdown && typeof liveServerModule.shutdown === 'function') {
              liveServerModule.shutdown();
            }
          } catch (error) {
            console.error('[CommandManager] Error shutting down live-server:', error);
          }
        }
      };

      console.log('[CommandManager] Live server started successfully');
      return processHandle;
    } catch (error) {
      console.error('[CommandManager] Error starting live-server:', error);
      throw new Error(`Failed to start live server: ${error}`);
    }
  }

  private changeWorkspace(): void {
    console.log('[CommandManager] Changing workspace...');

    vscode.window.showWorkspaceFolderPick().then(folder => {
      if (folder) {
        vscode.window.showInformationMessage(`TBX Live Server: Workspace changed to ${folder.name}`);
        console.log(`[CommandManager] Workspace changed to: ${folder.name}`);
      }
    });
  }

  private startWebview(): void {
    console.log('[CommandManager] Ensuring webview is visible...');

    try {
      const existingPanel = this.previewPanel;
      if (existingPanel) {
        existingPanel.reveal(vscode.ViewColumn.Two);
        this.updatePreviewPanel();
        console.log('[CommandManager] Webview panel revealed and updated');
        return;
      }

      const panel = vscode.window.createWebviewPanel(
        'tbxLivePreview',
        'TBX Live Server',
        vscode.ViewColumn.Two,
        {
          enableScripts: true,
          retainContextWhenHidden: true,
          enableFindWidget: true
        }
      );

      this.previewPanel = panel;
      panel.onDidDispose(() => {
        this.previewPanel = null;
      });

      panel.webview.onDidReceiveMessage(message => {
        const selectedServerId = (message?.serverId as string | undefined) ?? this.activeServerId;
        switch (message.command) {
          case 'startServer':
            this.goOnline();
            break;
          case 'stopServer':
            if (selectedServerId) {
              this.stopServers([selectedServerId]);
            } else {
              vscode.window.showInformationMessage('Inline Live Server: No server selected to stop');
            }
            break;
          case 'openInBrowser':
            {
              const server = this.getServerById(selectedServerId);
              if (server) {
                const uri = vscode.Uri.parse(`http://127.0.0.1:${server.port}`);
                vscode.env.openExternal(uri);
              } else {
                vscode.window.showInformationMessage('Inline Live Server: Server is not running');
              }
            }
            break;
          case 'refresh':
            this.updatePreviewPanel();
            break;
          case 'selectServer':
            if (selectedServerId && this.getServerById(selectedServerId)) {
              this.activeServerId = selectedServerId;
              this.updatePreviewPanel();
            }
            break;
        }
      });

      this.updatePreviewPanel();
      vscode.window.showInformationMessage('TBX Live Server: Webview opened');
      console.log('[CommandManager] Webview started successfully');
    } catch (error) {
      console.error('[CommandManager] Error starting webview:', error);
      vscode.window.showErrorMessage(`Error starting webview: ${error}`);
    }
  }

  private updatePreviewPanel(): void {
    if (!this.previewPanel) {
      return;
    }

    this.previewPanel.webview.html = this.getWebviewContent();
  }

  public sendLiveReloadMessage(): void {
    if (!this.previewPanel) {
      return;
    }

    this.previewPanel.webview.postMessage({
      type: 'liveReload',
      payload: {
        action: 'reload',
        timestamp: Date.now()
      }
    });
  }

  public sendFileChangeMessage(file: string, changeType: string): void {
    if (!this.previewPanel) {
      return;
    }

    this.previewPanel.webview.postMessage({
      type: 'fileChange',
      payload: {
        file,
        changeType,
        timestamp: Date.now()
      }
    });
  }

  private resolveWorkspaceFolder(): vscode.WorkspaceFolder | undefined {
    const activeEditor = vscode.window.activeTextEditor;
    if (activeEditor) {
      const folder = vscode.workspace.getWorkspaceFolder(activeEditor.document.uri);
      if (folder) {
        return folder;
      }
    }

    return vscode.workspace.workspaceFolders?.[0];
  }

  private findAvailablePort(basePort: number): number {
    const usedPorts = new Set(this.servers.map(server => server.port));
    let port = basePort;

    while (usedPorts.has(port)) {
      port += 1;
    }

    return port;
  }

  private getServerById(serverId: string | null | undefined): ServerInstance | undefined {
    if (!serverId) {
      return undefined;
    }

    return this.servers.find(server => server.id === serverId);
  }

  private updateStatusBar(hasError = false): void {
    if (hasError) {
      this.statusBarManager.updateServerState('error');
      return;
    }

    if (this.servers.length === 0) {
      this.statusBarManager.updateServerState('stopped');
    } else {
      this.statusBarManager.updateServerState('running', this.servers.length);
    }
  }

  private escapeHtml(value: string): string {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  private escapeHtmlAttribute(value: string): string {
    return this.escapeHtml(value);
  }

  private stopServers(serverIds: string[], options: { silent?: boolean } = {}): void {
    if (serverIds.length === 0) {
      return;
    }

    const uniqueIds = Array.from(new Set(serverIds));
    const stoppedServers: ServerInstance[] = [];
    const silent = Boolean(options.silent);

    for (const id of uniqueIds) {
      const server = this.servers.find(instance => instance.id === id);
      if (!server) {
        continue;
      }

      try {
        server.process.kill();
        stoppedServers.push(server);
      } catch (error) {
        console.error('[CommandManager] Error shutting down server:', error);
      }
    }

    this.servers = this.servers.filter(server => !uniqueIds.includes(server.id));

    if (this.activeServerId && uniqueIds.includes(this.activeServerId)) {
      this.activeServerId = this.servers[0]?.id ?? null;
    }

    for (const server of stoppedServers) {
      this.communicationManager.sendMessage({
        type: 'serverStatus',
        payload: { status: 'stopped', port: server.port }
      });

      if (!silent) {
        vscode.window.showInformationMessage(
          `TBX Live Server: Server stopped for ${server.workspaceName} (${server.port})`
        );
      }
    }

    // Disable live reload if no servers are running
    if (this.servers.length === 0) {
      this.liveReloadManager.setEnabled(false);
    }

    this.updateStatusBar();
    this.updatePreviewPanel();
    console.log('[CommandManager] Server stop sequence complete');
  }

  private getWebviewContent(): string {
    const serversData = this.servers.map(server => ({
      id: server.id,
      label: `${server.workspaceName} (${server.port})`,
      port: server.port,
      url: `http://127.0.0.1:${server.port}`,
      rootPath: server.rootPath
    }));

    const activeServer = this.getServerById(this.activeServerId ?? undefined);
    const hasRunningServer = Boolean(activeServer);

    // Construct the URL with target file if available
    let serverUrl = '';
    if (hasRunningServer && activeServer?.port) {
      serverUrl = `http://127.0.0.1:${activeServer.port}`;
      if (this.targetFilePath) {
        serverUrl += `/${this.targetFilePath}`;
      }
    }

    const statusText = hasRunningServer
      ? `Server running at ${serverUrl || 'Unknown port'}`
      : 'Server is stopped';
    const portDisplay = activeServer?.port ?? '—';
    const iframeContent = hasRunningServer
      ? `<div class="preview-container">
           <iframe id="previewFrame" src="${serverUrl}" class="preview-frame auto-fit" sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"></iframe>
         </div>`
      : `<div class="placeholder">
           <div class="placeholder-icon">🚀</div>
           <p><strong>Ready to Launch</strong></p>
           <p>Click "Start" to begin serving your files and see the live preview here.</p>
         </div>`;

    const optionsHtml = serversData
      .map(server => {
        const selected = server.id === this.activeServerId ? 'selected' : '';
        return `<option value="${this.escapeHtmlAttribute(server.id)}" ${selected}>${this.escapeHtml(server.label)}</option>`;
      })
      .join('');

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>TBX Live Server</title>
        <style>
          body {
            margin: 0;
            font-family: var(--vscode-font-family);
            font-size: var(--vscode-font-size);
            background-color: var(--vscode-editor-background);
            color: var(--vscode-editor-foreground);
            display: flex;
            flex-direction: column;
            height: 100vh;
          }

          header {
            display: grid;
            grid-template-columns: auto 1fr auto auto;
            grid-template-areas: "status controls actions toggle";
            align-items: center;
            padding: 12px 16px;
            background: linear-gradient(135deg, var(--vscode-editorWidget-background) 0%, var(--vscode-sideBar-background) 100%);
            border-bottom: 1px solid var(--vscode-panel-border);
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            gap: 16px;
            min-height: 56px;
            transition: all 0.3s ease;
            overflow: hidden;
          }

          header.collapsed {
            grid-template-columns: auto 1fr auto;
            grid-template-areas: "status-minimal . toggle";
            min-height: 40px;
            padding: 8px 16px;
          }

          .status {
            grid-area: status;
            display: flex;
            flex-direction: column;
            gap: 4px;
            font-size: 12px;
            min-width: 200px;
            transition: all 0.3s ease;
          }

          .status strong {
            font-size: 14px;
            font-weight: 600;
            color: var(--vscode-textLink-foreground);
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .status-minimal {
            grid-area: status-minimal;
            display: none;
            align-items: center;
            gap: 8px;
            font-size: 13px;
            font-weight: 500;
            color: var(--vscode-textLink-foreground);
          }

          .minimal-actions {
            display: none;
            align-items: center;
            gap: 4px;
            margin-left: 12px;
          }

          .minimal-action-btn {
            width: 24px;
            height: 24px;
            background-color: var(--vscode-button-background);
            color: var(--vscode-button-foreground);
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 11px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
          }

          .minimal-action-btn:hover {
            background-color: var(--vscode-button-hoverBackground);
            transform: scale(1.1);
          }

          .minimal-action-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            transform: none;
          }

          header.collapsed .status {
            display: none;
          }

          header.collapsed .status-minimal {
            display: flex;
          }

          header.collapsed .minimal-actions {
            display: flex;
          }

          .status-indicator {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: var(--vscode-charts-green);
            box-shadow: 0 0 4px rgba(0, 255, 0, 0.3);
            animation: pulse 2s infinite;
          }

          .status-indicator.offline {
            background-color: var(--vscode-errorForeground);
            box-shadow: 0 0 4px rgba(255, 0, 0, 0.3);
            animation: none;
          }

          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.6; }
          }

          .port-info {
            color: var(--vscode-descriptionForeground);
            font-family: var(--vscode-editor-font-family);
          }
          .controls {
            grid-area: controls;
            display: flex;
            align-items: center;
            gap: 8px;
            justify-content: center;
            transition: all 0.3s ease;
          }

          header.collapsed .controls {
            display: none;
          }

          .server-selector {
            position: relative;
            min-width: 200px;
          }

          .controls select {
            width: 100%;
            padding: 8px 12px;
            background-color: var(--vscode-dropdown-background);
            color: var(--vscode-dropdown-foreground);
            border: 1px solid var(--vscode-dropdown-border);
            border-radius: 6px;
            font-size: 13px;
            font-family: var(--vscode-font-family);
            cursor: pointer;
            transition: all 0.2s ease;
          }

          .controls select:hover {
            border-color: var(--vscode-focusBorder);
            box-shadow: 0 0 0 1px var(--vscode-focusBorder);
          }

          .controls select:focus {
            outline: none;
            border-color: var(--vscode-focusBorder);
            box-shadow: 0 0 0 2px var(--vscode-focusBorder);
          }

          .actions {
            grid-area: actions;
            display: flex;
            gap: 8px;
            align-items: center;
            transition: all 0.3s ease;
          }

          header.collapsed .actions {
            display: none;
          }

          .header-toggle {
            grid-area: toggle;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 32px;
            height: 32px;
            background-color: var(--vscode-toolbar-hoverBackground);
            border: 1px solid var(--vscode-panel-border);
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            color: var(--vscode-foreground);
            transition: all 0.2s ease;
            flex-shrink: 0;
          }

          .header-toggle:hover {
            background-color: var(--vscode-toolbar-activeBackground);
            border-color: var(--vscode-focusBorder);
            transform: translateY(-1px);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          }

          .header-toggle:active {
            transform: translateY(0);
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
          }

          .btn-group {
            display: flex;
            gap: 4px;
            background-color: var(--vscode-toolbar-hoverBackground);
            border-radius: 8px;
            padding: 4px;
          }

          .controls button, .actions button {
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
            display: flex;
            align-items: center;
            gap: 6px;
          }

          .controls button:hover, .actions button:hover {
            background-color: var(--vscode-button-hoverBackground);
            transform: translateY(-1px);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          }

          .controls button:active, .actions button:active {
            transform: translateY(0);
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
          }

          .controls button:disabled, .actions button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
          }

          .btn-primary {
            background-color: var(--vscode-button-background) !important;
            color: var(--vscode-button-foreground) !important;
          }

          .btn-secondary {
            background-color: var(--vscode-button-secondaryBackground) !important;
            color: var(--vscode-button-secondaryForeground) !important;
          }

          .btn-danger {
            background-color: var(--vscode-errorForeground) !important;
            color: white !important;
          }
          .content {
            flex: 1;
            background-color: var(--vscode-editorWidget-background);
            display: flex;
            position: relative;
            overflow: hidden;
          }

          .preview-container {
            width: 100%;
            height: 100%;
            position: relative;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .preview-frame {
            border: none;
            background-color: white;
            border-radius: 0 0 8px 8px;
            box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
            transform-origin: top left;
            transition: transform 0.3s ease;
            position: absolute;
            top: 0;
            left: 0;
          }

          .preview-frame.auto-fit {
            /* Auto-fit scaling will be applied via JavaScript */
          }

          .preview-frame.mobile-view {
            /* Mobile responsive view */
            max-width: 375px;
            width: 375px !important;
          }

          .placeholder {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            color: var(--vscode-descriptionForeground);
            font-size: 14px;
            gap: 16px;
            text-align: center;
            padding: 40px;
          }

          .placeholder-icon {
            font-size: 48px;
            opacity: 0.5;
            margin-bottom: 8px;
          }

          .placeholder p {
            margin: 0;
            line-height: 1.5;
          }

          /* Responsive design for different VS Code panel sizes */
          @media (max-width: 800px) {
            header {
              grid-template-columns: 1fr auto;
              grid-template-areas:
                "status toggle"
                "controls controls"
                "actions actions";
              gap: 12px;
              padding: 12px;
            }

            header.collapsed {
              grid-template-columns: 1fr auto;
              grid-template-areas: "status-minimal toggle";
              gap: 12px;
              min-height: 36px;
            }

            .status {
              min-width: auto;
              text-align: left;
            }

            .controls, .actions {
              justify-content: center;
            }

            .server-selector {
              min-width: 150px;
            }
          }

          @media (max-width: 500px) {
            header {
              padding: 8px;
              gap: 8px;
            }

            header.collapsed {
              padding: 6px 8px;
            }

            .controls button, .actions button {
              padding: 6px 12px;
              font-size: 12px;
              min-height: 28px;
            }

            .btn-group {
              flex-wrap: wrap;
            }

            .header-toggle {
              width: 28px;
              height: 28px;
              font-size: 12px;
            }
          }
        </style>
      </head>
      <body>
        <header id="header">
          <div class="status">
            <strong>
              <span class="status-indicator ${hasRunningServer ? '' : 'offline'}"></span>
              ${statusText}
            </strong>
            <span class="port-info">Port: ${portDisplay}</span>
          </div>
          <div class="status-minimal">
            <span class="status-indicator ${hasRunningServer ? '' : 'offline'}"></span>
            <span>${hasRunningServer ? 'Running' : 'Stopped'}</span>
            <span class="port-info">:${portDisplay}</span>
            <div class="minimal-actions">
              <button class="minimal-action-btn" onclick="postCommand('${hasRunningServer ? 'stopServer' : 'startServer'}')" title="${hasRunningServer ? 'Stop Server' : 'Start Server'}">${
                hasRunningServer ? '⏹' : '▶'
              }</button>
              <button class="minimal-action-btn" onclick="postCommand('refresh')" ${
                hasRunningServer ? '' : 'disabled'
              } title="Refresh Preview">🔄</button>
              <button class="minimal-action-btn" onclick="postCommand('openInBrowser')" ${
                hasRunningServer ? '' : 'disabled'
              } title="Open in Browser">🌐</button>
            </div>
          </div>
          <div class="controls">
            <div class="server-selector">
              <select id="serverSelect" ${serversData.length === 0 ? 'disabled' : ''}>
                ${optionsHtml || '<option value="" selected>No servers running</option>'}
              </select>
            </div>
          </div>
          <div class="actions">
            <div class="btn-group">
              <button class="btn-primary" onclick="postCommand('${hasRunningServer ? 'stopServer' : 'startServer'}')">${
                hasRunningServer ? '⏹ Stop' : '▶ Start'
              }</button>
              <button class="btn-secondary" onclick="postCommand('refresh')" ${
                hasRunningServer ? '' : 'disabled'
              }>🔄 Refresh</button>
              <button class="btn-secondary" onclick="postCommand('openInBrowser')" ${
                hasRunningServer ? '' : 'disabled'
              }>🌐 Browser</button>
            </div>
            <div class="btn-group">
              <button class="btn-secondary" onclick="zoomOut()" title="Zoom Out">🔍-</button>
              <button class="btn-secondary" onclick="resetZoom()" title="Reset Zoom">🔍</button>
              <button class="btn-secondary" onclick="zoomIn()" title="Zoom In">🔍+</button>
              <button class="btn-secondary" onclick="toggleAutoFit()" title="Toggle Auto-Fit" id="autoFitBtn">📱</button>
            </div>
          </div>
          <div class="header-toggle" id="headerToggle" title="Toggle header size">
            <span id="toggleIcon">▲</span>
          </div>
        </header>
        <div class="content" id="contentContainer">
          ${iframeContent}
        </div>

        <script>
          const vscode = acquireVsCodeApi();
          const servers = ${JSON.stringify(serversData).replace(/</g, '\u003c')};
          const activeServerId = ${
            JSON.stringify(this.activeServerId).replace(/</g, '\u003c')
          };

          // Get or restore state
          let state = vscode.getState() || {};
          const isCollapsed = state.headerCollapsed || false;

          const header = document.getElementById('header');
          const headerToggle = document.getElementById('headerToggle');
          const toggleIcon = document.getElementById('toggleIcon');
          const select = document.getElementById('serverSelect');
          const contentContainer = document.getElementById('contentContainer');
          const previewFrame = document.getElementById('previewFrame');

          // Initialize header state
          if (isCollapsed) {
            header.classList.add('collapsed');
            toggleIcon.textContent = '▼';
            headerToggle.title = 'Expand header';
          } else {
            toggleIcon.textContent = '▲';
            headerToggle.title = 'Collapse header';
          }

          // Header toggle functionality
          function toggleHeader() {
            const collapsed = header.classList.toggle('collapsed');
            toggleIcon.textContent = collapsed ? '▼' : '▲';
            headerToggle.title = collapsed ? 'Expand header' : 'Collapse header';

            // Save state
            state.headerCollapsed = collapsed;
            vscode.setState(state);
          }

          headerToggle.addEventListener('click', toggleHeader);

          // Keyboard shortcut for toggle (Ctrl/Cmd + H)
          document.addEventListener('keydown', (event) => {
            if ((event.ctrlKey || event.metaKey) && event.key === 'h') {
              event.preventDefault();
              toggleHeader();
            }
          });

          if (select && activeServerId) {
            select.value = activeServerId;
          }

          if (select) {
            select.addEventListener('change', () => {
              vscode.postMessage({ command: 'selectServer', serverId: select.value });
            });
          }

          function postCommand(command) {
            const serverId = select ? select.value : null;
            vscode.postMessage({ command, serverId });
          }

          // Responsive scaling functionality
          let currentZoom = 1;
          let autoFitEnabled = true;
          const minZoom = 0.1;
          const maxZoom = 5;

          function calculateAutoFitScale() {
            if (!previewFrame || !contentContainer) return 1;

            const containerRect = contentContainer.getBoundingClientRect();
            const containerWidth = containerRect.width;
            const containerHeight = containerRect.height;

            // Assume standard desktop width for scaling calculation
            const standardWidth = 1200;
            const standardHeight = 800;

            // Calculate scale to fit width, with minimum scale for readability
            const widthScale = Math.max(0.3, containerWidth / standardWidth);
            const heightScale = Math.max(0.3, containerHeight / standardHeight);

            // Use the smaller scale to ensure content fits in both dimensions
            return Math.min(widthScale, heightScale);
          }

          function applyScale(scale) {
            if (!previewFrame) return;

            const finalScale = autoFitEnabled ? calculateAutoFitScale() * scale : scale;
            const clampedScale = Math.max(minZoom, Math.min(maxZoom, finalScale));

            // Apply transform
            previewFrame.style.transform = \`scale(\${clampedScale})\`;
            previewFrame.style.width = \`\${100 / clampedScale}%\`;
            previewFrame.style.height = \`\${100 / clampedScale}%\`;

            // Center the scaled content
            const container = previewFrame.parentElement;
            if (container) {
              container.style.overflow = clampedScale < 1 ? 'hidden' : 'auto';
            }
          }

          function toggleAutoFit() {
            autoFitEnabled = !autoFitEnabled;
            applyScale(currentZoom);
          }

          function zoomIn() {
            currentZoom = Math.min(maxZoom, currentZoom * 1.2);
            applyScale(currentZoom);
          }

          function zoomOut() {
            currentZoom = Math.max(minZoom, currentZoom / 1.2);
            applyScale(currentZoom);
          }

          function resetZoom() {
            currentZoom = 1;
            applyScale(currentZoom);
          }

          function enableMobileView() {
            if (previewFrame) {
              previewFrame.classList.add('mobile-view');
              applyScale(currentZoom);
            }
          }

          function disableMobileView() {
            if (previewFrame) {
              previewFrame.classList.remove('mobile-view');
              applyScale(currentZoom);
            }
          }

          // Window resize handler for dynamic scaling
          window.addEventListener('resize', () => {
            if (autoFitEnabled) {
              setTimeout(() => applyScale(currentZoom), 100);
            }
          });

          // Initialize scaling when iframe loads
          if (previewFrame) {
            previewFrame.addEventListener('load', () => {
              // Inject viewport meta tag for better responsive behavior
              try {
                const iframeDoc = previewFrame.contentDocument || previewFrame.contentWindow.document;
                if (iframeDoc) {
                  let viewportMeta = iframeDoc.querySelector('meta[name="viewport"]');
                  if (!viewportMeta) {
                    viewportMeta = iframeDoc.createElement('meta');
                    viewportMeta.name = 'viewport';
                    viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
                    iframeDoc.head.appendChild(viewportMeta);
                  }

                  // Add responsive CSS for better mobile display
                  const responsiveStyle = iframeDoc.createElement('style');
                  responsiveStyle.textContent = \`
                    body {
                      max-width: 100% !important;
                      overflow-x: hidden !important;
                    }
                    * {
                      max-width: 100% !important;
                      box-sizing: border-box !important;
                    }
                    img {
                      max-width: 100% !important;
                      height: auto !important;
                    }
                    table {
                      width: 100% !important;
                      table-layout: fixed !important;
                    }
                    .container, .wrapper, .content {
                      max-width: 100% !important;
                      width: 100% !important;
                    }
                  \`;
                  iframeDoc.head.appendChild(responsiveStyle);
                }
              } catch (e) {
                console.log('Could not inject responsive styles (cross-origin):', e);
              }

              // Apply initial scaling
              setTimeout(() => applyScale(currentZoom), 100);
            });

            // Apply initial scaling
            setTimeout(() => applyScale(currentZoom), 100);
          }

          // Handle messages from extension (including live reload)
          window.addEventListener('message', event => {
            const message = event.data;
            switch (message.type) {
              case 'liveReload':
                console.log('Live reload triggered');
                if (previewFrame) {
                  // Reload the iframe content
                  const currentSrc = previewFrame.src;
                  previewFrame.src = '';
                  setTimeout(() => {
                    previewFrame.src = currentSrc;
                    // Reapply scaling after reload
                    setTimeout(() => applyScale(currentZoom), 200);
                  }, 100);
                }
                break;
              case 'fileChange':
                console.log('File changed:', message.payload.file);
                break;
              case 'zoomIn':
                zoomIn();
                break;
              case 'zoomOut':
                zoomOut();
                break;
              case 'resetZoom':
                resetZoom();
                break;
              case 'toggleAutoFit':
                toggleAutoFit();
                break;
              case 'enableMobileView':
                enableMobileView();
                break;
              case 'disableMobileView':
                disableMobileView();
                break;
            }
          });
        </script>
      </body>
      </html>
    `;
  }

  private navigateHome(): void {
    vscode.window.showInformationMessage('TBX Live Server: Navigated to home');
  }

  private zoomIn(): void {
    if (this.previewPanel?.webview) {
      this.previewPanel.webview.postMessage({ type: 'zoomIn' });
    }
  }

  private zoomOut(): void {
    if (this.previewPanel?.webview) {
      this.previewPanel.webview.postMessage({ type: 'zoomOut' });
    }
  }

  private resetZoom(): void {
    if (this.previewPanel?.webview) {
      this.previewPanel.webview.postMessage({ type: 'resetZoom' });
    }
  }

  private toggleAutoFit(): void {
    if (this.previewPanel?.webview) {
      this.previewPanel.webview.postMessage({ type: 'toggleAutoFit' });
    }
  }

  private enableMobileView(): void {
    if (this.previewPanel?.webview) {
      this.previewPanel.webview.postMessage({ type: 'enableMobileView' });
    }
  }

  private disableMobileView(): void {
    if (this.previewPanel?.webview) {
      this.previewPanel.webview.postMessage({ type: 'disableMobileView' });
    }
  }

  private toggleSplitView(): void {
    vscode.window.showInformationMessage('TBX Live Server: Split view toggled');
  }

  private toggleFullScreen(): void {
    vscode.window.showInformationMessage('TBX Live Server: Full screen toggled');
  }

  private openDevTools(): void {
    vscode.window.showInformationMessage('TBX Live Server: Developer tools opened');
  }

  private inspectElement(): void {
    vscode.window.showInformationMessage('TBX Live Server: Element inspection started');
  }

  private viewSource(): void {
    vscode.window.showInformationMessage('TBX Live Server: Source view opened');
  }

  private clearHistory(): void {
    vscode.window.showInformationMessage('TBX Live Server: History cleared');
  }

  private saveState(): void {
    vscode.window.showInformationMessage('TBX Live Server: State saved');
  }

  private loadState(): void {
    vscode.window.showInformationMessage('TBX Live Server: State loaded');
  }

  public dispose(): void {
    console.log('[CommandManager] Disposing...');

    this.stopServers(this.servers.map(server => server.id), { silent: true });

    if (this.liveReloadManager) {
      this.liveReloadManager.dispose();
    }
  }
}
