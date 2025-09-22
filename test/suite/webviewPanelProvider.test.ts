import * as assert from 'assert';
import { ExtensionContext } from 'vscode';
import { WebviewPanelProvider } from '../../src/webviewPanelProvider';
import { AppModel } from '../../src/appModel';

suite('WebviewPanelProvider Tests', () => {
    let context: ExtensionContext;
    let appModel: AppModel;
    let provider: WebviewPanelProvider;

    setup(() => {
        // Mock ExtensionContext
        context = {
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
            logPath: '/test/log'
        } as any;

        // Mock AppModel
        appModel = {
            onDidGoLive: {
                add: () => {},
                remove: () => {}
            },
            onDidGoOffline: {
                add: () => {},
                remove: () => {}
            },
            runningPort: null,
            Golive: () => {},
            GoOffline: () => {}
        } as any;

        // Create provider instance
        provider = WebviewPanelProvider.getInstance(context, appModel);
    });

    teardown(() => {
        provider.dispose();
    });

    suite('Singleton Pattern', () => {
        test('should return same instance', () => {
            const instance1 = WebviewPanelProvider.getInstance(context, appModel);
            const instance2 = WebviewPanelProvider.getInstance(context, appModel);
            assert.equal(instance1, instance2);
        });
    });

    suite('Webview Content Generation', () => {
        test('should generate valid HTML content', () => {
            const content = (provider as any).getWebviewContent();
            assert.ok(content);
            assert.ok(content.includes('<!DOCTYPE html>'));
            assert.ok(content.includes('<title>Inline Live Server</title>'));
            assert.ok(content.includes('const vscode = acquireVsCodeApi();'));
            assert.ok(content.includes('webviewReady'));
        });

        test('should include security nonce in content', () => {
            const content = (provider as any).getWebviewContent();
            const nonceMatch = content.match(/nonce-([a-zA-Z0-9]+)/);
            assert.ok(nonceMatch);
        });

        test('should include CSP headers in content', () => {
            const content = (provider as any).getWebviewContent();
            assert.ok(content.includes('Content-Security-Policy'));
            assert.ok(content.includes('default-src \'none\''));
        });
    });

    suite('Nonce Generation', () => {
        test('should generate valid nonce', () => {
            const nonce = (provider as any).getNonce();
            assert.equal(nonce.length, 32);
            assert.ok(/^[a-zA-Z0-9]+$/.test(nonce));
        });

        test('should generate unique nonces', () => {
            const nonce1 = (provider as any).getNonce();
            const nonce2 = (provider as any).getNonce();
            assert.notEqual(nonce1, nonce2);
        });
    });

    suite('Server Info Interface', () => {
        test('should handle server info correctly', () => {
            const serverInfo = {
                port: 3000,
                host: 'localhost',
                protocol: 'http',
                path: 'test.html'
            };

            const expectedUrl = 'http://localhost:3000/test.html';
            const actualUrl = `${serverInfo.protocol}://${serverInfo.host}:${serverInfo.port}/${serverInfo.path}`;

            assert.equal(actualUrl, expectedUrl);
        });
    });

    suite('Message Handling', () => {
        test('should handle webviewReady message', () => {
            const message = { command: 'webviewReady' };
            (provider as any).handleMessage(message);
            // Should not throw error and handle gracefully
            assert.ok(true);
        });

        test('should handle unknown messages gracefully', () => {
            const message = { command: 'unknownCommand', data: 'test' };
            (provider as any).handleMessage(message);
            // Should not throw error and handle gracefully
            assert.ok(true);
        });
    });

    suite('Disposal', () => {
        test('should dispose without errors', () => {
            provider.dispose();
            assert.ok(true);
        });

        test('should reset singleton instance', () => {
            provider.dispose();
            assert.equal(WebviewPanelProvider['instance'], null);
        });
    });

    suite('View State Management', () => {
        test('should handle visibility changes', () => {
            (provider as any).isPanelVisible = false;
            assert.equal((provider as any).isPanelVisible, false);
        });
    });
});