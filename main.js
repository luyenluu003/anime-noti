const { app, BrowserWindow, screen } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  // Lấy kích thước màn hình
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  
  // Tạo cửa sổ trong suốt ở góc dưới bên phải
  mainWindow = new BrowserWindow({
    width: 250,
    height: 500,
    x: width - 250, // Góc dưới bên phải
    y: height - 500, // Thu nhỏ cửa sổ để biểu tượng xuống thấp hơn
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    resizable: false,
    titleBarStyle: 'hidden',
    icon: null,
    show: false,
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

  // Hiển thị cửa sổ sau khi load xong để tránh biểu tượng mặc định
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Enable file access for static assets
  mainWindow.webContents.session.protocol.registerFileProtocol('file', (request, callback) => {
    const filePath = request.url.substr(7);
    callback({ path: path.normalize(filePath) });
  });

  // Đảm bảo cửa sổ luôn ở trên cùng nhưng không cản trở
  mainWindow.setAlwaysOnTop(true, 'screen-saver');
  
  // Cho phép click-through khi không có nội dung
  mainWindow.setIgnoreMouseEvents(false);
  
  // Thiết lập click-through cho khoảng trống
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.executeJavaScript(`
      let clickThroughEnabled = false;
      
      // Thêm event listener để xử lý click-through
      document.addEventListener('click', (e) => {
        // Kiểm tra nếu click vào khoảng trống (không phải nhân vật hoặc thông báo)
        const target = e.target;
        const isCharacter = target.closest('.sprite-transition');
        const isNotification = target.closest('.notification-item');
        const isCharacterInfo = target.closest('.character-info');
        
        // Nếu click vào khoảng trống và chưa bật click-through
        if (!isCharacter && !isNotification && !isCharacterInfo && !clickThroughEnabled) {
          // Bật click-through tạm thời
          clickThroughEnabled = true;
          window.electronAPI?.enableClickThrough();
          
          // Tự động tắt sau 100ms để cho phép click tiếp theo
          setTimeout(() => {
            clickThroughEnabled = false;
            window.electronAPI?.disableClickThrough();
          }, 100);
        }
      });
      
      // Đảm bảo click-through bị tắt khi hover vào các element có thể tương tác
      document.addEventListener('mouseenter', (e) => {
        const target = e.target;
        const isCharacter = target.closest('.sprite-transition');
        const isNotification = target.closest('.notification-item');
        const isCharacterInfo = target.closest('.character-info');
        
        if (isCharacter || isNotification || isCharacterInfo) {
          clickThroughEnabled = false;
          window.electronAPI?.disableClickThrough();
        }
      });
    `);
  });

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
  versions: process.versions,
  
  // API cho click-through
  enableClickThrough: () => {
    ipcRenderer.send('enable-click-through');
  },
  
  disableClickThrough: () => {
    ipcRenderer.send('disable-click-through');
  }
});
`;

fs.writeFileSync('preload.js', preloadContent);

// IPC handlers cho click-through
const { ipcMain } = require('electron');

ipcMain.on('enable-click-through', () => {
  if (mainWindow) {
    mainWindow.setIgnoreMouseEvents(true, { forward: true });
  }
});

ipcMain.on('disable-click-through', () => {
  if (mainWindow) {
    mainWindow.setIgnoreMouseEvents(false);
  }
});

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
