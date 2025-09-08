
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
  },
  
  // API đóng ứng dụng
  closeApp: () => {
    ipcRenderer.send('close-app');
  }
});
