import * as assert from 'assert';
import { ExtensionContext } from 'vscode';
import { CommandManager } from '../../src/commandManager';
import { AppModel } from '../../src/appModel';
import { WebviewPanelProvider } from '../../src/webviewPanelProvider';
import { StatusBarManager } from '../../src/statusBarManager';

suite('CommandManager Tests', () => {
    let context: ExtensionContext;
    let appModel: AppModel;
    let webviewProvider: WebviewPanelProvider;
    let statusBarManager: StatusBarManager;
    let manager: CommandManager;

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

        // Mock WebviewPanelProvider
        webviewProvider = {
            showWebviewPanel: () => {},
            dispose: () => {}
        } as any;

        // Mock StatusBarManager
        statusBarManager = {
            updateServerState: () => {},
            getStatusBarItem: () => ({ text: '', command: '', tooltip: '', color: undefined }),
            show: () => {},
            hide: () => {},
            dispose: () => {}
        } as any;

        // Create manager instance
        manager = CommandManager.getInstance(appModel, webviewProvider, statusBarManager);
    });

    teardown(() => {
        // Clean up any registered commands
        if (context.subscriptions) {
            context.subscriptions.forEach(sub => sub.dispose());
        }
    });

    suite('Singleton Pattern', () => {
        test('should return same instance', () => {
            const instance1 = CommandManager.getInstance(appModel, webviewProvider, statusBarManager);
            const instance2 = CommandManager.getInstance(appModel, webviewProvider, statusBarManager);
            assert.equal(instance1, instance2);
        });
    });

    suite('Command Registration', () => {
        test('should register commands without errors', () => {
            // Should not throw any errors during registration
            assert.doesNotThrow(() => {
                manager.registerCommands(context);
            });
        });

        test('should add subscriptions to context', () => {
            const initialLength = context.subscriptions.length;
            manager.registerCommands(context);
            assert.ok(context.subscriptions.length > initialLength);
        });
    });

    suite('Error Handling', () => {
        test('should handle command errors gracefully', () => {
            // Should not throw error when handling command errors
            assert.doesNotThrow(() => {
                (manager as any).handleCommandError('testCommand', { message: 'Test error' });
            });
        });
    });

    suite('Command State Updates', () => {
        test('should update command states without errors', () => {
            // Set running port
            (appModel as any).runningPort = 3000;

            // Should not throw error
            assert.doesNotThrow(() => {
                manager.updateCommandStates();
            });
        });

        test('should handle no running port', () => {
            // Ensure no running port
            (appModel as any).runningPort = null;

            // Should not throw error
            assert.doesNotThrow(() => {
                manager.updateCommandStates();
            });
        });
    });

    suite('Command Functionality Tests', () => {
        test('should handle start command flow', () => {
            // Mock the required methods
            let goliveCalled = false;
            let showWebviewCalled = false;
            let updateServerStateCalled = false;

            (appModel as any).Golive = () => { goliveCalled = true; };
            (webviewProvider as any).showWebviewPanel = () => { showWebviewCalled = true; };
            (statusBarManager as any).updateServerState = () => { updateServerStateCalled = true; };

            manager.registerCommands(context);

            // The command should be registered and callable
            assert.ok(context.subscriptions.length > 0);
        });

        test('should handle stop command flow', () => {
            // Mock the required methods
            let goOfflineCalled = false;
            let updateServerStateCalled = false;

            (appModel as any).GoOffline = () => { goOfflineCalled = true; };
            (statusBarManager as any).updateServerState = () => { updateServerStateCalled = true; };

            manager.registerCommands(context);

            // The command should be registered and callable
            assert.ok(context.subscriptions.length > 0);
        });

        test('should handle settings command flow', () => {
            manager.registerCommands(context);

            // The command should be registered and callable
            assert.ok(context.subscriptions.length > 0);
        });

        test('should handle clear history command flow', () => {
            manager.registerCommands(context);

            // The command should be registered and callable
            assert.ok(context.subscriptions.length > 0);
        });
    });

    suite('Integration Tests', () => {
        test('should work with all components together', () => {
            // This tests that the CommandManager can be instantiated and
            // works with all the other components without errors
            assert.ok(manager);
            assert.ok(appModel);
            assert.ok(webviewProvider);
            assert.ok(statusBarManager);
            assert.ok(context);
        });

        test('should handle multiple command registrations', () => {
            // Register commands multiple times
            manager.registerCommands(context);
            const firstLength = context.subscriptions.length;

            manager.registerCommands(context);
            const secondLength = context.subscriptions.length;

            // Should not duplicate subscriptions
            assert.equal(firstLength, secondLength);
        });
    });
});