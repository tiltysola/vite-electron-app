import { app, BrowserWindow } from 'electron';

import ipcMain from './constructor';

export default () => {
  ipcMain.on('controlMinimize', (e) => {
    const currentWindow = BrowserWindow.fromWebContents(e.sender)!;
    currentWindow.minimize();
  });

  ipcMain.on('controlResize', (e) => {
    const currentWindow = BrowserWindow.fromWebContents(e.sender)!;
    const isMaximized = currentWindow.isMaximized();
    if (isMaximized) {
      currentWindow.unmaximize();
    } else {
      currentWindow.maximize();
    }
    e.reply('controlResizeStatus', !isMaximized);
  });

  ipcMain.on('controlResizeStatus', (e) => {
    const currentWindow = BrowserWindow.fromWebContents(e.sender)!;
    const isMaximized = currentWindow.isMaximized();
    e.reply('controlResizeStatus', isMaximized);
  });

  ipcMain.on('controlClose', (e) => {
    const currentWindow = BrowserWindow.fromWebContents(e.sender)!;
    currentWindow.close();
  });

  ipcMain.on('controlShutdown', () => {
    app.quit();
    app.exit();
  });
};
