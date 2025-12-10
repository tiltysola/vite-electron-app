import { BaseWindow, screen, WebContentsView } from 'electron';

import { loadContent } from '@/utils/loader';
import { PRELOAD_PATH } from '@/utils/constant';

const WIDTH = 1200;
const HEIGHT = 800;

class MainWindowInstance {
  public baseWindow?: BaseWindow;
  public view?: WebContentsView;
  public titleBar?: WebContentsView;
  public sideBar?: WebContentsView;

  public show() {
    this.createWindow();
  }

  public sendMsg(event: string, data: any) {
    if (this.baseWindow && !this.baseWindow.isDestroyed()) {
      this.view!.webContents.send(event, data);
      this.titleBar!.webContents.send(event, data);
      this.sideBar!.webContents.send(event, data);
    }
  }

  private createWindow() {
    const primaryDisplay = screen.getPrimaryDisplay();
    const screenWidth = primaryDisplay.workAreaSize.width;
    const screenHeight = primaryDisplay.workAreaSize.height;

    if (!this.baseWindow || this.baseWindow.isDestroyed()) {
      this.baseWindow = new BaseWindow({
        width: WIDTH,
        height: HEIGHT,
        frame: false,
        vibrancy: 'fullscreen-ui',
        backgroundMaterial: 'acrylic',
        minWidth: WIDTH,
        minHeight: HEIGHT,
        maxWidth: screenWidth,
        maxHeight: screenHeight,
        show: true,
      });

      this.view = new WebContentsView({
        webPreferences: {
          nodeIntegration: false,
          preload: PRELOAD_PATH,
        },
      });
      loadContent(this.view.webContents, 'index');
      this.baseWindow.contentView.addChildView(this.view);
      this.view.setBackgroundColor('#00000000');

      this.titleBar = new WebContentsView({
        webPreferences: {
          nodeIntegration: false,
          preload: PRELOAD_PATH,
        },
      });
      loadContent(this.titleBar.webContents, 'title');
      this.baseWindow.contentView.addChildView(this.titleBar);
      this.titleBar.setBackgroundColor('#00000000');
    
      this.sideBar = new WebContentsView({
        webPreferences: {
          nodeIntegration: false,
          preload: PRELOAD_PATH,
        },
      });
      loadContent(this.sideBar.webContents, 'side');
      this.baseWindow.contentView.addChildView(this.sideBar);
      this.sideBar.setBackgroundColor('#00000000');
    
      Promise.all([
        new Promise((resolve) => this.view!.webContents.on('did-finish-load', () => resolve(true))),
        new Promise((resolve) => this.titleBar!.webContents.on('did-finish-load', () => resolve(true))),
        new Promise((resolve) => this.sideBar!.webContents.on('did-finish-load', () => resolve(true))),
      ]).then(() => this.baseWindow!.show());
      
      const resize = () => {
        const bounds = this.baseWindow!.getBounds();
        // 确保宽度不超过屏幕宽度
        const safeWidth = Math.min(bounds.width, screenWidth);
        const safeHeight = Math.min(bounds.height, screenHeight);
    
        this.view!.setBounds({ x: 64, y: 0, width: safeWidth - 64, height: safeHeight });
        this.titleBar!.setBounds({ x: 64, y: 0, width: safeWidth - 64, height: 32 });
        this.sideBar!.setBounds({ x: 0, y: 0, width: 64, height: safeHeight });
      };
      resize();
    
      this.baseWindow.on('blur', () => {
        this.baseWindow!.setBackgroundMaterial('acrylic');
      });
    
      this.baseWindow.on('focus', () => {
        this.baseWindow!.setBackgroundMaterial('acrylic');
      });
    
      this.baseWindow.on('resize', resize);
    } else {
      this.baseWindow.show();
      this.baseWindow.focus();
    }
  }
}

export class MainWindow {
  private static instance: MainWindowInstance;

  private static getInstance() {
    if (!MainWindow.instance) {
      MainWindow.instance = new MainWindowInstance();
    }
    return MainWindow.instance;
  }

  static show() {
    MainWindow.getInstance().show();
  }

  static sendMsg(event: string, data: any) {
    MainWindow.getInstance().sendMsg(event, data);
  }

  static getBaseWindow() {
    return MainWindow.getInstance().baseWindow;
  }

  static getView() {
    return MainWindow.getInstance().view;
  }

  static getTitleBar() {
    return MainWindow.getInstance().titleBar;
  }

  static getSideBar() {
    return MainWindow.getInstance().sideBar;
  }
}

export default MainWindow;
