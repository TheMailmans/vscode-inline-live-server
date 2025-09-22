import * as assert from 'assert';
import { ExtensionContext, StatusBarItem, window } from 'vscode';
import { StatusBarManager, ServerState } from '../../src/statusBarManager';
import { AppModel } from '../../src/appModel';
import { WebviewPanelProvider } from '../../src/webviewPanelProvider';

suite('StatusBarManager Tests', () => {
    let context: ExtensionContext;
    let appModel: AppModel;
    let webviewProvider: WebviewPanelProvider;
    let manager: StatusBarManager;

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

        // Create manager instance
        manager = StatusBarManager.getInstance(appModel, webviewProvider);
    });

    teardown(() => {
        manager.dispose();
    });

    suite('Singleton Pattern', () => {
        test('should return same instance', () => {
            const instance1 = StatusBarManager.getInstance(appModel, webviewProvider);
            const instance2 = StatusBarManager.getInstance(appModel, webviewProvider);
            assert.equal(instance1, instance2);
        });
    });

    suite('Server State Management', () => {
        test('should update server state correctly', () => {
            manager.updateServerState(ServerState.RUNNING, 3000);
            const state = (manager as any).currentState;
            assert.equal(state.serverState, ServerState.RUNNING);
            assert.equal(state.port, 3000);
            assert.equal(state.isConnected, true);
        });

        test('should handle stopped state', () => {
            manager.updateServerState(ServerState.STOPPED);
            const state = (manager as any).currentState;
            assert.equal(state.serverState, ServerState.STOPPED);
            assert.equal(state.isConnected, false);
        });

        test('should handle error state', () => {
            manager.updateServerState(ServerState.ERROR);
            const state = (manager as any).currentState;
            assert.equal(state.serverState, ServerState.ERROR);
            assert.equal(state.isConnected, false);
        });

        test('should handle starting state', () => {
            manager.updateServerState(ServerState.STARTING);
            const state = (manager as any).currentState;
            assert.equal(state.serverState, ServerState.STARTING);
            assert.equal(state.isConnected, false);
        });
    });

    suite('Connection Status', () => {
        test('should update connection status independently', () => {
            manager.updateConnectionStatus(true);
            const state = (manager as any).currentState;
            assert.equal(state.isConnected, true);

            manager.updateConnectionStatus(false);
            const state2 = (manager as any).currentState;
            assert.equal(state2.isConnected, false);
        });
    });

    suite('Workspace Info', () => {
        test('should update workspace name', () => {
            manager.updateWorkspaceInfo('Test Workspace');
            const state = (manager as any).currentState;
            assert.equal(state.workspaceName, 'Test Workspace');
        });

        test('should handle undefined workspace name', () => {
            manager.updateWorkspaceInfo(undefined);
            const state = (manager as any).currentState;
            assert.equal(state.workspaceName, undefined);
        });
    });

    suite('Status Bar Text Updates', () => {
        test('should set correct text for stopped state', () => {
            manager.updateServerState(ServerState.STOPPED);
            const statusBarItem = manager.getStatusBarItem();
            assert.equal(statusBarItem.text, '$(circle-slash) Inline Live Server');
        });

        test('should set correct text for starting state', () => {
            manager.updateServerState(ServerState.STARTING);
            const statusBarItem = manager.getStatusBarItem();
            assert.equal(statusBarItem.text, '$(pulse) Inline Live Server');
        });

        test('should set correct text for running state with port', () => {
            manager.updateServerState(ServerState.RUNNING, 3000);
            const statusBarItem = manager.getStatusBarItem();
            assert.equal(statusBarItem.text, '$(check) Inline Live Server:3000');
        });

        test('should set correct text for running state without port', () => {
            manager.updateServerState(ServerState.RUNNING);
            const statusBarItem = manager.getStatusBarItem();
            assert.equal(statusBarItem.text, '$(check) Inline Live Server');
        });

        test('should set correct text for error state', () => {
            manager.updateServerState(ServerState.ERROR);
            const statusBarItem = manager.getStatusBarItem();
            assert.equal(statusBarItem.text, '$(error) Inline Live Server');
        });
    });

    suite('Status Bar Commands', () => {
        test('should set correct command for stopped state', () => {
            manager.updateServerState(ServerState.STOPPED);
            const statusBarItem = manager.getStatusBarItem();
            assert.equal(statusBarItem.command, 'inlineLivePreview.start');
        });

        test('should set correct command for starting state', () => {
            manager.updateServerState(ServerState.STARTING);
            const statusBarItem = manager.getStatusBarItem();
            assert.equal(statusBarItem.command, 'inlineLivePreview.stop');
        });

        test('should set correct command for running state', () => {
            manager.updateServerState(ServerState.RUNNING);
            const statusBarItem = manager.getStatusBarItem();
            assert.equal(statusBarItem.command, 'inlineLivePreview.stop');
        });

        test('should set correct command for error state', () => {
            manager.updateServerState(ServerState.ERROR);
            const statusBarItem = manager.getStatusBarItem();
            assert.equal(statusBarItem.command, 'inlineLivePreview.start');
        });
    });

    suite('Tooltip Content', () => {
        test('should generate tooltip for stopped state', () => {
            manager.updateServerState(ServerState.STOPPED);
            const statusBarItem = manager.getStatusBarItem();
            const tooltip = statusBarItem.tooltip;
            assert.ok(tooltip);
            const tooltipStr = typeof tooltip === 'string' ? tooltip : tooltip.value;
            assert.ok(tooltipStr.includes('Status: Stopped'));
            assert.ok(tooltipStr.includes('Click to start server'));
        });

        test('should generate tooltip for running state', () => {
            manager.updateServerState(ServerState.RUNNING, 3000);
            manager.updateWorkspaceInfo('Test Workspace');
            const statusBarItem = manager.getStatusBarItem();
            const tooltip = statusBarItem.tooltip;
            assert.ok(tooltip);
            const tooltipStr = typeof tooltip === 'string' ? tooltip : tooltip.value;
            assert.ok(tooltipStr.includes('Status: Running on port 3000'));
            assert.ok(tooltipStr.includes('Connection: Connected'));
            assert.ok(tooltipStr.includes('Workspace: Test Workspace'));
        });

        test('should generate tooltip for error state', () => {
            manager.updateServerState(ServerState.ERROR);
            const statusBarItem = manager.getStatusBarItem();
            const tooltip = statusBarItem.tooltip;
            assert.ok(tooltip);
            const tooltipStr = typeof tooltip === 'string' ? tooltip : tooltip.value;
            assert.ok(tooltipStr.includes('Status: Error'));
            assert.ok(tooltipStr.includes('Click to restart server'));
        });
    });

    suite('Status Bar Colors', () => {
        test('should set color for running disconnected state', () => {
            manager.updateServerState(ServerState.RUNNING);
            manager.updateConnectionStatus(false);
            const statusBarItem = manager.getStatusBarItem();
            assert.equal(statusBarItem.color, '#FFA500');
        });

        test('should set color for error state', () => {
            manager.updateServerState(ServerState.ERROR);
            const statusBarItem = manager.getStatusBarItem();
            assert.equal(statusBarItem.color, '#FF4444');
        });

        test('should set color for starting state', () => {
            manager.updateServerState(ServerState.STARTING);
            const statusBarItem = manager.getStatusBarItem();
            assert.equal(statusBarItem.color, '#4444FF');
        });

        test('should reset color for connected running state', () => {
            manager.updateServerState(ServerState.RUNNING);
            manager.updateConnectionStatus(true);
            const statusBarItem = manager.getStatusBarItem();
            assert.equal(statusBarItem.color, undefined);
        });
    });

    suite('Visibility Control', () => {
        test('should show status bar item', () => {
            const mockStatusBarItem = {
                show: () => {},
                hide: () => {},
                dispose: () => {}
            };
            let showCalled = false;
            mockStatusBarItem.show = () => { showCalled = true; };

            (manager as any).statusBarItem = mockStatusBarItem;
            manager.show();

            assert.ok(showCalled);
        });

        test('should hide status bar item', () => {
            const mockStatusBarItem = {
                show: () => {},
                hide: () => {},
                dispose: () => {}
            };
            let hideCalled = false;
            mockStatusBarItem.hide = () => { hideCalled = true; };

            (manager as any).statusBarItem = mockStatusBarItem;
            manager.hide();

            assert.ok(hideCalled);
        });
    });

    suite('Disposal', () => {
        test('should dispose status bar item', () => {
            const mockStatusBarItem = {
                show: () => {},
                hide: () => {},
                dispose: () => {}
            };
            let disposeCalled = false;
            mockStatusBarItem.dispose = () => { disposeCalled = true; };

            (manager as any).statusBarItem = mockStatusBarItem;
            manager.dispose();

            assert.ok(disposeCalled);
        });
    });

    suite('Server State Enum', () => {
        test('should have correct enum values', () => {
            assert.equal(ServerState.STOPPED, 'stopped');
            assert.equal(ServerState.STARTING, 'starting');
            assert.equal(ServerState.RUNNING, 'running');
            assert.equal(ServerState.ERROR, 'error');
        });
    });
});