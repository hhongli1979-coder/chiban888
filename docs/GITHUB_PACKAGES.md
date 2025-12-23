# GitHub Packages Guide for SurfSense

This guide explains how to use and publish SurfSense packages via GitHub Packages.

## Overview

SurfSense uses GitHub Packages to distribute:
- **NPM Packages**: Frontend web components and browser extension
- **Docker Images**: Backend and frontend containers
- **Python Package**: Backend API library (prepared for future use)

## Published Packages

### 1. NPM Packages

#### SurfSense Web (@hhongli1979-coder/surfsense-web)
Frontend Next.js application components and utilities.

**Installation:**
```bash
# Create or update .npmrc in your project root
echo "@hhongli1979-coder:registry=https://npm.pkg.github.com" >> .npmrc

# Install the package
npm install @hhongli1979-coder/surfsense-web
# or with pnpm
pnpm add @hhongli1979-coder/surfsense-web
# or with yarn
yarn add @hhongli1979-coder/surfsense-web
```

**Authentication:**
```bash
# Login to GitHub Packages (requires GitHub Personal Access Token with read:packages scope)
npm login --scope=@hhongli1979-coder --registry=https://npm.pkg.github.com

# Or set the token in .npmrc
echo "//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN" >> ~/.npmrc
```

#### SurfSense Browser Extension (@hhongli1979-coder/surfsense-browser-extension)
Browser extension components and utilities.

**Installation:**
```bash
npm install @hhongli1979-coder/surfsense-browser-extension
# or with pnpm
pnpm add @hhongli1979-coder/surfsense-browser-extension
```

### 2. Docker Images

#### Backend Image
```bash
# Pull the latest backend image
docker pull ghcr.io/hhongli1979-coder/surfsense_backend:latest

# Pull a specific version
docker pull ghcr.io/hhongli1979-coder/surfsense_backend:0.0.8

# Run the backend container
docker run -p 8000:8000 ghcr.io/hhongli1979-coder/surfsense_backend:latest
```

#### Frontend Image
```bash
# Pull the latest frontend image
docker pull ghcr.io/hhongli1979-coder/surfsense_web:latest

# Pull a specific version
docker pull ghcr.io/hhongli1979-coder/surfsense_web:0.0.8

# Run the frontend container
docker run -p 3000:3000 ghcr.io/hhongli1979-coder/surfsense_web:latest
```

**Docker Authentication:**
```bash
# Login to GitHub Container Registry
echo $GITHUB_TOKEN | docker login ghcr.io -u USERNAME --password-stdin

# Or use GitHub CLI
gh auth token | docker login ghcr.io -u USERNAME --password-stdin
```

### 3. Python Package (surf-new-backend)

**Note:** GitHub Packages for Python requires a GitHub Enterprise account. The workflow is prepared but may need adjustment.

**Future Installation (when available):**
```bash
# Configure pip to use GitHub Packages
pip config set global.index-url https://pypi.pkg.github.com/hhongli1979-coder/simple

# Install the package
pip install surf-new-backend
```

## Publishing Packages

### Automated Publishing

Packages are automatically published when:
1. A new release is created on GitHub
2. The "Publish Packages" workflow is manually triggered

### Manual Publishing

#### Trigger Workflow Manually
1. Go to Actions tab in GitHub
2. Select "Publish Packages" workflow
3. Click "Run workflow"
4. Optionally specify a version number

### Version Management

Package versions should follow [Semantic Versioning](https://semver.org/):
- **MAJOR.MINOR.PATCH** (e.g., 1.2.3)
- Update version in respective package files before creating a release:
  - NPM: `package.json` → `version`
  - Python: `pyproject.toml` → `project.version`

## Authentication & Permissions

### For Package Consumers

To install packages from GitHub Packages, you need:
1. A GitHub account
2. A Personal Access Token (PAT) with `read:packages` scope
3. Proper authentication configured (see installation sections above)

**Creating a PAT:**
1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Select scopes: `read:packages` (for reading), `write:packages` (for publishing)
4. Generate and save the token securely

### For Package Publishers

Publishing is handled automatically via GitHub Actions using `GITHUB_TOKEN`, which is automatically provided to workflows.

## Using Packages in Docker Compose

Update your `docker-compose.yml` to use GitHub Container Registry images:

```yaml
version: '3.8'

services:
  backend:
    image: ghcr.io/hhongli1979-coder/surfsense_backend:latest
    ports:
      - "8000:8000"
    environment:
      # Your environment variables

  frontend:
    image: ghcr.io/hhongli1979-coder/surfsense_web:latest
    ports:
      - "3000:3000"
    environment:
      # Your environment variables
```

## CI/CD Integration

### Using Packages in GitHub Actions

```yaml
- name: Install package from GitHub Packages
  run: |
    echo "@hhongli1979-coder:registry=https://npm.pkg.github.com" >> .npmrc
    echo "//npm.pkg.github.com/:_authToken=${{ secrets.GITHUB_TOKEN }}" >> .npmrc
    npm install @hhongli1979-coder/surfsense-web
```

### Using Docker Images in GitHub Actions

```yaml
- name: Pull Docker image
  run: |
    echo ${{ secrets.GITHUB_TOKEN }} | docker login ghcr.io -u ${{ github.actor }} --password-stdin
    docker pull ghcr.io/hhongli1979-coder/surfsense_backend:latest
```

## Troubleshooting

### Cannot authenticate to GitHub Packages

**Solution:**
- Verify your Personal Access Token has correct scopes
- Ensure token is not expired
- Check `.npmrc` file is properly configured
- Verify repository and package names are correct

### Docker pull fails with "unauthorized"

**Solution:**
```bash
# Make sure you're logged in
docker login ghcr.io -u YOUR_USERNAME

# Verify the image exists and you have access
# Check package visibility in GitHub repository settings
```

### Package version conflict

**Solution:**
- Clear local cache: `npm cache clean --force` or `pnpm store prune`
- Remove node_modules and reinstall: `rm -rf node_modules && npm install`
- Use specific version: `npm install @hhongli1979-coder/surfsense-web@0.0.8`

## Best Practices

1. **Version Control**: Always update package versions before publishing
2. **Semantic Versioning**: Follow semver for version numbers
3. **Security**: Never commit GitHub tokens or secrets to source code
4. **Testing**: Test packages locally before publishing
5. **Documentation**: Keep package documentation up to date
6. **Dependencies**: Regularly update dependencies and check for security vulnerabilities

## Package Visibility

By default, GitHub Packages inherit the visibility of the repository:
- **Public repository** → Public packages (anyone can download)
- **Private repository** → Private packages (requires authentication and permissions)

To change package visibility:
1. Go to repository Settings → Packages
2. Select the package
3. Manage visibility settings

## Additional Resources

- [GitHub Packages Documentation](https://docs.github.com/en/packages)
- [GitHub Container Registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)
- [NPM on GitHub Packages](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry)
- [Semantic Versioning](https://semver.org/)

## Support

For issues or questions:
- Open an issue in the repository
- Check existing documentation
- Contact the development team

---

**Last Updated**: 2025-11-24
**Version**: 1.0.0
