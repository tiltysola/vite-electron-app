import { app, BaseWindow } from 'electron';

import { registerAllHandles } from './handles';
import tray from './services/tray';
import MainWindow from './windows/main';

import './utils/errorHandler';

/* SingleInstance: ensure only one application at the same time. */
const singleInstance = app.requestSingleInstanceLock();

if (!singleInstance && process.env.ENV !== 'development') {
  app.quit();
}
/* SingleInstance: end */

/* Startup: if app is packaged, start at system startup. */
// if (app.isPackaged) {
//   /* Win32: start */
//   if (process.platform === 'win32') {
//     app.setLoginItemSettings({
//       openAtLogin: true,
//       openAsHidden: true,
//       args: ['--openAsHidden'],
//     });
//   }
//   /* Win32: end */
// }
/* Startup: end */

app.whenReady().then(() => {
  /* OpenAsHidden: judge if the application started at system startup */
  if (process.argv.indexOf('--openAsHidden') < 0) {
    MainWindow.show();
  }
  /* OpenAsHidden: end */

  /* AppActivated: start */
  app.on('activate', () => {
    // If app is active but no window found, reinit window.
    if (BaseWindow.getAllWindows().length === 0) {
      MainWindow.show();
    }
  });
  /* AppActivated: end */

  /* SecondInstance: when second instance started, quit and focus the first instance. */
  app.on('second-instance', () => {
    MainWindow.show();
  });
  /* SecondInstance: end */

  /* IpcSection: communication with frontend. */
  registerAllHandles();
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
