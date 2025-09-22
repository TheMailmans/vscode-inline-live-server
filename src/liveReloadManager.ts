import * as vscode from 'vscode';
import { CommunicationManager } from './communicationManager';
import { ErrorRecoveryManager } from './errorRecoveryManager';

export class LiveReloadManager {
  private disposables: vscode.Disposable[] = [];
  private fileWatcher: vscode.FileSystemWatcher | null = null;
  private isEnabled: boolean = false;
  private commandManager: any = null; // Will be set by CommandManager

  constructor(
    private communicationManager: CommunicationManager,
    private errorRecoveryManager: ErrorRecoveryManager
  ) {
    // Private constructor for singleton pattern
  }

  public setCommandManager(commandManager: any): void {
    this.commandManager = commandManager;
  }

  public initialize(): void {
    // Set up file system watcher for live reload
    this.setupFileWatcher();

    // Register for configuration changes
    vscode.workspace.onDidChangeConfiguration(
      (e) => {
        if (e.affectsConfiguration('liveServer.settings')) {
          this.handleConfigurationChange();
        }
      },
      null,
      this.disposables
    );

    this.isEnabled = true;
  }

  private setupFileWatcher(): void {
    // Watch for file changes in workspace
    const pattern = '**/*.{html,css,js,ts,jsx,tsx,json,md}';
    this.fileWatcher = vscode.workspace.createFileSystemWatcher(pattern);

    this.fileWatcher.onDidChange(
      (uri) => this.handleFileChange(uri, 'changed'),
      null,
      this.disposables
    );

    this.fileWatcher.onDidCreate(
      (uri) => this.handleFileChange(uri, 'created'),
      null,
      this.disposables
    );

    this.fileWatcher.onDidDelete(
      (uri) => this.handleFileChange(uri, 'deleted'),
      null,
      this.disposables
    );
  }

  private handleFileChange(uri: vscode.Uri, changeType: 'changed' | 'created' | 'deleted'): void {
    if (!this.isEnabled) {
      return;
    }

    // Check if file should be ignored
    const config = vscode.workspace.getConfiguration('liveServer.settings');
    const ignoreFiles = config.get<string[]>('ignoreFiles', []);

    const relativePath = vscode.workspace.asRelativePath(uri);
    const shouldIgnore = ignoreFiles.some(pattern => {
      return relativePath.includes(pattern.replace('**', ''));
    });

    if (shouldIgnore) {
      return;
    }

    // Send file change notification to webview
    if (this.commandManager) {
      this.commandManager.sendFileChangeMessage(relativePath, changeType);
    } else {
      // Fallback to communication manager
      const message = {
        type: 'fileChange',
        payload: {
          file: relativePath,
          changeType: changeType,
          timestamp: Date.now()
        }
      };
      this.communicationManager.sendMessage(message as any);
    }

    // Trigger live reload
    this.triggerLiveReload();
  }

  private triggerLiveReload(): void {
    // Send live reload command to webview
    if (this.commandManager) {
      this.commandManager.sendLiveReloadMessage();
    } else {
      // Fallback to communication manager
      const message = {
        type: 'liveReload',
        payload: {
          action: 'reload',
          timestamp: Date.now()
        }
      };
      this.communicationManager.sendMessage(message as any);
    }
  }

  private handleConfigurationChange(): void {
    // Handle configuration changes that affect live reload
    const config = vscode.workspace.getConfiguration('liveServer.settings');
    const fullReload = config.get<boolean>('fullReload', false);

    if (fullReload) {
      this.triggerLiveReload();
    }
  }

  public setEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
  }

  public isLiveReloadEnabled(): boolean {
    return this.isEnabled;
  }

  public dispose(): void {
    this.isEnabled = false;

    if (this.fileWatcher) {
      this.fileWatcher.dispose();
      this.fileWatcher = null;
    }

    this.disposables.forEach(disposable => disposable.dispose());
    this.disposables = [];
  }
}