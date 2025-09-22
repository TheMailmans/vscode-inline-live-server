# Inline Live Server Test Build

This folder contains the latest Inline Live Server by TBX VSIX package for manual installation and validation.

## Installation

1. Open Visual Studio Code.
2. Run `Extensions: Install from VSIX...` from the command palette.
3. Choose `inline-live-server-6.0.3.vsix` from this directory.
4. Reload VS Code if prompted.

## Validation Checklist

- [ ] Run `Inline Live Server: Open with Inline Live Server` in two different workspace folders; confirm separate servers start on distinct ports.
- [ ] Status bar button shows the correct running count and opens the stop picker.
- [ ] Preview panel dropdown lists both servers and swapping between them refreshes the embedded iframe.
- [ ] "Open in Browser" opens the selected server URL.
- [ ] Stopping one server leaves the other running.

## Notes

- The extension identifier is now `tbx.live-server` with display name "Inline Live Server by TBX".
- Settings continue to use the `tbxLivePreview.*` namespace for backward compatibility.
- VSIX bundles include the original Live Server MIT license alongside TBX modifications.

