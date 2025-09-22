# Inline Live Server – Manual Preview Test Build

This build keeps manual server startup (no auto-start) and now opens a webview panel with the running site embedded once you start the server.

## Installation

1. In VS Code run `Extensions: Install from VSIX...`.
2. Select `tbx-live-server-6.0.3-no-autostart-preview.vsix`.
3. Reload VS Code if prompted.

## What to Expect

- Use `Inline Live Server: Open with Inline Live Server` to spin up servers per workspace. Each additional run picks the next free port automatically.
- The status bar entry shows how many servers are running and lets you stop one or all instances.
- A "Inline Live Server" webview opens (or refreshes) with the selected server embedded. Switch servers with the dropdown above the preview.
- Panel buttons let you stop/start the selected server, refresh the embedded frame, or open the active site in your default browser.

## Validation Checklist

- [ ] Starting the server opens the webview and renders the project.
- [ ] Clicking “Stop Server” in the panel stops the selected server and updates the status bar.
- [ ] Starting another server from a different workspace assigns a new port and appears in the dropdown.
- [ ] “Open in Browser” launches `http://127.0.0.1:<port>` externally.
- [ ] Refresh button reloads the embedded page.
