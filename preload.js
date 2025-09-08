
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // Có thể thêm các API cần thiết ở đây
  platform: process.platform,
  versions: process.versions
});
