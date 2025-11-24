# GitHub Packages Quick Reference

Quick reference guide for SurfSense maintainers and contributors.

## 🚀 Publishing a New Version

### Step 1: Update Version Numbers

Update version in all package files:

```bash
# Update all three files with the new version (e.g., 0.0.9)
# 1. surfsense_web/package.json → "version": "0.0.9"
# 2. surfsense_browser_extension/package.json → "version": "0.0.9"
# 3. surfsense_backend/pyproject.toml → version = "0.0.9"
```

### Step 2: Commit Changes

```bash
git add .
git commit -m "chore: bump version to 0.0.9"
git push origin main
```

### Step 3: Create Release

Using GitHub CLI:
```bash
gh release create v0.0.9 \
  --title "Release v0.0.9" \
  --notes "## What's New
- Feature 1
- Feature 2
- Bug fixes"
```

Or use GitHub web interface:
1. Go to Releases → Draft a new release
2. Create tag: `v0.0.9`
3. Add release notes
4. Click "Publish release"

Packages will automatically be published! 🎉

## 📦 Quick Commands

### For Users

```bash
# Authenticate with GitHub Packages
./scripts/setup-github-packages.sh

# Pull Docker images
docker pull ghcr.io/hhongli1979-coder/surfsense_backend:latest
docker pull ghcr.io/hhongli1979-coder/surfsense_web:latest

# Install NPM packages (after setup)
npm install @hhongli1979-coder/surfsense-web
npm install @hhongli1979-coder/surfsense-browser-extension

# Use with Docker Compose
docker-compose -f docs/docker-compose.github-packages.yml up -d
```

### For Maintainers

```bash
# Manually trigger Docker publish workflow
gh workflow run docker-publish.yml

# Manually trigger package publish workflow
gh workflow run publish-packages.yml

# View workflow runs
gh run list --workflow=publish-packages.yml

# Check published packages
gh api repos/:owner/:repo/packages
```

## 🏷️ Version Tags

| Version | Docker Tag | NPM Version | When to Use |
|---------|-----------|-------------|-------------|
| Latest stable | `latest` | - | Production |
| Specific version | `v0.0.9` | `0.0.9` | Pin to version |
| Minor series | `v0.0` | - | Auto-update patches |
| Commit SHA | `main-abc1234` | - | Testing specific commit |

## 🔍 Troubleshooting

### Workflow fails

```bash
# View workflow logs
gh run view <run-id> --log

# Re-run failed workflow
gh run rerun <run-id>
```

### Package not found

```bash
# Check package visibility
# Go to: Settings → Packages → Select package → Manage package

# Verify authentication
docker login ghcr.io -u YOUR_USERNAME
npm login --scope=@hhongli1979-coder --registry=https://npm.pkg.github.com
```

### Permission denied

Ensure you have:
- `read:packages` scope for reading
- `write:packages` scope for publishing
- Repository admin access for changing package settings

## 📚 Documentation Links

- **Full Guide**: [docs/GITHUB_PACKAGES.md](GITHUB_PACKAGES.md)
- **CI/CD Details**: [docs/CI_CD.md](CI_CD.md)
- **Setup Script**: [scripts/setup-github-packages.sh](../scripts/setup-github-packages.sh)
- **Docker Compose Example**: [docs/docker-compose.github-packages.yml](docker-compose.github-packages.yml)

## 🎯 Best Practices

1. **Always update all version numbers** together
2. **Test locally** before publishing
3. **Write clear release notes**
4. **Use semantic versioning** (MAJOR.MINOR.PATCH)
5. **Tag releases** properly (v0.0.9, not 0.0.9)
6. **Never delete published versions** (immutable by design)

## 🆘 Need Help?

- Check [GITHUB_PACKAGES.md](GITHUB_PACKAGES.md) for detailed instructions
- Check [CI_CD.md](CI_CD.md) for workflow details
- Open an issue if something's unclear
- Ask in Discord channel

---

**Pro Tip**: Bookmark this page for quick access! 🔖
