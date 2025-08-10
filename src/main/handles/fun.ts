 

import { ipcMain } from 'electron';

const fun = () => {
  ipcMain.on('funSayHello', (e, data) => {
    setTimeout(() => {
      e.reply('funReplyHello', `接收到了一条长度为${data.content.length}的消息`);
    }, 1000);
  });

  ipcMain.handle('invoke', (e, data) => {
    return `接收到了一条长度为${data.content.length}的消息`;
  });
};

export default fun;
