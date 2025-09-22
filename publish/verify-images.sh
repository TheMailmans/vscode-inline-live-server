#!/bin/bash

# TBX Live Server - Image Verification Script
# Verifies all image references in README.md and package.json

echo "🔍 TBX Live Server - Image Verification"
echo "======================================="

# Change to publish directory
cd "$(dirname "$0")"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Track results
TOTAL_CHECKS=0
PASSED_CHECKS=0

# Function to check if file exists
check_file() {
    local file_path="$1"
    local description="$2"
    
    TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
    
    if [ -f "$file_path" ]; then
        echo -e "${GREEN}✅${NC} $description: $file_path"
        PASSED_CHECKS=$((PASSED_CHECKS + 1))
    else
        echo -e "${RED}❌${NC} $description: $file_path (NOT FOUND)"
    fi
}

echo ""
echo "📋 Checking README.md Image References:"
echo "--------------------------------------"

# Check all images referenced in README.md
check_file "images/icon-256.png" "Extension icon"
check_file "images/Screenshot/hero-preview.png" "Hero screenshot"
check_file "images/Screenshot/AnimatedPreview.gif" "Animated demo"
check_file "images/Screenshot/multi-server-dropdown.png" "Multi-server dropdown"
check_file "images/Screenshot/status-bar.png" "Status bar indicator"
check_file "images/Screenshot/command-palette.png" "Command palette"

echo ""
echo "📦 Checking package.json References:"
echo "------------------------------------"

# Check package.json icon
check_file "images/icon.png" "Package icon"

# Check package.json screenshots
check_file "images/Screenshot/hero-preview.png" "Screenshot 1"
check_file "images/Screenshot/multi-server-dropdown.png" "Screenshot 2"
check_file "images/Screenshot/status-bar.png" "Screenshot 3"
check_file "images/Screenshot/command-palette.png" "Screenshot 4"

echo ""
echo "📁 Checking Required Files:"
echo "---------------------------"

# Check required publication files
check_file "tbx-live-server-6.0.3.vsix" "VSIX package"
check_file "README.md" "README documentation"
check_file "changelog.md" "Changelog"
check_file "LICENSE" "License file"
check_file "package.json" "Package metadata"

echo ""
echo "📊 Verification Results:"
echo "========================"

if [ $PASSED_CHECKS -eq $TOTAL_CHECKS ]; then
    echo -e "${GREEN}🎉 ALL CHECKS PASSED!${NC}"
    echo -e "${GREEN}✅ $PASSED_CHECKS/$TOTAL_CHECKS files verified${NC}"
    echo -e "${GREEN}🚀 Ready for marketplace publication!${NC}"
    exit 0
else
    echo -e "${RED}❌ SOME CHECKS FAILED!${NC}"
    echo -e "${RED}⚠️  $PASSED_CHECKS/$TOTAL_CHECKS files verified${NC}"
    echo -e "${YELLOW}🔧 Please fix missing files before publication${NC}"
    exit 1
fi
