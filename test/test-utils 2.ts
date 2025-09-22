import * as assert from 'assert';
import { ExtensionContext, WebviewPanel, ViewColumn, window, Uri, Webview, workspace, commands } from 'vscode';
import { AppModel } from '../src/appModel';
import { WebviewPanelProvider } from '../src/webviewPanelProvider';
import { StatusBarManager } from '../src/statusBarManager';
import { CommandManager } from '../src/commandManager';

/**
 * Test utilities and mocks for Inline Live Server testing
 */

export interface MockExtensionContext extends ExtensionContext {
    subscriptions: any[];
}

export interface MockAppModel {
    onDidGoLive: any;
    onDidGoOffline: any;
    runningPort: number | null;
    Golive: (filePath?: string) => Promise<void>;
    GoOffline: () => void;
}

export interface MockWebviewPanelProvider {
    showWebviewPanel: () => void;
    updatePreview: (serverInfo: any) => void;
    updateStatus: (message: string, isError?: boolean) => void;
    showError: (message: string) => void;
    dispose: () => void;
    panel?: WebviewPanel;
    isPanelVisible?: boolean;
}

export interface MockStatusBarManager {
    updateServerState: (state: any, port?: number) => void;
    updateConnectionStatus: (isConnected: boolean) => void;
    updateWorkspaceInfo: (workspaceName?: string) => void;
    show: () => void;
    hide: () => void;
    dispose: () => void;
    getStatusBarItem: () => any;
    currentState?: any;
}

export interface MockCommandManager {
    registerCommands: (context: any) => void;
    updateCommandStates: () => void;
    registeredCommands?: string[];
}

/**
 * Creates a mock ExtensionContext for testing
 */
export function createMockContext(): MockExtensionContext {
    return {
        subscriptions: [],
        workspaceState: {
            get: () => undefined,
            update: () => Promise.resolve()
        },
        globalState: {
            get: () => undefined,
            update: () => Promise.resolve(),
            setKeysForSync: () => {}
        },
        extensionPath: '/test/path',
        storagePath: '/test/storage',
        globalStoragePath: '/test/globalStorage',
        logPath: '/test/log',
        extensionUri: Uri.file('/test/path'),
        environmentVariableCollection: {
            persistent: false,
            description: '',
            replace: () => {},
            append: () => {},
            prepend: () => {},
            get: () => undefined,
            forEach: () => {},
            clear: () => {},
            delete: () => {},
            getScoped: () => ({})
        },
        extensionMode: 1,
        asAbsolutePath: (relativePath: string) => `/test/path/${relativePath}`,
        workspace: workspace
    } as any;
}

/**
 * Creates a mock AppModel for testing
 */
export function createMockAppModel(): MockAppModel {
    return {
        onDidGoLive: {
            add: () => {},
            remove: () => {}
        },
        onDidGoOffline: {
            add: () => {},
            remove: () => {}
        },
        runningPort: null,
        Golive: async (filePath?: string) => {
            this.runningPort = 5500;
        },
        GoOffline: () => {
            this.runningPort = null;
        }
    } as any;
}

/**
 * Creates a mock WebviewPanelProvider for testing
 */
export function createMockWebviewProvider(): MockWebviewPanelProvider {
    return {
        showWebviewPanel: () => {},
        updatePreview: (serverInfo: any) => {},
        updateStatus: (message: string, isError?: boolean) => {},
        showError: (message: string) => {},
        dispose: () => {},
        panel: undefined,
        isPanelVisible: false
    };
}

/**
 * Creates a mock StatusBarManager for testing
 */
export function createMockStatusBarManager(): MockStatusBarManager {
    return {
        updateServerState: (state: any, port?: number) => {},
        updateConnectionStatus: (isConnected: boolean) => {},
        updateWorkspaceInfo: (workspaceName?: string) => {},
        show: () => {},
        hide: () => {},
        dispose: () => {},
        getStatusBarItem: () => ({ text: '', command: '', tooltip: '', color: undefined }),
        currentState: {
            serverState: 'stopped',
            port: undefined,
            isConnected: false,
            workspaceName: undefined
        }
    };
}

/**
 * Creates a mock CommandManager for testing
 */
export function createMockCommandManager(): MockCommandManager {
    return {
        registerCommands: (context: any) => {},
        updateCommandStates: () => {},
        registeredCommands: []
    };
}

/**
 * Test data fixtures for common scenarios
 */
export const testFixtures = {
    htmlFiles: [
        '/workspace/index.html',
        '/workspace/test.html',
        '/workspace/subfolder/page.html'
    ],
    serverConfigs: {
        basic: {
            port: 5500,
            host: '127.0.0.1',
            protocol: 'http',
            path: 'index.html'
        },
        withCustomPort: {
            port: 3000,
            host: 'localhost',
            protocol: 'http',
            path: 'test.html'
        },
        https: {
            port: 8443,
            host: 'localhost',
            protocol: 'https',
            path: 'secure.html'
        }
    },
    workspacePaths: {
        simple: '/test/workspace',
        nested: '/test/workspace/subfolder',
        withSpaces: '/test/my workspace'
    }
};

/**
 * Helper function to wait for asynchronous operations in tests
 */
export function waitForAsync(milliseconds: number = 100): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

/**
 * Helper function to create test URIs
 */
export function createTestUri(path: string): Uri {
    return Uri.file(path);
}

/**
 * Helper function to mock VS Code APIs for testing
 */
export function mockVSCodeAPIs() {
    const originalShowInformationMessage = window.showInformationMessage;
    const originalShowErrorMessage = window.showErrorMessage;
    const originalShowWarningMessage = window.showWarningMessage;

    const mockMessages: string[] = [];

    // Mock message functions
    window.showInformationMessage = (message: string) => {
        mockMessages.push(`INFO: ${message}`);
        return Promise.resolve(message);
    };

    window.showErrorMessage = (message: string) => {
        mockMessages.push(`ERROR: ${message}`);
        return Promise.resolve(message);
    };

    window.showWarningMessage = (message: string) => {
        mockMessages.push(`WARNING: ${message}`);
        return Promise.resolve(message);
    };

    // Return cleanup function
    return {
        getMessages: () => [...mockMessages],
        clearMessages: () => mockMessages.length = 0,
        restore: () => {
            window.showInformationMessage = originalShowInformationMessage;
            window.showErrorMessage = originalShowErrorMessage;
            window.showWarningMessage = originalShowWarningMessage;
        }
    };
}

/**
 * Helper function to create test webview panels
 */
export function createMockWebviewPanel(): WebviewPanel {
    return {
        viewType: 'test',
        title: 'Test Panel',
        viewColumn: ViewColumn.One,
        active: true,
        visible: true,
        webview: {
            cspSource: 'test-source',
            html: '',
            options: {},
            onDidReceiveMessage: () => ({ dispose: () => {} }),
            postMessage: () => Promise.resolve(true)
        },
        onDidChangeViewState: () => ({ dispose: () => {} }),
        onDidDispose: () => ({ dispose: () => {} }),
        reveal: () => {},
        dispose: () => {}
    } as any;
}

/**
 * Test assertion helpers
 */
export const testHelpers = {
    /**
     * Asserts that a function throws an error with a specific message
     */
    assertThrows: async (fn: () => Promise<any> | any, expectedMessage?: string) => {
        try {
            await fn();
            assert.fail('Expected function to throw an error');
        } catch (error: any) {
            if (expectedMessage) {
                assert.equal(error.message, expectedMessage);
            }
        }
    },

    /**
     * Asserts that a value is defined and not null
     */
    assertDefined: (value: any, message?: string) => {
        assert.ok(value != null, message || 'Expected value to be defined');
    },

    /**
     * Asserts that a string contains a substring
     */
    assertContains: (haystack: string, needle: string, message?: string) => {
        assert.ok(haystack.includes(needle), message || `Expected "${haystack}" to contain "${needle}"`);
    },

    /**
     * Asserts that an array has a minimum length
     */
    assertMinLength: (array: any[], minLength: number, message?: string) => {
        assert.ok(array.length >= minLength, message || `Expected array to have at least ${minLength} items`);
    }
};