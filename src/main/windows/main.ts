import { BaseWindow, screen, WebContentsView } from 'electron';
import path from 'path';

import { loadContent } from '../utils/loader';

export let baseWindow: BaseWindow;
export let titleBar: WebContentsView;
export let view: WebContentsView;

const WIDTH = 800;
const HEIGHT = 600;

export const createWindow = () => {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width: screenWidth, height: screenHeight } = primaryDisplay.workAreaSize;

  baseWindow = new BaseWindow({
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
  });

  titleBar = new WebContentsView({
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, './preload.js'),
    },
  });
  loadContent(titleBar.webContents, 'title');
  baseWindow.contentView.addChildView(titleBar);
  titleBar.setBackgroundColor('#00000000');

  view = new WebContentsView({
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, './preload.js'),
    },
  });
  loadContent(view.webContents, 'index');
  baseWindow.contentView.addChildView(view);
  view.setBackgroundColor('#00000000');

  Promise.all([
    new Promise((resolve) => titleBar.webContents.on('did-finish-load', () => resolve(true))),
    new Promise((resolve) => view.webContents.on('did-finish-load', () => resolve(true))),
  ]).then(() => baseWindow.show());

  const resize = () => {
    const bounds = baseWindow.getBounds();
    // 确保宽度不超过屏幕宽度
    const safeWidth = Math.min(bounds.width, screenWidth);
    const safeHeight = Math.min(bounds.height, screenHeight);

    titleBar.setBounds({ x: 0, y: 0, width: safeWidth, height: 42 });
    view.setBounds({ x: 0, y: 42, width: safeWidth, height: safeHeight - 42 });
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
