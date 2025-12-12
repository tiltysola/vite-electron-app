import MainWindow from '@/windows/main';

import ipcMain from './constructor';

export default () => {
  ipcMain.on('funSayHello', (e, data) => {
    setTimeout(() => {
      e.reply('funReplyHello', `Received a message of length ${data.content.length}. (Event)`);
    }, 1000);
  });

  ipcMain.handle('funInvoke', (_, data) => {
    const { content } = data;
    return `Received a message of length ${content.length}. (Invoke)`;
  });

  ipcMain.handle('funOpenDevTools', () => {
    MainWindow.getBrowserWindow()?.webContents.openDevTools({
      mode: 'detach',
    });
  });
};
