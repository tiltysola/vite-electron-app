import { app, BrowserWindow } from 'electron';

import { ipcMain } from '../utils/ipc';

const control = () => {
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

  ipcMain.on('controlShutdown', () => {
    app.quit();
    app.exit();
  });
};

export default control;
