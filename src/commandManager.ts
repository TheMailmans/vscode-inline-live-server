import * as vscode from 'vscode';
import { StatusBarManager } from './statusBarManager';

export class CommandManager {
  private statusBarManager: StatusBarManager;

  constructor() {
    this.statusBarManager = new StatusBarManager();
  }

  public executeCommand(command: string, contextUri?: vscode.Uri): void {
    switch (command) {
      case 'goOffline':
        this.goOffline();
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
        vscode.window.showErrorMessage(`Unknown command: ${command}`);
    }
  }

  private goOffline(): void {
    vscode.window.showInformationMessage('Inline Live Server: Server stopped');
    this.statusBarManager.updateServerState('stopped');
  }

  private goOnline(contextUri?: vscode.Uri): void {
    const message = contextUri
      ? `Inline Live Server: Server started for ${contextUri.fsPath}`
      : 'Inline Live Server: Server started';
    vscode.window.showInformationMessage(message);
    this.statusBarManager.updateServerState('running');
  }

  private showFileBrowser(): void {
    vscode.window.showInformationMessage('Inline Live Server: File browser (basic implementation)');
  }

  private changeWorkspace(): void {
    vscode.window.showInformationMessage('Inline Live Server: Workspace changed');
  }

  private startWebview(): void {
    vscode.window.showInformationMessage('Inline Live Server: Webview started');
  }

  private navigateHome(): void {
    vscode.window.showInformationMessage('Inline Live Server: Navigated to home');
  }

  private zoomIn(): void {
    vscode.window.showInformationMessage('Inline Live Server: Zoomed in');
  }

  private zoomOut(): void {
    vscode.window.showInformationMessage('Inline Live Server: Zoomed out');
  }

  private resetZoom(): void {
    vscode.window.showInformationMessage('Inline Live Server: Zoom reset');
  }

  private toggleSplitView(): void {
    vscode.window.showInformationMessage('Inline Live Server: Split view toggled');
  }

  private toggleFullScreen(): void {
    vscode.window.showInformationMessage('Inline Live Server: Full screen toggled');
  }

  private openDevTools(): void {
    vscode.window.showInformationMessage('Inline Live Server: Developer tools opened');
  }

  private inspectElement(): void {
    vscode.window.showInformationMessage('Inline Live Server: Element inspection started');
  }

  private viewSource(): void {
    vscode.window.showInformationMessage('Inline Live Server: Source view opened');
  }

  private clearHistory(): void {
    vscode.window.showInformationMessage('Inline Live Server: History cleared');
  }

  private saveState(): void {
    vscode.window.showInformationMessage('Inline Live Server: State saved');
  }

  private loadState(): void {
    vscode.window.showInformationMessage('Inline Live Server: State loaded');
  }
}