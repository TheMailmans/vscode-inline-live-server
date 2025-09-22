import * as vscode from 'vscode';

export type ServerState = 'stopped' | 'running' | 'error';

export class StatusBarManager {
  private statusBarItem: vscode.StatusBarItem;
  private serverState: ServerState = 'stopped';

  constructor() {
    this.statusBarItem = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Left,
      100
    );
  }

  public initialize(): void {
    this.statusBarItem.command = 'extension.liveServer.showFileBrowser';
    this.updateServerState(this.serverState);
    this.statusBarItem.show();
  }

  public updateServerState(state: ServerState, runningCount: number = 0): void {
    this.serverState = state;

    switch (state) {
      case 'stopped':
        this.statusBarItem.text = '$(circle-slash) TBX Live Server';
        this.statusBarItem.tooltip = 'TBX Live Server - Click to browse files';
        this.statusBarItem.command = 'extension.liveServer.showFileBrowser';
        this.statusBarItem.backgroundColor = undefined;
        break;
      case 'running':
        if (runningCount > 1) {
          this.statusBarItem.text = `$(broadcast) TBX Live Server (${runningCount})`;
          this.statusBarItem.tooltip = `${runningCount} TBX Live Server servers running`;
        } else {
          this.statusBarItem.text = '$(circle-filled) TBX Live Server';
          this.statusBarItem.tooltip = 'TBX Live Server - Server running';
        }
        this.statusBarItem.command = 'extension.liveServer.goOffline';
        this.statusBarItem.backgroundColor = new vscode.ThemeColor(
          'statusBarItem.prominentBackground'
        );
        break;
      case 'error':
        this.statusBarItem.text = '$(error) TBX Live Server';
        this.statusBarItem.tooltip = 'TBX Live Server - Server error, click to browse files';
        this.statusBarItem.command = 'extension.liveServer.showFileBrowser';
        this.statusBarItem.backgroundColor = new vscode.ThemeColor(
          'statusBarItem.errorBackground'
        );
        break;
    }
  }

  public getServerState(): ServerState {
    return this.serverState;
  }

  public dispose(): void {
    if (this.statusBarItem) {
      this.statusBarItem.dispose();
    }
  }
}
