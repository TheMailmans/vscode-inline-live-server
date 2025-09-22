import * as vscode from 'vscode';
import { CommunicationMessage, Message } from './communicationTypes';

export class CommunicationManager {
  private disposables: vscode.Disposable[] = [];
  private messageHandlers: Map<string, (message: CommunicationMessage) => void> = new Map();

  constructor() {
    // Private constructor for singleton pattern
  }

  public initialize(): void {
    // Set up message handling
    this.registerMessageHandler('serverStatus', this.handleServerStatus.bind(this));
    this.registerMessageHandler('navigation', this.handleNavigation.bind(this));
    this.registerMessageHandler('error', this.handleError.bind(this));
  }

  public registerMessageHandler(
    type: string,
    handler: (message: CommunicationMessage) => void
  ): void {
    this.messageHandlers.set(type, handler);
  }

  public unregisterMessageHandler(type: string): void {
    this.messageHandlers.delete(type);
  }

  public sendMessage(message: CommunicationMessage): void {
    const handler = this.messageHandlers.get(message.type);
    if (handler) {
      handler(message);
    }
  }

  public broadcastMessage(message: CommunicationMessage): void {
    // Broadcast to all registered handlers
    this.messageHandlers.forEach(handler => {
      try {
        handler(message);
      } catch (error) {
        console.error('Error in message handler:', error);
      }
    });
  }

  private handleServerStatus(message: CommunicationMessage): void {
    const statusMessage = message as any;
    console.log('Server status:', statusMessage.payload?.status);

    // Update status bar based on server status
    const status = statusMessage.payload?.status;
    if (status === 'running') {
      vscode.window.showInformationMessage('Server is running');
    } else if (status === 'stopped') {
      vscode.window.showInformationMessage('Server stopped');
    } else if (status === 'error') {
      vscode.window.showErrorMessage('Server error occurred');
    }
  }

  private handleNavigation(message: CommunicationMessage): void {
    const navMessage = message as any;
    console.log('Navigation:', navMessage.payload?.action);
  }

  private handleError(message: CommunicationMessage): void {
    const errorMessage = message as any;
    console.error('Communication error:', errorMessage.payload?.message);
    vscode.window.showErrorMessage(`Communication error: ${errorMessage.payload?.message}`);
  }

  public dispose(): void {
    this.messageHandlers.clear();
    this.disposables.forEach(disposable => disposable.dispose());
    this.disposables = [];
  }
}