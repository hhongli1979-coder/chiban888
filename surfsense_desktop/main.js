const { app, BrowserWindow, Menu, Tray, nativeImage } = require('electron');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

let mainWindow = null;
let tray = null;
let backendProcess = null;

// Check if running in development
const isDev = process.env.NODE_ENV === 'development';

// Backend server configuration
const BACKEND_PORT = process.env.BACKEND_PORT || 8000;
const FRONTEND_PORT = process.env.FRONTEND_PORT || 3000;

function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      webSecurity: true
    },
    icon: path.join(__dirname, 'assets', 'icon.png'),
    title: 'SurfSense',
    show: false // Don't show until ready
  });

  // Load the app
  let startUrl;
  if (isDev) {
    startUrl = `http://localhost:${FRONTEND_PORT}`;
  } else {
    // In production, check if build exists, otherwise use backend URL
    const buildPath = path.join(__dirname, 'build/index.html');
    if (fs.existsSync(buildPath)) {
      startUrl = `file://${buildPath}`;
    } else {
      console.warn('Build directory not found, using backend URL');
      startUrl = `http://localhost:${FRONTEND_PORT}`;
    }
  }
  
  mainWindow.loadURL(startUrl);

  // Show window when ready
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Open DevTools in development
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  // Emitted when the window is closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Prevent window from closing, minimize to tray instead
  mainWindow.on('close', (event) => {
    if (!app.isQuitting) {
      event.preventDefault();
      mainWindow.hide();
      return false;
    }
  });
}

function createTray() {
  // Create tray icon
  const iconPath = path.join(__dirname, 'assets', 'tray-icon.png');
  const trayIcon = nativeImage.createFromPath(iconPath);
  tray = new Tray(trayIcon.resize({ width: 16, height: 16 }));

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show SurfSense',
      click: () => {
        if (mainWindow) {
          mainWindow.show();
        }
      }
    },
    {
      label: 'Quit',
      click: () => {
        app.isQuitting = true;
        app.quit();
      }
    }
  ]);

  tray.setToolTip('SurfSense');
  tray.setContextMenu(contextMenu);

  // Show window on tray click
  tray.on('click', () => {
    if (mainWindow) {
      mainWindow.show();
    }
  });
}

function startBackend() {
  // Only start backend if not in production (assumes backend is running separately)
  if (isDev && process.env.START_BACKEND === 'true') {
    console.log('Starting backend server...');
    // Start the Python backend
    // Note: Uses 'python' command. On Windows, ensure Python is in PATH.
    // Alternatively, set PYTHON_CMD environment variable to specify python3 or full path.
    const pythonCmd = process.env.PYTHON_CMD || 'python';
    const backendPath = path.join(__dirname, '..', 'surfsense_backend');
    backendProcess = spawn(pythonCmd, ['-m', 'uvicorn', 'main:app', '--reload', '--port', BACKEND_PORT], {
      cwd: backendPath,
      stdio: 'inherit'
    });

    backendProcess.on('error', (err) => {
      console.error('Failed to start backend:', err);
      console.error('Tip: Ensure Python is installed and in PATH, or set PYTHON_CMD environment variable');
    });
  }
}

function stopBackend() {
  if (backendProcess) {
    backendProcess.kill();
    backendProcess = null;
  }
}

// This method will be called when Electron has finished initialization
app.whenReady().then(() => {
  startBackend();
  createWindow();
  createTray();

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Cleanup before quitting
app.on('before-quit', () => {
  app.isQuitting = true;
  stopBackend();
});

app.on('will-quit', () => {
  stopBackend();
});
