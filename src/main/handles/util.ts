import { platform } from 'os';

import ipcMain from './constructor';

export default () => {
  ipcMain.handle('utilGetOs', () => {
    return platform();
  });
};
