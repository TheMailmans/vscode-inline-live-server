# Inline Live Server – No Auto-Start Test Build

This build disables the automatic server startup that previously ran during extension activation. Use the `Inline Live Server: Open with Inline Live Server` command or the status bar button to start the server manually.

## Installation

1. Open Visual Studio Code.
2. Run `Extensions: Install from VSIX...` from the command palette.
3. Select `tbx-live-server-6.0.3-no-autostart.vsix` in this folder.
4. Reload VS Code if prompted.

## Validation Checklist

- [ ] Activate the extension and verify no "Server is already running" warning appears.
- [ ] Run `Inline Live Server: Open with Inline Live Server` and confirm the server starts.
- [ ] Stop the server with `Inline Live Server: Stop Inline Live Server` and ensure manual restarts work as expected.

