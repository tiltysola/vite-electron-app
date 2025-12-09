import { BrowserWindow, ipcMain } from 'electron';
import os from 'os';
import path from 'path';

import { ENTRY_PATH } from '../utils/constant';
import { loadContent } from '../utils/loader';

export interface AlertProps {
  type?: 'confirm' | 'input';
  title?: string;
  content: string;
  okText?: string | false;
  cancelText?: string | false;
}

interface AlertWindowProps extends AlertProps {
  width?: number;
  height?: number;
  parent: BrowserWindow;
}


export const createWindow = (props: AlertWindowProps): Promise<boolean> => {
  let browserWindow: BrowserWindow;

  const {
    type = 'confirm',
    title,
    content,
    okText = false,
    cancelText = false,
    width = 360,
    height = 152,
    parent,
  } = props;

  const platform = os.platform();

  return new Promise((resolve) => {
    const alertId = Math.random().toString(36).substring(2, 11);

    browserWindow = new BrowserWindow({
      width,
      height,
      frame: false,
      vibrancy: 'fullscreen-ui',
      backgroundMaterial: 'acrylic',
      show: false,
      resizable: false,
      maximizable: false,
      minimizable: false,
      modal: true,
      parent,
      webPreferences: {
        nodeIntegration: false,
        preload: path.join(__dirname, '../preload/index.js'),
      },
    });

    loadContent(browserWindow.webContents, 'alert', {
      alertId,
      type,
      title,
      content,
      okText,
      cancelText,
    });

    const handleAlertEvents = (e: any, data: any) => {
      const { alertId: _alertId, event, ...restProps } = data;
      if (_alertId === alertId) {
        if (event === 'show') {
          browserWindow.show();
          if (restProps.width || restProps.height) {
            browserWindow.setSize(
              restProps.width || browserWindow.getBounds().width,
              restProps.height || browserWindow.getBounds().height,
            );
            browserWindow.center();
          }
        } else if (event === 'confirm') {
          browserWindow.close();
          resolve(restProps.data || true);
        } else if (event === 'close') {
          browserWindow.close();
          resolve(false);
        }
      }
    }
    ipcMain.on('alertEvents', handleAlertEvents);
  
    browserWindow.on('blur', () => {
      if (platform === 'win32') {
        browserWindow.setBackgroundMaterial('acrylic');
      }
    });

    browserWindow.on('focus', () => {
      if (platform === 'win32') {
        browserWindow.setBackgroundMaterial('acrylic');
      }
    });

    browserWindow.on('close', () => {
      if (parent != null && !parent.isDestroyed()) {
        parent.focus();
      }
    });

    browserWindow.on('closed', () => {
      ipcMain.removeListener('alertEvents', handleAlertEvents);
      resolve(false);
    });
  });
};

export default createWindow;
