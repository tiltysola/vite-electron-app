import { BrowserWindow, screen } from 'electron';
import os from 'os';

import { PRELOAD_PATH } from '@/utils/constant';
import { loadContent } from '@/utils/loader';

const WIDTH = 1200;
const HEIGHT = 800;

class MainWindowInstance {
  browserWindow?: BrowserWindow;

  show() {
    this.createWindow();
  }

  sendMsg(event: string, data: any) {
    if (this.browserWindow && !this.browserWindow.isDestroyed()) {
      this.browserWindow.webContents.send(event, data);
    }
  }

  private createWindow() {
    const primaryDisplay = screen.getPrimaryDisplay();
    const screenWidth = primaryDisplay.workAreaSize.width;
    const screenHeight = primaryDisplay.workAreaSize.height;

    const platform = os.platform();

    if (!this.browserWindow || this.browserWindow.isDestroyed()) {
      this.browserWindow = new BrowserWindow({
        width: WIDTH,
        height: HEIGHT,
        frame: false,
        vibrancy: 'fullscreen-ui',
        backgroundMaterial: 'acrylic',
        minWidth: WIDTH,
        minHeight: HEIGHT,
        maxWidth: screenWidth,
        maxHeight: screenHeight,
        show: false,
        webPreferences: {
          nodeIntegration: false,
          preload: PRELOAD_PATH,
        },
      });

      loadContent(this.browserWindow.webContents);

      this.browserWindow.on('ready-to-show', () => this.browserWindow!.show());
      
      this.browserWindow.on('blur', () => {
        if (platform === 'win32') {
          this.browserWindow!.setBackgroundMaterial('acrylic');
        }
      });
    
      this.browserWindow.on('focus', () => {
        if (platform === 'win32') {
          this.browserWindow!.setBackgroundMaterial('acrylic');
        }
      });
    } else {
      this.browserWindow.show();
      this.browserWindow.focus();
    }
  }
}

export class MainWindow {
  private static instance: MainWindowInstance;

  static show() {
    MainWindow.getInstance().show();
  }

  static sendMsg(event: string, data: any) {
    MainWindow.getInstance().sendMsg(event, data);
  }

  static getBrowserWindow() {
    return MainWindow.getInstance().browserWindow;
  }

  private static getInstance() {
    if (!MainWindow.instance) {
      MainWindow.instance = new MainWindowInstance();
    }
    return MainWindow.instance;
  }
}

export default MainWindow;
