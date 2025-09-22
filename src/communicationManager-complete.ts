import * as vscode from 'vscode';
import { CommunicationManager } from './communicationManager';
import { LiveReloadManager } from './liveReloadManager';
import { ErrorRecoveryManager } from './errorRecoveryManager';

export class CommunicationManagerComplete extends CommunicationManager {
  private liveReloadManager: LiveReloadManager;
  private errorRecoveryManager: ErrorRecoveryManager;

  constructor() {
    super();
    this.liveReloadManager = new LiveReloadManager(this, new ErrorRecoveryManager());
    this.errorRecoveryManager = new ErrorRecoveryManager();
  }

  public enableLiveReload(): void {
    this.liveReloadManager.setEnabled(true);
  }

  public disableLiveReload(): void {
    this.liveReloadManager.setEnabled(false);
  }

  public reportError(error: Error, context: string): void {
    this.errorRecoveryManager.handleError(error, context);
  }

  public clearAllErrors(): void {
    // Clear all error states
  }

  public handleServerError(error: Error): void {
    this.reportError(error, 'server');
  }

  public handleConnectionLost(): void {
    this.errorRecoveryManager.handleError(new Error('Connection lost'), 'connection');
  }

  public handleConnectionRestored(): void {
    this.errorRecoveryManager.resetRetryAttempts('connection');
  }

  public override dispose(): void {
    super.dispose();
    this.liveReloadManager.dispose();
    this.errorRecoveryManager.dispose();
  }
}