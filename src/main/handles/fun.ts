/* eslint-disable no-console */

import { ipcMain } from 'electron';

const fun = () => {
  ipcMain.on('funSayHello', (e, ...args) => {
    console.log(...args);
    e.reply('funReplyHello', 'hello');
  });

  ipcMain.handle('funGetDirTree', async (e, ...args) => {
    console.log(...args);
    return 'handled';
  });

  ipcMain.handle('invoke', () => {
    return 'handled';
  });
};

export default fun;
