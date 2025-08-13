import { screen } from 'electron';

import { sideBar, titleBar, view } from '../windows/main';
import ipcMain from './constructor';

export default () => {
  ipcMain.on('funSayHello', (e, data) => {
    setTimeout(() => {
      e.reply('funReplyHello', `接收到了一条长度为${data.content.length}的消息`);
    }, 1000);
  });

  ipcMain.handle('funInvoke', (e, data) => {
    const { content } = data;
    return `接收到了一条长度为${content.length}的消息`;
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

  ipcMain.handle('funCursorPosition', () => {
    const primaryDisplay = screen.getPrimaryDisplay();
    return { ...primaryDisplay.bounds, ...screen.getCursorScreenPoint() };
  });
};
