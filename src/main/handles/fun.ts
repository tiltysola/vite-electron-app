import { screen } from 'electron';

import MainWindow from '@/windows/main';
import ipcMain from './constructor';

export default () => {
  ipcMain.on('funSayHello', (e, data) => {
    setTimeout(() => {
      e.reply('funReplyHello', `接收到了一条长度为${data.content.length}的消息`);
    }, 1000);
  });

  ipcMain.handle('funInvoke', (_, data) => {
    const { content } = data;
    return `接收到了一条长度为${content.length}的消息`;
  });

  ipcMain.handle('funOpenDevTools', (_, data) => {
    if (data === 'title') {
      MainWindow.getTitleBar()?.webContents.openDevTools({
        mode: 'detach',
      });
    } else if (data === 'side') {
      MainWindow.getSideBar()?.webContents.openDevTools({
        mode: 'detach',
      });
    } else if (data === 'view') {
      MainWindow.getView()?.webContents.openDevTools({
        mode: 'detach',
      });
    }
  });

  ipcMain.handle('funCursorPosition', () => {
    const primaryDisplay = screen.getPrimaryDisplay();
    return { ...primaryDisplay.bounds, ...screen.getCursorScreenPoint() };
  });
};
