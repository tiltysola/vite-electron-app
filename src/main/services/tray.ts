import { app, Menu, Tray } from 'electron';
import path from 'path';

import { APP_PATH } from '@/utils/constant';
import MainWindow from '@/windows/main';

export default () => {
  /* SystemTray: start */
  const trayPath = path.join(APP_PATH, 'build/icons/png/16x16.png');

  const systemTray = new Tray(trayPath);

  const contextMenu = Menu.buildFromTemplate([
    {
      label: '打开应用',
      click: () => {
        MainWindow.show();
      },
    },
    {
      type: 'separator',
    },
    {
      label: '退出应用',
      click: () => {
        app.quit();
        app.exit();
      },
    },
  ]);
  systemTray.setToolTip('This is my application.');
  systemTray.setContextMenu(contextMenu);
  /* SystemTray: end */

  /* DoubleClick: start */
  systemTray.on('double-click', () => {
    MainWindow.show();
  });
  /* DoubleClick: end */
};
