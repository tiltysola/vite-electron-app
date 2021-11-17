import path from 'path';
import { app, BrowserWindow } from 'electron';
import ipcSayHello from './service/sayHello';
import router from './controller';

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, './preload.js'),
    },
  });

  process.env.ENV === 'production' ? win.loadFile(path.join(__dirname, '../render/index.html')) :
    win.loadURL(`http://localhost:${process.env.PORT}`);
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // If app is active but no window found, reinit window.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  // ipcMain & ipcRenderer example handle function.
  ipcSayHello();

  // ajax request controller.
  router();
});

app.on('window-all-closed', () => {
  // If platform is not darwin, quit the app.
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
