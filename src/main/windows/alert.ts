import { BrowserWindow, ipcMain } from 'electron';
import os from 'os';

import { PRELOAD_PATH } from '@/utils/constant';
import { loadContent } from '@/utils/loader';

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

class AlertWindowInstance {
  private alertId: string;
  private props: AlertWindowProps;

  private browserWindow!: BrowserWindow;
  private resolvePromise!: (value: boolean | string) => void;
  private handleAlertEvents: (event: Electron.IpcMainEvent, data: any) => void;

  constructor(props: AlertWindowProps) {
    this.alertId = Math.random().toString(36).substring(2, 11);
    this.props = props;

    this.handleAlertEvents = this.onAlertEvents.bind(this);
  }

  open(): Promise<boolean | string> {
    return new Promise((resolve) => {
      this.resolvePromise = resolve;
      this.createWindow();
    });
  }

  private createWindow() {
    const {
      type = 'confirm',
      title,
      content,
      okText = false,
      cancelText = false,
      width = 360,
      height = 152,
      parent,
    } = this.props;

    const platform = os.platform();

    this.browserWindow = new BrowserWindow({
      width,
      height,
      frame: false,
      vibrancy: 'fullscreen-ui',
      backgroundMaterial: 'acrylic',
      opacity: 0,
      show: false,
      resizable: false,
      maximizable: false,
      minimizable: false,
      modal: true,
      parent,
      webPreferences: {
        nodeIntegration: false,
        preload: PRELOAD_PATH,
      },
    });

    loadContent(this.browserWindow.webContents, 'alert', {
      alertId: this.alertId,
      type,
      title,
      content,
      okText,
      cancelText,
    });

    ipcMain.on('alertEvents', this.handleAlertEvents);

    this.browserWindow.on('blur', () => {
      if (platform === 'win32') {
        this.browserWindow.setBackgroundMaterial('acrylic');
      }
    });

    this.browserWindow.on('focus', () => {
      if (platform === 'win32') {
        this.browserWindow.setBackgroundMaterial('acrylic');
      }
    });

    this.browserWindow.on('close', () => {
      if (this.props.parent != null && !this.props.parent.isDestroyed()) {
        this.props.parent.focus();
      }
    });

    this.browserWindow.on('closed', () => {
      ipcMain.removeListener('alertEvents', this.handleAlertEvents);
      this.resolvePromise(false);
    });
  }

  private fadeIn(duration: number = 150) {
    const startOpacity = this.browserWindow.getOpacity();
    const targetOpacity = 1;
    const steps = 15;
    const stepDuration = duration / steps;
    const opacityStep = (targetOpacity - startOpacity) / steps;
    let currentStep = 0;

    const animate = () => {
      if (currentStep < steps && !this.browserWindow.isDestroyed()) {
        currentStep++;
        const newOpacity = Math.min(startOpacity + opacityStep * currentStep, 1);
        this.browserWindow.setOpacity(newOpacity);
        setTimeout(animate, stepDuration);
      }
    };

    animate();
  }

  private onAlertEvents(_: Electron.IpcMainEvent, data: any) {
    const { alertId, event, ...restProps } = data;
    if (alertId === this.alertId) {
      if (event === 'show') {
        this.browserWindow.show();
        if (restProps.width || restProps.height) {
          this.browserWindow.setSize(
            restProps.width || this.browserWindow.getBounds().width,
            restProps.height || this.browserWindow.getBounds().height,
          );
          this.browserWindow.center();
          this.fadeIn();
        }
      } else if (event === 'confirm') {
        this.browserWindow.close();
        this.resolvePromise(restProps.data || true);
      } else if (event === 'close') {
        this.browserWindow.close();
        this.resolvePromise(false);
      }
    }
  }
}

export class AlertWindow {
  static open(props: AlertWindowProps): Promise<boolean | string> {
    const instance = new AlertWindowInstance(props);
    return instance.open();
  }
}

export default AlertWindow;
