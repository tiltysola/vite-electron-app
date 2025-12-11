import { app, Menu, nativeImage, Tray } from 'electron';

import MainWindow from '@/windows/main';

import trayIcon from '../../../build/icons/png/16x16.png?asset';

export default () => {
  /* SystemTray: start */
  const systemTray = new Tray(nativeImage.createFromPath(trayIcon));

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
