# SurfSense Desktop Application

Windows desktop application for SurfSense - an AI-powered research assistant.

## Features

- Native Windows application
- System tray integration
- Offline capabilities
- Desktop notifications
- Seamless integration with SurfSense backend

## Prerequisites

Before building or running the desktop application, ensure you have:

1. **Node.js** (v18 or higher)
2. **npm** (comes with Node.js)
3. **SurfSense Backend** running (see main README.md)
4. **SurfSense Web** running (see main README.md)

## Installation

### For Development

1. Navigate to the desktop app directory:
```bash
cd surfsense_desktop
```

2. Install dependencies:
```bash
npm install
```

3. Make sure the backend and web app are running:
   - Backend: `http://localhost:8000`
   - Web: `http://localhost:3000`

4. Start the desktop app:
```bash
npm run dev
```

### Building for Production

To create a Windows installer:

```bash
npm run build
```

This will create:
- NSIS installer: `dist/SurfSense-1.0.0-x64.exe`
- Portable version: `dist/SurfSense-1.0.0-portable.exe`

## Configuration

The application can be configured using environment variables:

- `BACKEND_PORT`: Backend server port (default: 8000)
- `FRONTEND_PORT`: Frontend server port (default: 3000)
- `START_BACKEND`: Whether to start backend automatically (default: false)
- `NODE_ENV`: Development or production mode

Create a `.env` file in the `surfsense_desktop` directory:

```
BACKEND_PORT=8000
FRONTEND_PORT=3000
NODE_ENV=development
START_BACKEND=false
```

## Project Structure

```
surfsense_desktop/
├── main.js              # Electron main process
├── preload.js           # Preload script for security
├── package.json         # Project configuration
├── assets/              # Icons and resources
│   ├── icon.ico        # Application icon
│   ├── icon.png        # App window icon
│   └── tray-icon.png   # System tray icon
└── dist/               # Built application (after build)
```

## Usage

### System Tray

The application runs in the system tray. Right-click the tray icon to:
- Show the main window
- Quit the application

### Closing the Window

Clicking the close button (X) will minimize the app to the system tray instead of quitting. To fully quit the application:
- Right-click the tray icon and select "Quit"
- Or use File → Quit from the menu bar

## Building Installers

### Windows Installer (NSIS)

```bash
npm run build
```

Creates a full installer with:
- Desktop shortcut
- Start menu entry
- Uninstaller
- Customizable installation directory

### Portable Version

The portable version is automatically created alongside the installer. It doesn't require installation and can be run from any location.

## Development

### Opening DevTools

In development mode (`npm run dev`), DevTools will open automatically.

### Debugging

To debug the main process:
1. Add `debugger` statements in your code
2. Run with Node.js inspector:
```bash
electron --inspect=5858 .
```

## Troubleshooting

### Application won't start

1. Check that Node.js is installed: `node --version`
2. Verify dependencies are installed: `npm install`
3. Ensure backend is running on correct port
4. Check console for error messages

### Can't connect to backend

1. Verify backend is running: `http://localhost:8000/docs`
2. Check BACKEND_PORT in configuration
3. Ensure no firewall is blocking connections

### Build fails

1. Clear node_modules and reinstall:
```bash
rm -rf node_modules
npm install
```

2. Clear electron-builder cache:
```bash
npm run build -- --publish never
```

## Technology Stack

- **Electron**: Cross-platform desktop framework
- **electron-builder**: Build and packaging tool
- **Node.js**: JavaScript runtime

## Contributing

Please see the main CONTRIBUTING.md file in the project root.

## License

See LICENSE file in the project root.
