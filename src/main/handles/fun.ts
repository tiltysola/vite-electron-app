import { ipcMain, screen } from 'electron';

const fun = () => {
  ipcMain.on('funSayHello', (e, data) => {
    setTimeout(() => {
      e.reply('funReplyHello', `接收到了一条长度为${data.content.length}的消息`);
    }, 1000);
  });

  ipcMain.handle('funInvoke', (e, data) => {
    return `接收到了一条长度为${data.content.length}的消息`;
  });

  ipcMain.handle('funCursorPosition', () => {
    const primaryDisplay = screen.getPrimaryDisplay();
    return { ...primaryDisplay.bounds, ...screen.getCursorScreenPoint() };
  });
};

export default fun;
