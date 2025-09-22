import * as vscode from 'vscode';
import { CommunicationManager } from './communicationManager';
import { LiveReloadManager } from './liveReloadManager';

export class CommunicationManagerEnhanced extends CommunicationManager {
  private liveReloadManager: LiveReloadManager;

  constructor() {
    super();
    this.liveReloadManager = new LiveReloadManager(this, new (require('./errorRecoveryManager').ErrorRecoveryManager)());
  }

  public enableLiveReload(): void {
    this.liveReloadManager.setEnabled(true);
  }

  public disableLiveReload(): void {
    this.liveReloadManager.setEnabled(false);
  }

  public override dispose(): void {
    super.dispose();
    this.liveReloadManager.dispose();
  }
}