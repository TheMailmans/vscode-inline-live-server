import * as vscode from 'vscode';

export class TestUtils {
  static createMockWebviewPanel(): vscode.WebviewPanel {
    const mockPanel = {
      viewType: 'test',
      title: 'Test Panel',
      viewColumn: vscode.ViewColumn.One,
      active: true,
      visible: true,
      webview: {
        html: '',
        options: {},
        onDidReceiveMessage: jest.fn(),
        postMessage: jest.fn(),
        asWebviewUri: jest.fn(),
        cspSource: 'test'
      },
      onDidChangeViewState: jest.fn(),
      onDidDispose: jest.fn(),
      reveal: jest.fn(),
      dispose: jest.fn()
    } as any;

    return mockPanel;
  }

  static createMockExtensionContext(): vscode.ExtensionContext {
    return {
      subscriptions: [],
      workspaceState: {
        get: jest.fn(),
        update: jest.fn()
      },
      globalState: {
        get: jest.fn(),
        update: jest.fn(),
        setKeysForSync: jest.fn()
      },
      extensionUri: vscode.Uri.file('/test'),
      extensionPath: '/test',
      environmentVariableCollection: {} as any,
      storageUri: vscode.Uri.file('/test/storage'),
      globalStorageUri: vscode.Uri.file('/test/globalStorage'),
      logUri: vscode.Uri.file('/test/log'),
      extensionMode: vscode.ExtensionMode.Development,
      asAbsolutePath: jest.fn((relativePath) => `/test/${relativePath}`)
    } as any;
  }

  static createMockMemento<T>(data: T = {} as T): vscode.Memento {
    return {
      get: jest.fn((key: string) => data[key as keyof T]),
      update: jest.fn()
    } as any;
  }

  static async waitForCondition(
    condition: () => boolean | Promise<boolean>,
    timeout: number = 5000
  ): Promise<void> {
    const startTime = Date.now();

    while (Date.now() - startTime < timeout) {
      if (await condition()) {
        return;
      }
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    throw new Error('Condition not met within timeout');
  }
}