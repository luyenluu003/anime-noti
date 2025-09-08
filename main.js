const { app, BrowserWindow, screen } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  // Lấy kích thước màn hình
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  
  // Tạo cửa sổ trong suốt ở góc dưới bên phải
  mainWindow = new BrowserWindow({
    width: 300,
    height: 600,
    x: width - 300, // Góc dưới bên phải
    y: height - 600, // Đưa cửa sổ lên để có chỗ cho notification
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    resizable: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // Load React app
  const isDev = process.env.NODE_ENV === 'development';
  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, 'dist/index.html'));
  }

  // Enable file access for static assets
  mainWindow.webContents.session.protocol.registerFileProtocol('file', (request, callback) => {
    const filePath = request.url.substr(7);
    callback({ path: path.normalize(filePath) });
  });

  // Đảm bảo cửa sổ luôn ở trên cùng nhưng không cản trở
  mainWindow.setAlwaysOnTop(true, 'screen-saver');
  
  // Cho phép click-through khi không có nội dung
  mainWindow.setIgnoreMouseEvents(false);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Xử lý sự kiện khi cửa sổ mất focus
  mainWindow.on('blur', () => {
    // Giữ cửa sổ ở trên cùng nhưng không cản trở
    mainWindow.setAlwaysOnTop(true, 'screen-saver');
  });
}

// Tạo preload script để giao tiếp an toàn
const fs = require('fs');
const preloadContent = `
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // Có thể thêm các API cần thiết ở đây
  platform: process.platform,
  versions: process.versions
});
`;

fs.writeFileSync('preload.js', preloadContent);

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Xử lý khi ứng dụng được mở từ dock (macOS)
app.on('before-quit', () => {
  if (mainWindow) {
    mainWindow.removeAllListeners('close');
    mainWindow.close();
  }
});
