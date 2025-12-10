import { ipcMain as _ipcMain } from 'electron';

import logger from '@/utils/logger';

// IpcMain: Package ipcMain to log the channel and listener.
export default {
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
// IpcMain: end
