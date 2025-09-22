#!/bin/bash

echo "Building fresh VSIX package..."

# Clean any existing VSIX files
rm -f *.vsix

# Ensure build is up to date
echo "Running build..."
npm run build

# Check if build succeeded
if [ ! -f "dist/extension-enhanced.js" ]; then
    echo "ERROR: Build failed - dist/extension-enhanced.js not found"
    exit 1
fi

# Prepare extension-specific README and package.json
echo "Preparing extension README and package.json..."
cp README.md README.md.backup
cp README-EXTENSION.md README.md
cp package.json package.json.backup

# Temporarily remove repository info to prevent URL conversion
echo "Temporarily removing repository info..."
node -e "
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
delete pkg.repository;
delete pkg.homepage;
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
"

# Package the extension
echo "Packaging extension..."
npx @vscode/vsce package --no-update-package-json --baseContentUrl file:// --baseImagesUrl file:// --out tbx-live-server-6.0.5.vsix

# Restore original files
echo "Restoring original files..."
mv README.md.backup README.md
mv package.json.backup package.json

# Check if packaging succeeded
if [ -f "tbx-live-server-6.0.5.vsix" ]; then
    echo "SUCCESS: VSIX created at tbx-live-server-6.0.5.vsix"
    ls -la tbx-live-server-6.0.5.vsix

    # Verify the VSIX is valid (basic check)
    file tbx-live-server-6.0.5.vsix
else
    echo "ERROR: VSIX packaging failed"
    exit 1
fi
