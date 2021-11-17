import { ipcMain } from 'electron';

const sayHello = () => {
  ipcMain.on('say_hello', (e, ...args) => {
    console.log(...args);
    e.reply('reply_hello', 'hello');
  });

  ipcMain.handle('invoke', () => {
    return 'handled';
  });
};

export default sayHello;
