import { app, BrowserWindow } from 'electron';
import { platform } from 'os';

import AlertWindow from '@/windows/alert';

import ipcMain from './constructor';

export default () => {
  ipcMain.handle('getOs', () => {
    return platform();
  });

  ipcMain.handle('minimize', (e) => {
    const currentWindow = BrowserWindow.fromWebContents(e.sender)!;
    currentWindow.minimize();
  })

  ipcMain.handle('resize', (e) => {
    const currentWindow = BrowserWindow.fromWebContents(e.sender)!;
    const isMaximized = currentWindow.isMaximized();
    if (isMaximized) {
      currentWindow.unmaximize();
    } else {
      currentWindow.maximize();
    }
    return !isMaximized;
  })

  ipcMain.handle('resizeStatus', (e) => {
    const currentWindow = BrowserWindow.fromWebContents(e.sender)!;
    const isMaximized = currentWindow.isMaximized();
    return isMaximized;
  });

  ipcMain.handle('close', (e) => {
    const currentWindow = BrowserWindow.fromWebContents(e.sender)!;
    currentWindow.close();
  });

  ipcMain.handle('shutdown', () => {
    app.quit();
    app.exit();
  });

  ipcMain.handle('openAlert', (e, data) => {
    const { title, content, okText, cancelText } = data;
    const currentWindow = BrowserWindow.fromWebContents(e.sender)!;
    return AlertWindow.open({
      title,
      content,
      okText,
      cancelText,
      parent: currentWindow,
    });
  });
};
