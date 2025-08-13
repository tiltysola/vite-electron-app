import { BrowserWindow } from 'electron';

import createAlertWindow from '../windows/alert';
import ipcMain from './constructor';

export default () => {
  ipcMain.handle('alertOpen', (e, data) => {
    const { title, content, okText, cancelText } = data;
    const currentWindow = BrowserWindow.fromWebContents(e.sender)!;
    return createAlertWindow({
      title,
      content,
      okText,
      cancelText,
      parent: currentWindow,
    });
  });

  ipcMain.handle('alertSetHeight', (e, data) => {
    const { height } = data;
    const safeHeight = Math.max(48, height);
    const currentWindow = BrowserWindow.fromWebContents(e.sender);
    if (currentWindow && !currentWindow.isDestroyed()) {
      currentWindow.setSize(currentWindow.getBounds().width, safeHeight + 112);
    }
  });
};
