import { ipcMain as _ipcMain } from 'electron';

import logger from './logger';

export const ipcMain = {
  on: (channel: string, listener: (event: Electron.IpcMainEvent, ...args: any[]) => void) => {
    logger.info('[IpcMain]', `Registered \`${channel}\` channel & eventListener.`);
    _ipcMain.on(channel, listener);
  },
  handle: (
    channel: string,
    listener: (event: Electron.IpcMainInvokeEvent, ...args: any[]) => any,
  ) => {
    logger.info('[IpcMain]', `Registered \`${channel}\` channel & handleListener.`);
    _ipcMain.handle(channel, listener);
  },
};
