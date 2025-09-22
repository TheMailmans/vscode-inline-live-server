import * as vscode from 'vscode';
import { CommandManagerEnhanced } from './commandManager-enhanced';
import { WebviewPanelProvider } from './webviewPanelProvider';
import { StatusBarManager } from './statusBarManager';
import { LiveReloadManager } from './liveReloadManager';
import { CommunicationManager } from './communicationManager';
import { ErrorRecoveryManager } from './errorRecoveryManager';

let commandManager: CommandManagerEnhanced;
let webviewPanelProvider: WebviewPanelProvider;
let statusBarManager: StatusBarManager;
let liveReloadManager: LiveReloadManager;
let communicationManager: CommunicationManager;
let errorRecoveryManager: ErrorRecoveryManager;

export function activate(context: vscode.ExtensionContext) {
  console.log('TBX Live Server extension is now active!');
  console.log('[Extension] Starting enhanced command manager...');

  try {
    // Initialize managers
    communicationManager = new CommunicationManager();
    errorRecoveryManager = new ErrorRecoveryManager();

    // Initialize enhanced command manager with dependencies
    commandManager = new CommandManagerEnhanced(
      communicationManager,
      errorRecoveryManager
    );

    webviewPanelProvider = new WebviewPanelProvider(context.extensionUri);
    statusBarManager = new StatusBarManager();

    // Initialize live reload manager with dependencies
    liveReloadManager = new LiveReloadManager(
      communicationManager,
      errorRecoveryManager
    );

    console.log('[Extension] Registering commands...');

    // Register commands with enhanced logging
    const commands = [
      vscode.commands.registerCommand('extension.liveServer.goOffline', () => {
        console.log('[Extension] Executing command: extension.liveServer.goOffline');
        commandManager.executeCommand('goOffline');
      }),
      vscode.commands.registerCommand('extension.liveServer.goOnline', (uri?: vscode.Uri) => {
        console.log('[Extension] Executing command: extension.liveServer.goOnline', uri ? `with URI: ${uri.fsPath}` : 'without URI');
        commandManager.executeCommand('goOnline', uri);
      }),
      vscode.commands.registerCommand('extension.liveServer.showFileBrowser', () => {
        console.log('[Extension] Executing command: extension.liveServer.showFileBrowser');
        commandManager.executeCommand('showFileBrowser');
      }),
      vscode.commands.registerCommand('extension.liveServer.changeWorkspace', () => {
        console.log('[Extension] Executing command: extension.liveServer.changeWorkspace');
        commandManager.executeCommand('changeWorkspace');
      }),
      vscode.commands.registerCommand('extension.liveServer.startWebview', () => {
        console.log('[Extension] Executing command: extension.liveServer.startWebview');
        commandManager.executeCommand('startWebview');
      }),
      vscode.commands.registerCommand('extension.liveServer.navigateHome', () => {
        console.log('[Extension] Executing command: extension.liveServer.navigateHome');
        commandManager.executeCommand('navigateHome');
      }),
      vscode.commands.registerCommand('extension.liveServer.zoomIn', () => {
        console.log('[Extension] Executing command: extension.liveServer.zoomIn');
        commandManager.executeCommand('zoomIn');
      }),
      vscode.commands.registerCommand('extension.liveServer.zoomOut', () => {
        console.log('[Extension] Executing command: extension.liveServer.zoomOut');
        commandManager.executeCommand('zoomOut');
      }),
      vscode.commands.registerCommand('extension.liveServer.resetZoom', () => {
        console.log('[Extension] Executing command: extension.liveServer.resetZoom');
        commandManager.executeCommand('resetZoom');
      }),
      vscode.commands.registerCommand('extension.liveServer.toggleSplitView', () => {
        console.log('[Extension] Executing command: extension.liveServer.toggleSplitView');
        commandManager.executeCommand('toggleSplitView');
      }),
      vscode.commands.registerCommand('extension.liveServer.toggleFullScreen', () => {
        console.log('[Extension] Executing command: extension.liveServer.toggleFullScreen');
        commandManager.executeCommand('toggleFullScreen');
      }),
      vscode.commands.registerCommand('extension.liveServer.openDevTools', () => {
        console.log('[Extension] Executing command: extension.liveServer.openDevTools');
        commandManager.executeCommand('openDevTools');
      }),
      vscode.commands.registerCommand('extension.liveServer.inspectElement', () => {
        console.log('[Extension] Executing command: extension.liveServer.inspectElement');
        commandManager.executeCommand('inspectElement');
      }),
      vscode.commands.registerCommand('extension.liveServer.viewSource', () => {
        console.log('[Extension] Executing command: extension.liveServer.viewSource');
        commandManager.executeCommand('viewSource');
      }),
      vscode.commands.registerCommand('extension.liveServer.clearHistory', () => {
        console.log('[Extension] Executing command: extension.liveServer.clearHistory');
        commandManager.executeCommand('clearHistory');
      }),
      vscode.commands.registerCommand('extension.liveServer.saveState', () => {
        console.log('[Extension] Executing command: extension.liveServer.saveState');
        commandManager.executeCommand('saveState');
      }),
      vscode.commands.registerCommand('extension.liveServer.loadState', () => {
        console.log('[Extension] Executing command: extension.liveServer.loadState');
        commandManager.executeCommand('loadState');
      })
    ];

    // Register all commands with error handling
    commands.forEach((command, index) => {
      try {
        context.subscriptions.push(command);
        console.log(`[Extension] Command ${index + 1}/${commands.length} registered successfully`);
      } catch (error) {
        console.error(`[Extension] Failed to register command ${index + 1}:`, error);
        vscode.window.showErrorMessage(`Failed to register command: ${error}`);
      }
    });

    console.log(`[Extension] All ${commands.length} commands registered successfully`);

    // Initialize status bar
    statusBarManager.initialize();

    // Initialize webview provider
    context.subscriptions.push(
      vscode.window.registerWebviewPanelSerializer(
        'tbxLivePreview',
        webviewPanelProvider
      )
    );

    // Initialize communication manager
    communicationManager.initialize();

    // Initialize error recovery
    errorRecoveryManager.initialize();

    console.log('[Extension] Inline Live Server extension activated successfully!');
  } catch (error) {
    console.error('[Extension] Error during activation:', error);
    vscode.window.showErrorMessage(`Extension activation failed: ${error}`);
  }
}

export function deactivate() {
  console.log('[Extension] TBX Live Server extension is now deactivated!');

  try {
    // Cleanup managers
    if (liveReloadManager) {
      liveReloadManager.dispose();
    }

    if (communicationManager) {
      communicationManager.dispose();
    }

    if (errorRecoveryManager) {
      errorRecoveryManager.dispose();
    }

    if (statusBarManager) {
      statusBarManager.dispose();
    }

    if (commandManager) {
      commandManager.dispose();
    }

    console.log('[Extension] Cleanup completed successfully');
  } catch (error) {
    console.error('[Extension] Error during deactivation:', error);
  }
}
