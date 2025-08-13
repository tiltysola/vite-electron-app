import { ipcMain } from 'electron';

import { baseWindow, sideBar, view } from '../windows/main';

export default () => {
  const path = '/';

  ipcMain.handle('routerGetPath', () => {
    return path;
  });

  ipcMain.handle('routerSetPath', (e, data) => {
    if (baseWindow !== null && !baseWindow.isDestroyed()) {
      view.webContents.send('routerSetPath', data);
      sideBar.webContents.send('routerSetPath', data);
    }
  });
};
