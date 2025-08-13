import { app, BrowserWindow } from 'electron';

import ipcMain from './constructor';

export default () => {
  ipcMain.handle('controlMinimize', (e) => {
    const currentWindow = BrowserWindow.fromWebContents(e.sender)!;
    currentWindow.minimize();
  });

  ipcMain.handle('controlResize', (e) => {
    const currentWindow = BrowserWindow.fromWebContents(e.sender)!;
    const isMaximized = currentWindow.isMaximized();
    if (isMaximized) {
      currentWindow.unmaximize();
    } else {
      currentWindow.maximize();
    }
    return !isMaximized;
  });

  ipcMain.handle('controlResizeStatus', (e) => {
    const currentWindow = BrowserWindow.fromWebContents(e.sender)!;
    const isMaximized = currentWindow.isMaximized();
    return isMaximized;
  });

  ipcMain.handle('controlClose', (e) => {
    const currentWindow = BrowserWindow.fromWebContents(e.sender)!;
    currentWindow.close();
  });

  ipcMain.handle('controlShutdown', () => {
    app.quit();
    app.exit();
  });
};
