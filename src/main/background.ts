import { app, BrowserWindow } from 'electron';

import ipcControl from './handles/control';
import ipcFun from './handles/fun';
import createWindow from './windows/main';

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // If app is active but no window found, reinit window.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  // ipcMain & ipcRenderer example handle function.
  ipcControl();
  ipcFun();
});

app.on('window-all-closed', () => {
  // If platform is not darwin, quit the app.
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
