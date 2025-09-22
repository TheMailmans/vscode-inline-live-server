/**
 * Debugging utilities for Inline Live Server development
 * These utilities help with debugging and development of the extension
 */

import { ExtensionContext, window, workspace, commands, debug } from 'vscode';
import { createMockContext, createMockAppModel, createMockWebviewProvider, createMockStatusBarManager, createMockCommandManager } from './test-utils';

/**
 * Debug utilities for development and troubleshooting
 */
export class DebugUtils {
    private context: ExtensionContext;
    private appModel: any;
    private webviewProvider: any;
    private statusBarManager: any;
    private commandManager: any;

    constructor() {
        this.context = createMockContext();
        this.appModel = createMockAppModel();
        this.webviewProvider = createMockWebviewProvider();
        this.statusBarManager = createMockStatusBarManager();
        this.commandManager = createMockCommandManager();
    }

    /**
     * Log current state of all components
     */
    logCurrentState(): void {
        console.log('🔍 Debug: Current State');
        console.log('====================');
        console.log(`AppModel runningPort: ${this.appModel.runningPort}`);
        console.log(`WebviewProvider isPanelVisible: ${this.webviewProvider.isPanelVisible}`);
        console.log(`StatusBarManager state:`, this.statusBarManager.currentState);
        console.log(`Context subscriptions count: ${this.context.subscriptions.length}`);
        console.log('====================');
    }

    /**
     * Test server startup with detailed logging
     */
    async debugServerStartup(filePath?: string): Promise<void> {
        console.log('🔧 Debug: Server Startup Test');
        console.log('============================');

        try {
            console.log(`Starting server with file: ${filePath || 'none'}`);
            await this.appModel.Golive(filePath);
            console.log(`✅ Server started on port: ${this.appModel.runningPort}`);

            this.logCurrentState();
        } catch (error: any) {
            console.error('❌ Server startup failed:', error);
        }
    }

    /**
     * Test webview panel with detailed logging
     */
    debugWebviewPanel(): void {
        console.log('🔧 Debug: Webview Panel Test');
        console.log('============================');

        try {
            console.log('Creating webview panel...');
            this.webviewProvider.showWebviewPanel();
            console.log(`✅ Panel created, visible: ${this.webviewProvider.isPanelVisible}`);

            this.logCurrentState();
        } catch (error: any) {
            console.error('❌ Webview panel test failed:', error);
        }
    }

    /**
     * Test status bar updates with detailed logging
     */
    debugStatusBar(): void {
        console.log('🔧 Debug: Status Bar Test');
        console.log('==========================');

        try {
            const states = ['stopped', 'starting', 'running', 'error'];
            states.forEach((state, index) => {
                console.log(`Setting state to: ${state}`);
                this.statusBarManager.updateServerState(state, 3000 + index);
                console.log(`✅ State updated:`, this.statusBarManager.currentState);
            });

            this.logCurrentState();
        } catch (error: any) {
            console.error('❌ Status bar test failed:', error);
        }
    }

    /**
     * Test command registration with detailed logging
     */
    debugCommands(): void {
        console.log('🔧 Debug: Command Registration Test');
        console.log('===================================');

        try {
            const initialCount = this.context.subscriptions.length;
            console.log(`Initial subscription count: ${initialCount}`);

            this.commandManager.registerCommands(this.context);
            const finalCount = this.context.subscriptions.length;
            console.log(`Final subscription count: ${finalCount}`);
            console.log(`✅ Commands registered: ${finalCount - initialCount} new subscriptions`);

            this.logCurrentState();
        } catch (error: any) {
            console.error('❌ Command registration test failed:', error);
        }
    }

    /**
     * Test configuration scenarios
     */
    debugConfiguration(): void {
        console.log('🔧 Debug: Configuration Test');
        console.log('=============================');

        const configs = [
            { port: 5500, host: '127.0.0.1', protocol: 'http', path: 'index.html' },
            { port: 3000, host: 'localhost', protocol: 'http', path: 'test.html' },
            { port: 8443, host: 'localhost', protocol: 'https', path: 'secure.html' }
        ];

        configs.forEach((config, index) => {
            const url = `${config.protocol}://${config.host}:${config.port}/${config.path}`;
            console.log(`Config ${index + 1}: ${url}`);
        });
    }

    /**
     * Test error scenarios
     */
    debugErrorScenarios(): void {
        console.log('🔧 Debug: Error Scenarios Test');
        console.log('==============================');

        try {
            // Test invalid server state
            console.log('Testing invalid server state...');
            this.statusBarManager.updateServerState('invalid_state' as any);
            console.log('✅ Invalid state handled gracefully');

            // Test null/undefined values
            console.log('Testing null/undefined handling...');
            this.webviewProvider.updatePreview(null);
            this.statusBarManager.updateWorkspaceInfo(null);
            console.log('✅ Null/undefined values handled gracefully');

        } catch (error: any) {
            console.error('❌ Error scenario test failed:', error);
        }
    }

    /**
     * Performance test for component instantiation
     */
    debugPerformance(): void {
        console.log('🔧 Debug: Performance Test');
        console.log('===========================');

        const iterations = 100;
        const startTime = Date.now();

        for (let i = 0; i < iterations; i++) {
            const context = createMockContext();
            const appModel = createMockAppModel();
            const webviewProvider = createMockWebviewProvider();
            const statusBarManager = createMockStatusBarManager();
            const commandManager = createMockCommandManager();
        }

        const endTime = Date.now();
        const duration = endTime - startTime;
        const avgTime = duration / iterations;

        console.log(`Created ${iterations} component sets in ${duration}ms`);
        console.log(`Average time per set: ${avgTime.toFixed(2)}ms`);
    }

    /**
     * Memory usage test
     */
    debugMemoryUsage(): void {
        console.log('🔧 Debug: Memory Usage Test');
        console.log('============================');

        const initialMemory = process.memoryUsage();
        console.log('Initial memory usage:');
        console.log(`- RSS: ${Math.round(initialMemory.rss / 1024 / 1024)}MB`);
        console.log(`- Heap Used: ${Math.round(initialMemory.heapUsed / 1024 / 1024)}MB`);
        console.log(`- Heap Total: ${Math.round(initialMemory.heapTotal / 1024 / 1024)}MB`);

        // Create some objects to test memory impact
        const objects: any[] = [];
        for (let i = 0; i < 1000; i++) {
            objects.push(createMockContext());
        }

        const afterMemory = process.memoryUsage();
        console.log('\nAfter creating 1000 mock contexts:');
        console.log(`- RSS: ${Math.round(afterMemory.rss / 1024 / 1024)}MB`);
        console.log(`- Heap Used: ${Math.round(afterMemory.heapUsed / 1024 / 1024)}MB`);
        console.log(`- Heap Total: ${Math.round(afterMemory.heapTotal / 1024 / 1024)}MB`);

        const memoryIncrease = {
            rss: afterMemory.rss - initialMemory.rss,
            heapUsed: afterMemory.heapUsed - initialMemory.heapUsed,
            heapTotal: afterMemory.heapTotal - initialMemory.heapTotal
        };

        console.log('\nMemory increase:');
        console.log(`- RSS: ${Math.round(memoryIncrease.rss / 1024 / 1024)}MB`);
        console.log(`- Heap Used: ${Math.round(memoryIncrease.heapUsed / 1024 / 1024)}MB`);
        console.log(`- Heap Total: ${Math.round(memoryIncrease.heapTotal / 1024 / 1024)}MB`);
    }

    /**
     * Test VS Code API integration
     */
    async debugVSCodeAPIs(): Promise<void> {
        console.log('🔧 Debug: VS Code APIs Test');
        console.log('============================');

        try {
            // Test workspace API
            const workspaceFolders = workspace.workspaceFolders;
            console.log(`Workspace folders: ${workspaceFolders?.length || 0}`);

            // Test window API
            const activeEditor = window.activeTextEditor;
            console.log(`Active editor: ${activeEditor ? 'present' : 'none'}`);

            // Test commands API
            const commandCount = await commands.getCommands();
            console.log(`Available commands: ${commandCount.length}`);

            // Test specific commands
            const liveServerCommands = commandCount.filter(cmd =>
                cmd.includes('liveServer') || cmd.includes('LiveServer')
            );
            console.log(`Live Server commands: ${liveServerCommands.length}`);

            console.log('✅ VS Code APIs test completed');
        } catch (error: any) {
            console.error('❌ VS Code APIs test failed:', error);
        }
    }

    /**
     * Run all debug tests
     */
    async runAllDebugTests(): Promise<void> {
        console.log('🚀 Starting Inline Live Server debug tests...\n');

        const tests = [
            'logCurrentState',
            'debugServerStartup',
            'debugWebviewPanel',
            'debugStatusBar',
            'debugCommands',
            'debugConfiguration',
            'debugErrorScenarios',
            'debugPerformance',
            'debugMemoryUsage',
            'debugVSCodeAPIs'
        ];

        for (const testName of tests) {
            try {
                console.log(`\n--- Running ${testName} ---`);
                if (testName === 'debugServerStartup') {
                    await (this as any)[testName]('/test/index.html');
                } else {
                    await (this as any)[testName]();
                }
                console.log(`✅ ${testName} completed\n`);
            } catch (error: any) {
                console.log(`❌ ${testName} failed: ${error.message}\n`);
            }
        }

        console.log('🎉 All debug tests completed!');
    }
}

/**
 * Run debug tests from command line
 */
export async function runDebugTests(): Promise<void> {
    const debugUtils = new DebugUtils();

    try {
        await debugUtils.runAllDebugTests();
        console.log('✅ All debug tests completed successfully');
    } catch (error: any) {
        console.error('❌ Debug tests failed:', error.message);
        process.exit(1);
    }
}

/**
 * Export individual debug functions for use in other contexts
 */
export const debugFunctions = {
    logCurrentState: () => new DebugUtils().logCurrentState(),
    debugServerStartup: (filePath?: string) => new DebugUtils().debugServerStartup(filePath),
    debugWebviewPanel: () => new DebugUtils().debugWebviewPanel(),
    debugStatusBar: () => new DebugUtils().debugStatusBar(),
    debugCommands: () => new DebugUtils().debugCommands(),
    debugConfiguration: () => new DebugUtils().debugConfiguration(),
    debugErrorScenarios: () => new DebugUtils().debugErrorScenarios(),
    debugPerformance: () => new DebugUtils().debugPerformance(),
    debugMemoryUsage: () => new DebugUtils().debugMemoryUsage(),
    debugVSCodeAPIs: () => new DebugUtils().debugVSCodeAPIs()
};