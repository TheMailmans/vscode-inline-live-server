import * as vscode from 'vscode';
import { CommunicationMessage } from './communicationTypes';

export class ErrorRecoveryManager {
  private disposables: vscode.Disposable[] = [];
  private retryAttempts: Map<string, number> = new Map();
  private maxRetries: number = 3;

  constructor() {
    // Private constructor for singleton pattern
  }

  public initialize(): void {
    // Set up error handling
    vscode.workspace.onDidChangeConfiguration(
      (e) => {
        if (e.affectsConfiguration('tbxLivePreview.development')) {
          this.handleConfigurationChange();
        }
      },
      null,
      this.disposables
    );
  }

  public handleError(error: Error, context: string): void {
    console.error(`Error in ${context}:`, error);

    // Log error
    this.logError(error, context);

    // Check if we should attempt recovery
    if (this.shouldAttemptRecovery(context)) {
      this.attemptRecovery(context);
    } else {
      this.showErrorToUser(error, context);
    }
  }

  public handleCommunicationError(message: CommunicationMessage): void {
    const errorMessage = message as any;
    const error = new Error(errorMessage.payload?.message || 'Communication error');
    this.handleError(error, 'communication');
  }

  private logError(error: Error, context: string): void {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] Error in ${context}: ${error.message}`;

    // Log to output channel
    const config = vscode.workspace.getConfiguration('tbxLivePreview.development');
    const logLevel = config.get<string>('logLevel', 'info');

    if (logLevel === 'debug' || logLevel === 'info') {
      console.error(logMessage);
      if (error.stack) {
        console.error(error.stack);
      }
    }
  }

  private shouldAttemptRecovery(context: string): boolean {
    const attempts = this.retryAttempts.get(context) || 0;
    return attempts < this.maxRetries;
  }

  private attemptRecovery(context: string): void {
    const attempts = this.retryAttempts.get(context) || 0;
    this.retryAttempts.set(context, attempts + 1);

    console.log(`Attempting recovery for ${context} (attempt ${attempts + 1}/${this.maxRetries})`);

    // Attempt recovery based on context
    switch (context) {
      case 'server':
        this.recoverServer();
        break;
      case 'webview':
        this.recoverWebview();
        break;
      case 'communication':
        this.recoverCommunication();
        break;
      default:
        console.log(`No recovery strategy for context: ${context}`);
    }
  }

  private recoverServer(): void {
    // Attempt to restart the server
    vscode.commands.executeCommand('extension.liveServer.goOnline');
  }

  private recoverWebview(): void {
    // Attempt to recreate webview panel
    vscode.commands.executeCommand('extension.liveServer.startWebview');
  }

  private recoverCommunication(): void {
    // Attempt to reinitialize communication
    vscode.window.showInformationMessage('Attempting to restore communication...');
  }

  private showErrorToUser(error: Error, context: string): void {
    const message = `Inline Live Server: Error in ${context} - ${error.message}`;
    vscode.window.showErrorMessage(message, 'Retry', 'Show Details').then(selection => {
      if (selection === 'Retry') {
        this.retryAttempts.delete(context);
        this.attemptRecovery(context);
      } else if (selection === 'Show Details') {
        this.showErrorDetails(error, context);
      }
    });
  }

  private showErrorDetails(error: Error, context: string): void {
    const details = `Context: ${context}\nMessage: ${error.message}\nStack: ${error.stack || 'No stack trace'}`;
    vscode.workspace.openTextDocument({
      content: details,
      language: 'log'
    }).then(doc => {
      vscode.window.showTextDocument(doc);
    });
  }

  private handleConfigurationChange(): void {
    const config = vscode.workspace.getConfiguration('tbxLivePreview.development');
    this.maxRetries = config.get<number>('maxRetries', 3);
  }

  public resetRetryAttempts(context: string): void {
    this.retryAttempts.delete(context);
  }

  public dispose(): void {
    this.retryAttempts.clear();
    this.disposables.forEach(disposable => disposable.dispose());
    this.disposables = [];
  }
}