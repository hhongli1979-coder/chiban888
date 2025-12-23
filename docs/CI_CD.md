# CI/CD and Package Publishing

This document describes the automated CI/CD pipelines and package publishing workflows for SurfSense.

## Overview

SurfSense uses GitHub Actions to automate:
- Code quality checks
- Security scanning
- Package building and publishing
- Docker image building and publishing

## Workflows

### 1. Code Quality Checks (`.github/workflows/code-quality.yml`)

**Trigger**: Pull requests to `main` or `dev` branches

**Jobs**:
- **File Quality**: Checks YAML, JSON, TOML files, merge conflicts, and large files
- **Security Scan**: Runs `detect-secrets` and `bandit` for security vulnerabilities
- **Python Backend**: Runs `ruff` linter and formatter on backend code
- **TypeScript/JavaScript**: Runs `biome` on frontend and extension code
- **Quality Gate**: Ensures all checks pass before merging

**How it works**:
- Only checks files changed in the PR (efficient)
- Uses caching to speed up subsequent runs
- Skips checks if no relevant files changed

### 2. Docker Publishing (`.github/workflows/docker-publish.yml`)

**Trigger**:
- Manual workflow dispatch
- Push to `main` branch
- Git tags starting with `v*`

**Jobs**:
- **Build and Push Backend**: Builds and publishes backend Docker image
- **Build and Push Frontend**: Builds and publishes frontend Docker image

**Features**:
- Multi-platform builds (linux/amd64, linux/arm64)
- Automatic tagging:
  - `latest` for main branch
  - `v1.2.3` for version tags
  - `main-abc123` for commit SHAs
  - `v1`, `v1.2` for major/minor versions
- Layer caching for faster builds
- Proper metadata and labels

**Published images**:
- `ghcr.io/hhongli1979-coder/surfsense_backend:latest`
- `ghcr.io/hhongli1979-coder/surfsense_web:latest`

### 3. Publish Packages (`.github/workflows/publish-packages.yml`)

**Trigger**:
- GitHub releases
- Manual workflow dispatch (with optional version input)

**Jobs**:
- **Publish NPM Package - Web**: Publishes frontend components to GitHub Packages
- **Publish NPM Package - Extension**: Publishes browser extension to GitHub Packages
- **Publish Python Package**: Publishes backend package (prepared for PyPI or GitHub Packages)
- **Publish Docker**: Publishes Docker images with comprehensive tagging

**Features**:
- Automatic package configuration for GitHub Packages
- Scoped package names (`@hhongli1979-coder/surfsense-web`)
- Version management
- Build verification before publishing

## Package Publishing Process

### Automated Publishing (Recommended)

#### For Regular Updates:

1. **Update version numbers** in package files:
   - `surfsense_web/package.json` → `version`
   - `surfsense_browser_extension/package.json` → `version`
   - `surfsense_backend/pyproject.toml` → `project.version`

2. **Commit and push changes**:
   ```bash
   git add .
   git commit -m "chore: bump version to 0.0.9"
   git push origin main
   ```

3. **Create a GitHub release**:
   ```bash
   # Using GitHub CLI
   gh release create v0.0.9 --title "Release v0.0.9" --notes "Release notes here"
   
   # Or via GitHub web interface:
   # Go to Releases → Draft a new release → Create new tag → Publish
   ```

4. **Packages are automatically published** when the release is created

#### For Docker Images Only:

Push to `main` branch or manually trigger the Docker Publish workflow:

```bash
# Push to main
git push origin main

# Or manually trigger via GitHub web interface:
# Actions → Docker Publish → Run workflow
```

### Manual Publishing

#### Manually Trigger Workflows:

1. Go to **Actions** tab in GitHub
2. Select workflow (e.g., "Publish Packages")
3. Click **"Run workflow"**
4. Optionally specify version
5. Click **"Run workflow"** button

## Version Management

### Semantic Versioning

Follow [Semantic Versioning 2.0.0](https://semver.org/):

- **MAJOR** version (X.0.0): Incompatible API changes
- **MINOR** version (0.X.0): New functionality (backward compatible)
- **PATCH** version (0.0.X): Bug fixes (backward compatible)

### Version Bump Checklist:

- [ ] Update `surfsense_web/package.json`
- [ ] Update `surfsense_browser_extension/package.json`
- [ ] Update `surfsense_backend/pyproject.toml`
- [ ] Update `CHANGELOG.md` (if exists)
- [ ] Update documentation if needed
- [ ] Create git tag: `git tag v0.0.9`
- [ ] Push tag: `git push --tags`
- [ ] Create GitHub release

## Environment Variables and Secrets

### Automatically Available:

- `GITHUB_TOKEN`: Automatically provided by GitHub Actions
  - Has permissions to publish packages
  - No configuration needed

### Custom Secrets (if needed):

To add custom secrets for publishing:

1. Go to repository **Settings** → **Secrets and variables** → **Actions**
2. Click **"New repository secret"**
3. Add secrets like:
   - `NPM_TOKEN` (if publishing to public npm)
   - `PYPI_TOKEN` (if publishing to PyPI)

## Docker Image Tagging Strategy

### Automatic Tags:

| Tag Pattern | Example | When Created |
|------------|---------|--------------|
| `latest` | `latest` | Push to main branch |
| `v{version}` | `v0.0.8` | Git tag `v0.0.8` |
| `v{major}.{minor}` | `v0.0` | Git tag `v0.0.8` |
| `v{major}` | `v0` | Git tag `v0.0.8` |
| `{branch}-{sha}` | `main-abc1234` | Push to any branch |

### Usage Examples:

```bash
# Latest stable version (main branch)
docker pull ghcr.io/hhongli1979-coder/surfsense_backend:latest

# Specific version
docker pull ghcr.io/hhongli1979-coder/surfsense_backend:v0.0.8

# Specific minor version series (auto-updates to latest patch)
docker pull ghcr.io/hhongli1979-coder/surfsense_backend:v0.0

# Specific commit
docker pull ghcr.io/hhongli1979-coder/surfsense_backend:main-abc1234
```

## NPM Package Naming

GitHub Packages requires scoped package names:

- Original: `surfsense_web`
- Published as: `@hhongli1979-coder/surfsense-web`

The workflow automatically updates package names during publishing.

## Monitoring Workflow Runs

### View Workflow Status:

1. Go to **Actions** tab
2. Select workflow
3. View recent runs and their status

### Check Package Publications:

1. Go to repository main page
2. Click **"Packages"** in sidebar
3. View published packages and versions

### Debugging Failed Workflows:

1. Click on failed workflow run
2. View job logs
3. Check error messages
4. Fix issues and re-run if needed

## Best Practices

### Before Publishing:

- [ ] Run local tests
- [ ] Build packages locally to verify
- [ ] Update documentation
- [ ] Update version numbers consistently
- [ ] Write clear release notes
- [ ] Review changes since last release

### After Publishing:

- [ ] Verify packages are available
- [ ] Test installation in clean environment
- [ ] Update documentation if needed
- [ ] Announce release (if applicable)

## Rollback Procedure

If a published package has issues:

1. **Identify the problem version**
2. **Fix the issue** in code
3. **Publish a new patch version** (e.g., 0.0.9 → 0.0.10)
4. **Update documentation** about the issue
5. **Notify users** if necessary

**Note**: GitHub Packages doesn't allow deleting or overwriting published versions (by design for security).

## Cache Management

Workflows use caching to speed up builds:

- **Pre-commit hooks**: Cached by config file hash
- **NPM dependencies**: Cached by `pnpm-lock.yaml` hash
- **Python dependencies**: Cached by `uv.lock` hash
- **Docker layers**: Cached using GitHub Actions cache

### Clear Caches (if needed):

1. Go to **Actions** → **Caches**
2. Delete specific caches
3. Re-run workflow to rebuild cache

## Troubleshooting

### "Permission denied" when publishing

**Solution**: Ensure workflow has `packages: write` permission in workflow file.

### Package not found after publishing

**Solution**: 
- Wait a few minutes for package to propagate
- Check package visibility (public/private)
- Verify authentication

### Build fails with "disk space" error

**Solution**: Clean up Docker cache in workflow:
```yaml
- name: Clean up Docker
  run: docker system prune -af
```

### Version conflict

**Solution**: Ensure version in package file matches the git tag.

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Packages Documentation](https://docs.github.com/en/packages)
- [Docker Build Push Action](https://github.com/docker/build-push-action)
- [Semantic Versioning](https://semver.org/)

---

For package usage instructions, see [GITHUB_PACKAGES.md](GITHUB_PACKAGES.md)
