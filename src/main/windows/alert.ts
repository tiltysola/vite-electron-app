import { BaseWindow, screen, WebContentsView } from 'electron';
import path from 'path';

import { loadContent } from '../utils/loader';

interface AlertProps {
  title?: string;
  content: string;
  width?: number;
  height?: number;
  parent: BaseWindow;
}

export let baseWindow: BaseWindow;
export let view: WebContentsView;
export let titleBar: WebContentsView;

export const createWindow = (props: AlertProps) => {
  const { title, content, width = 400, height = 200, parent } = props;

  const primaryDisplay = screen.getPrimaryDisplay();
  const { width: screenWidth, height: screenHeight } = primaryDisplay.workAreaSize;

  baseWindow = new BaseWindow({
    width,
    height,
    frame: false,
    vibrancy: 'fullscreen-ui',
    backgroundMaterial: 'acrylic',
    // resizable: false,
    modal: true,
    show: false,
    parent,
  });

  view = new WebContentsView({
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, './preload.js'),
    },
  });
  loadContent(view.webContents, 'alert', { title: title || '', content: content || '' });
  baseWindow.contentView.addChildView(view);
  view.setBackgroundColor('#00000000');

  titleBar = new WebContentsView({
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, './preload.js'),
    },
  });
  loadContent(titleBar.webContents, 'title');
  baseWindow.contentView.addChildView(titleBar);
  titleBar.setBackgroundColor('#00000000');

  Promise.all([
    new Promise((resolve) => view.webContents.on('did-finish-load', () => resolve(true))),
    new Promise((resolve) => titleBar.webContents.on('did-finish-load', () => resolve(true))),
  ]).then(() => baseWindow.show());

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
};

export default createWindow;
