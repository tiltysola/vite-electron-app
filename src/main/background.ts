import { app, BaseWindow } from 'electron';

import ipcControl from './handles/control';
import ipcFun from './handles/fun';
import tray from './services/tray';
import { baseWindow } from './windows/main';
import createWindow from './windows/main';

/* SingleInstance: ensure only one application at the same time. */
const singleInstance = app.requestSingleInstanceLock();

if (!singleInstance && process.env.ENV !== 'development') {
  app.quit();
}
/* SingleInstance: end */

app.whenReady().then(() => {
  /* AppActivated: start */
  app.on('activate', () => {
    // If app is active but no window found, reinit window.
    if (BaseWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
  /* AppActivated: end */

  /* SecondInstance: when second instance started, quit and focus the first instance. */
  app.on('second-instance', () => {
    if (baseWindow && !baseWindow.isDestroyed()) {
      baseWindow.focus();
    } else {
      createWindow();
    }
  });
  /* SecondInstance: end */

  /* IpcSection: communication with frontend. */
  ipcControl();
  ipcFun();
  /* IpcSection: end */

  /* SystemTray: start */
  if (process.platform !== 'linux') {
    tray();
  }
  /* SystemTray: end */
});

/* WindowAllClosed: when all windows and trays are closed, quit app. */
app.on('window-all-closed', () => {
  /* !Darwin: start */
  if (process.platform !== 'darwin') {
    app.quit();
  }
  /* !Darwin: end */
});
/* WindowAllClosed: end */
