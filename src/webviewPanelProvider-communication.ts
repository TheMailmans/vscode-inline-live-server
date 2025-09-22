import * as vscode from 'vscode';
import { CommunicationManager } from './communicationManager';

export class WebviewPanelProviderCommunication {
  private communicationManager: CommunicationManager;

  constructor() {
    this.communicationManager = new CommunicationManager();
  }

  public initialize(): void {
    this.communicationManager.initialize();
  }

  public sendMessageToWebview(panel: vscode.WebviewPanel, message: any): void {
    panel.webview.postMessage(message);
  }

  public handleMessageFromWebview(message: any): void {
    this.communicationManager.sendMessage(message);
  }

  public dispose(): void {
    this.communicationManager.dispose();
  }
}