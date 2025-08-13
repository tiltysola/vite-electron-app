import { BaseWindow, ipcMain, screen, WebContentsView } from 'electron';
import path from 'path';

import { loadContent } from '../utils/loader';

export interface AlertProps {
  title?: string;
  content: string;
  okText?: string | false;
  cancelText?: string | false;
}

interface AlertWindowProps extends AlertProps {
  width?: number;
  height?: number;
  parent: BaseWindow;
}

export let baseWindow: BaseWindow;
export let view: WebContentsView;
export let titleBar: WebContentsView;

export const createWindow = (props: AlertWindowProps): Promise<boolean> => {
  const {
    title,
    content,
    okText = false,
    cancelText = false,
    width = 400,
    height = 200,
    parent,
  } = props;

  return new Promise((resolve) => {
    const alertId = Math.random().toString(36).substring(2, 11);

    const primaryDisplay = screen.getPrimaryDisplay();
    const { width: screenWidth, height: screenHeight } = primaryDisplay.workAreaSize;

    baseWindow = new BaseWindow({
      width,
      height,
      frame: false,
      vibrancy: 'fullscreen-ui',
      backgroundMaterial: 'acrylic',
      show: false,
      resizable: false,
      modal: true,
      parent,
    });

    view = new WebContentsView({
      webPreferences: {
        nodeIntegration: false,
        preload: path.join(__dirname, './preload.js'),
      },
    });
    loadContent(view.webContents, 'alert', { alertId, title, content, okText, cancelText });
    baseWindow.contentView.addChildView(view);
    view.setBackgroundColor('#00000000');

    titleBar = new WebContentsView({
      webPreferences: {
        nodeIntegration: false,
        preload: path.join(__dirname, './preload.js'),
      },
    });
    loadContent(titleBar.webContents, 'title', {
      disableMinimize: 'true',
      disableMaximize: 'true',
    });
    baseWindow.contentView.addChildView(titleBar);
    titleBar.setBackgroundColor('#00000000');

    Promise.all([
      new Promise((_resolve) => view.webContents.on('did-finish-load', () => _resolve(true))),
      new Promise((_resolve) => titleBar.webContents.on('did-finish-load', () => _resolve(true))),
    ]).then(() => baseWindow.show());

    const handleAlertResult = (e: any, result: boolean) => {
      resolve(result);
      baseWindow.close();
    };
    ipcMain.once(`alertResult-${alertId}`, handleAlertResult);
    baseWindow.on('closed', () => {
      ipcMain.removeListener(`alertResult-${alertId}`, handleAlertResult);
      resolve(false);
    });

    const resize = () => {
      const bounds = baseWindow.getBounds();
      // 确保宽度不超过屏幕宽度
      const safeWidth = Math.min(bounds.width, screenWidth);
      const safeHeight = Math.min(bounds.height, screenHeight);

      view.setBounds({ x: 0, y: 0, width: safeWidth, height: safeHeight });
      titleBar.setBounds({ x: 0, y: 0, width: safeWidth, height: 32 });
    };
    resize();

    baseWindow.on('blur', () => {
      baseWindow.setBackgroundMaterial('acrylic');
    });

    baseWindow.on('focus', () => {
      baseWindow.setBackgroundMaterial('acrylic');
    });

    baseWindow.on('resize', resize);
  });
};

export default createWindow;
