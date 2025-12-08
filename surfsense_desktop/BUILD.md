# Building SurfSense Windows Desktop Application

This guide provides detailed instructions for building the SurfSense Windows desktop application.

## Prerequisites

Before building, ensure you have:

1. **Node.js** v18 or higher
2. **npm** v9 or higher
3. **Windows** (for building Windows installers) or WSL/Linux (cross-platform build)
4. At least **2GB** free disk space for build artifacts

## Quick Build

```bash
cd surfsense_desktop
npm install
npm run build
```

The built application will be in the `dist/` directory.

## Build Options

### Development Build

For testing during development:

```bash
npm run start
# or with development environment
npm run dev
```

### Production Build

#### Full Build (Installer + Portable)

```bash
npm run build
```

Creates:
- `dist/SurfSense-1.0.0-x64.exe` - NSIS installer
- `dist/SurfSense-1.0.0-portable.exe` - Portable version

#### Build to Directory (Unpacked)

For testing without creating installers:

```bash
npm run build:dir
```

Creates unpacked application in `dist/win-unpacked/`

### Platform-Specific Builds

#### Windows Only

```bash
npm run build -- --win
```

#### Multiple Architectures

```bash
# x64 only (default)
npm run build -- --win --x64

# Both x64 and ia32
npm run build -- --win --x64 --ia32
```

## Build Configuration

The build is configured in `package.json` under the `build` section:

```json
{
  "build": {
    "appId": "com.surfsense.desktop",
    "productName": "SurfSense",
    "win": {
      "target": ["nsis", "portable"],
      "icon": "assets/icon.ico"
    }
  }
}
```

### Customizing the Build

#### Change App Name

Edit `package.json`:
```json
{
  "productName": "Your App Name"
}
```

#### Change App Icon

1. Create your icon files (see `assets/README.md`)
2. Place them in `assets/` directory:
   - `icon.ico` - Main application icon
   - `icon.png` - Fallback icon
   - `tray-icon.png` - System tray icon
3. Rebuild: `npm run build`

#### Change Build Output

Edit `package.json`:
```json
{
  "build": {
    "directories": {
      "output": "release"  // Change output directory
    }
  }
}
```

## Advanced Build Options

### Signing the Application

For production releases, sign your application:

1. Obtain a code signing certificate
2. Configure in `package.json`:

```json
{
  "build": {
    "win": {
      "certificateFile": "path/to/certificate.pfx",
      "certificatePassword": "password"
    }
  }
}
```

Or use environment variables:
```bash
export CSC_LINK=path/to/certificate.pfx
export CSC_KEY_PASSWORD=password
npm run build
```

### Auto-Update Configuration

To enable auto-updates, configure a release server:

```json
{
  "build": {
    "publish": {
      "provider": "github",
      "owner": "your-username",
      "repo": "your-repo"
    }
  }
}
```

Then build with publish:
```bash
npm run build -- --publish always
```

### Custom NSIS Options

Customize the installer in `package.json`:

```json
{
  "build": {
    "nsis": {
      "oneClick": false,
      "allowToChangeInstallationDirectory": true,
      "perMachine": true,
      "installerSidebar": "assets/installer-sidebar.bmp",
      "uninstallerSidebar": "assets/uninstaller-sidebar.bmp",
      "license": "../LICENSE"
    }
  }
}
```

## Build Artifacts

After a successful build, you'll find:

```
dist/
├── SurfSense-1.0.0-x64.exe          # NSIS installer (recommended)
├── SurfSense-1.0.0-portable.exe     # Portable version (no install)
├── win-unpacked/                     # Unpacked application (if --dir used)
│   ├── SurfSense.exe
│   ├── resources/
│   └── ...
└── builder-debug.yml                 # Build metadata
```

### Artifact Sizes

Typical sizes:
- NSIS Installer: ~100-150 MB
- Portable EXE: ~100-150 MB
- Unpacked: ~200-300 MB

## Validation

Before building, validate your setup:

```bash
npm run validate
```

This checks:
- ✅ All required files are present
- ✅ Package.json is properly configured
- ✅ Main process and preload scripts exist
- ✅ Assets directory structure

## Troubleshooting

### Build Fails with "Cannot find module"

```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### "ENOSPC: System limit for number of file watchers reached"

Increase the limit (Linux/WSL):
```bash
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

### Icon Not Appearing in Built App

1. Ensure `icon.ico` exists in `assets/` directory
2. Verify ICO file contains multiple sizes (16, 32, 48, 64, 128, 256)
3. Clear build cache: `rm -rf dist`
4. Rebuild: `npm run build`

### Slow Build Times

1. Use `--dir` for faster unpacked builds during development
2. Disable compression: Add to `package.json`:
```json
{
  "build": {
    "compression": "store"
  }
}
```

### Cannot Sign Application

- Ensure certificate file path is correct
- Verify certificate password
- Check certificate hasn't expired
- Try absolute path instead of relative path

## CI/CD Integration

### GitHub Actions

Example workflow (`.github/workflows/build-desktop.yml`):

```yaml
name: Build Desktop App

on:
  push:
    tags:
      - 'v*'

jobs:
  build:
    runs-on: windows-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
      
      - name: Install dependencies
        working-directory: surfsense_desktop
        run: npm install
      
      - name: Build
        working-directory: surfsense_desktop
        run: npm run build
      
      - name: Upload artifacts
        uses: actions/upload-artifact@v3
        with:
          name: windows-installer
          path: surfsense_desktop/dist/*.exe
```

## Build Performance

Tips for faster builds:

1. **Use SSD**: Build on SSD for 2-3x faster builds
2. **Exclude from antivirus**: Add `node_modules` and `dist` to exclusions
3. **Use build cache**: Don't delete `dist` between similar builds
4. **Parallel builds**: Build multiple platforms in parallel

## Environment Variables

Useful environment variables:

```bash
# Enable debug output
export DEBUG=electron-builder

# Skip code signing
export CSC_IDENTITY_AUTO_DISCOVERY=false

# Custom electron mirror (China users)
export ELECTRON_MIRROR=https://npm.taobao.org/mirrors/electron/

# Build with specific version
export ELECTRON_VERSION=39.2.3
```

## Next Steps

After building:

1. Test the installer on a clean Windows machine
2. Verify all features work correctly
3. Test auto-update functionality (if configured)
4. Create release notes
5. Upload to distribution platform

## Resources

- [electron-builder Documentation](https://www.electron.build/)
- [Electron Documentation](https://www.electronjs.org/docs)
- [Code Signing Guide](https://www.electron.build/code-signing)
