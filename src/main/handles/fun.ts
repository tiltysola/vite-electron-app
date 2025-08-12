import { BrowserWindow, screen } from 'electron';

import createAlertWindow from '../windows/alert';
import { sideBar, titleBar, view } from '../windows/main';
import ipcMain from './constructor';

export default () => {
  ipcMain.on('funSayHello', (e, data) => {
    setTimeout(() => {
      e.reply('funReplyHello', `接收到了一条长度为${data.content.length}的消息`);
    }, 1000);
  });

  ipcMain.handle('funInvoke', (e, data) => {
    return `接收到了一条长度为${data.content.length}的消息`;
  });

  ipcMain.handle('funOpenDevTools', (e, data) => {
    if (data === 'title') {
      titleBar.webContents.openDevTools({
        mode: 'detach',
      });
    } else if (data === 'side') {
      sideBar.webContents.openDevTools({
        mode: 'detach',
      });
    } else if (data === 'view') {
      view.webContents.openDevTools({
        mode: 'detach',
      });
    }
  });

  ipcMain.handle('funOpenAlert', (e, data) => {
    const { title, content } = data;
    const currentWindow = BrowserWindow.fromWebContents(e.sender)!;
    createAlertWindow({
      title,
      content,
      parent: currentWindow,
    });
  });

  ipcMain.handle('funSetHeight', (e, data) => {
    const { height } = data;
    const safeHeight = Math.max(96, height);
    const currentWindow = BrowserWindow.fromWebContents(e.sender)!;
    currentWindow.setSize(currentWindow.getBounds().width, safeHeight + 64);
  });

  ipcMain.handle('funCursorPosition', () => {
    const primaryDisplay = screen.getPrimaryDisplay();
    return { ...primaryDisplay.bounds, ...screen.getCursorScreenPoint() };
  });
};
