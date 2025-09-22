import * as vscode from 'vscode';
import { CommandManager } from './commandManager';
import { WebviewPanelProvider } from './webviewPanelProvider';
import { StatusBarManager } from './statusBarManager';
import { LiveReloadManager } from './liveReloadManager';
import { CommunicationManager } from './communicationManager';
import { ErrorRecoveryManager } from './errorRecoveryManager';

let commandManager: CommandManager;
let webviewPanelProvider: WebviewPanelProvider;
let statusBarManager: StatusBarManager;
let liveReloadManager: LiveReloadManager;
let communicationManager: CommunicationManager;
let errorRecoveryManager: ErrorRecoveryManager;

export function activate(context: vscode.ExtensionContext) {
  console.log('TBX Live Server extension is now active!');

  // Initialize managers
  commandManager = new CommandManager();
  webviewPanelProvider = new WebviewPanelProvider(context.extensionUri);
  statusBarManager = new StatusBarManager();
  communicationManager = new CommunicationManager();
  errorRecoveryManager = new ErrorRecoveryManager();

  // Initialize live reload manager with dependencies
  liveReloadManager = new LiveReloadManager(
    communicationManager,
    errorRecoveryManager
  );

  // Register commands
  const commands = [
    vscode.commands.registerCommand('extension.liveServer.goOffline', () => {
      commandManager.executeCommand('goOffline');
    }),
    vscode.commands.registerCommand('extension.liveServer.goOnline', (uri?: vscode.Uri) => {
      commandManager.executeCommand('goOnline', uri);
    }),
    vscode.commands.registerCommand('extension.liveServer.showFileBrowser', () => {
      commandManager.executeCommand('showFileBrowser');
    }),
    vscode.commands.registerCommand('extension.liveServer.changeWorkspace', () => {
      commandManager.executeCommand('changeWorkspace');
    }),
    vscode.commands.registerCommand('extension.liveServer.startWebview', () => {
      commandManager.executeCommand('startWebview');
    }),
    vscode.commands.registerCommand('extension.liveServer.navigateHome', () => {
      commandManager.executeCommand('navigateHome');
    }),
    vscode.commands.registerCommand('extension.liveServer.zoomIn', () => {
      commandManager.executeCommand('zoomIn');
    }),
    vscode.commands.registerCommand('extension.liveServer.zoomOut', () => {
      commandManager.executeCommand('zoomOut');
    }),
    vscode.commands.registerCommand('extension.liveServer.resetZoom', () => {
      commandManager.executeCommand('resetZoom');
    }),
    vscode.commands.registerCommand('extension.liveServer.toggleSplitView', () => {
      commandManager.executeCommand('toggleSplitView');
    }),
    vscode.commands.registerCommand('extension.liveServer.toggleFullScreen', () => {
      commandManager.executeCommand('toggleFullScreen');
    }),
    vscode.commands.registerCommand('extension.liveServer.openDevTools', () => {
      commandManager.executeCommand('openDevTools');
    }),
    vscode.commands.registerCommand('extension.liveServer.inspectElement', () => {
      commandManager.executeCommand('inspectElement');
    }),
    vscode.commands.registerCommand('extension.liveServer.viewSource', () => {
      commandManager.executeCommand('viewSource');
    }),
    vscode.commands.registerCommand('extension.liveServer.clearHistory', () => {
      commandManager.executeCommand('clearHistory');
    }),
    vscode.commands.registerCommand('extension.liveServer.saveState', () => {
      commandManager.executeCommand('saveState');
    }),
    vscode.commands.registerCommand('extension.liveServer.loadState', () => {
      commandManager.executeCommand('loadState');
    })
  ];

  // Register all commands
  commands.forEach(command => context.subscriptions.push(command));

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

}

export function deactivate() {
  console.log('TBX Live Server extension is now deactivated!');

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
}
