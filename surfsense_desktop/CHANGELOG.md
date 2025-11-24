# Changelog

All notable changes to the SurfSense Desktop application will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-11-24

### Added
- Initial release of SurfSense Windows Desktop Application
- Electron-based desktop wrapper for SurfSense web application
- System tray integration
  - Minimize to tray
  - Tray menu with Show/Quit options
  - Tray icon click to show/hide window
- Native Windows installer (NSIS)
  - Customizable installation directory
  - Desktop shortcut creation
  - Start menu integration
  - Uninstaller
- Portable version (no installation required)
- Development mode support
- Configuration via environment variables
  - Backend port configuration
  - Frontend port configuration
  - Auto-start backend option (development)
- Comprehensive documentation
  - README with installation and usage instructions
  - BUILD.md with detailed build instructions
  - Assets README for icon creation guidelines
  - Quick start guide (bilingual: English and Chinese)
- Validation script for project structure
- Security features
  - Context isolation
  - Node integration disabled
  - Secure preload script

### Technical Details
- Electron 39.2.3
- electron-builder 26.0.12
- Support for Windows 10+ (64-bit)
- Integrates with existing Next.js web application
- Connects to FastAPI backend

### Known Limitations
- Icons are placeholders (SVG template provided)
- Backend must be started separately (not bundled)
- Web application must be running on localhost
- No auto-update mechanism configured yet
- Windows-only (cross-platform support planned)

### Future Plans
- Add proper application icons
- Bundle backend with desktop application
- Add auto-update functionality
- macOS and Linux support
- Offline mode improvements
- Better error handling and user feedback
