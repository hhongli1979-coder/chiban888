#!/bin/bash

# SurfSense GitHub Packages Setup Script
# This script helps you authenticate with GitHub Packages and pull SurfSense packages

set -e

echo "================================================"
echo "  SurfSense GitHub Packages Setup"
echo "================================================"
echo ""

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if GitHub token is provided
if [ -z "$GITHUB_TOKEN" ]; then
    echo -e "${YELLOW}GITHUB_TOKEN environment variable not set${NC}"
    echo "Please provide your GitHub Personal Access Token:"
    echo "  1. Go to https://github.com/settings/tokens"
    echo "  2. Create a token with 'read:packages' scope"
    echo "  3. Run: export GITHUB_TOKEN=your_token_here"
    echo ""
    read -s -p "Enter your GitHub token: " token
    echo ""
    GITHUB_TOKEN=$token
fi

# Check if username is provided
if [ -z "$GITHUB_USERNAME" ]; then
    read -p "Enter your GitHub username: " username
    GITHUB_USERNAME=$username
fi

echo ""
echo "================================================"
echo "  Authenticating with GitHub Container Registry"
echo "================================================"

# Login to GitHub Container Registry for Docker
echo -e "${YELLOW}Logging in to ghcr.io...${NC}"
echo "$GITHUB_TOKEN" | docker login ghcr.io -u "$GITHUB_USERNAME" --password-stdin

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Successfully logged in to GitHub Container Registry${NC}"
else
    echo -e "${RED}✗ Failed to login to GitHub Container Registry${NC}"
    exit 1
fi

echo ""
echo "================================================"
echo "  Setting up NPM authentication"
echo "================================================"

# Create .npmrc for NPM packages
NPMRC_PATH="$HOME/.npmrc"
echo -e "${YELLOW}Configuring NPM...${NC}"

# Backup existing .npmrc if it exists
if [ -f "$NPMRC_PATH" ]; then
    echo "Backing up existing .npmrc to .npmrc.backup"
    cp "$NPMRC_PATH" "$NPMRC_PATH.backup"
fi

# Add GitHub Packages registry configuration
echo "@hhongli1979-coder:registry=https://npm.pkg.github.com" >> "$NPMRC_PATH"
echo "//npm.pkg.github.com/:_authToken=$GITHUB_TOKEN" >> "$NPMRC_PATH"

echo -e "${GREEN}✓ NPM authentication configured${NC}"

echo ""
echo "================================================"
echo "  Pulling Docker Images (optional)"
echo "================================================"

read -p "Do you want to pull the latest Docker images? (y/n): " pull_images

if [ "$pull_images" = "y" ] || [ "$pull_images" = "Y" ]; then
    echo -e "${YELLOW}Pulling backend image...${NC}"
    docker pull ghcr.io/hhongli1979-coder/surfsense_backend:latest
    
    echo -e "${YELLOW}Pulling frontend image...${NC}"
    docker pull ghcr.io/hhongli1979-coder/surfsense_web:latest
    
    echo -e "${GREEN}✓ Docker images pulled successfully${NC}"
else
    echo "Skipping Docker image pull"
fi

echo ""
echo "================================================"
echo "  Setup Complete!"
echo "================================================"
echo ""
echo "You can now:"
echo "  • Pull Docker images: docker pull ghcr.io/hhongli1979-coder/surfsense_backend:latest"
echo "  • Install NPM packages: npm install @hhongli1979-coder/surfsense-web"
echo "  • Use docker-compose with GitHub Packages images"
echo ""
echo "For more information, see: docs/GITHUB_PACKAGES.md"
echo ""
