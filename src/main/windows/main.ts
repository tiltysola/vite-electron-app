import { BaseWindow, screen, WebContentsView } from 'electron';
import path from 'path';

export let baseWindow: BaseWindow;
export let titleBar: WebContentsView;
export let view: WebContentsView;

export const createWindow = () => {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width: screenWidth, height: screenHeight } = primaryDisplay.workAreaSize;

  baseWindow = new BaseWindow({
    width: 800,
    height: 600,
    frame: false,
    vibrancy: 'fullscreen-ui',
    backgroundMaterial: 'acrylic',
    minWidth: 800,
    minHeight: 600,
    maxWidth: screenWidth,
    maxHeight: screenHeight,
  });

  titleBar = new WebContentsView({
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, './preload.js'),
    },
  });
  switch (process.env.ENV) {
    case 'production':
      titleBar.webContents.loadFile(path.join(__dirname, '../render/title.html'));
      break;
    default:
      titleBar.webContents.loadURL(`http://localhost:${process.env.PORT}/title.html`);
  }
  baseWindow.contentView.addChildView(titleBar);
  titleBar.setBackgroundColor('#00000000');

  view = new WebContentsView({
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, './preload.js'),
    },
  });
  switch (process.env.ENV) {
    case 'production':
      view.webContents.loadFile(path.join(__dirname, '../render/index.html'));
      break;
    default:
      view.webContents.loadURL(`http://localhost:${process.env.PORT}`);
  }
  baseWindow.contentView.addChildView(view);
  view.setBackgroundColor('#00000000');

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

  view.webContents.openDevTools({
    mode: 'detach',
  });
};

export default createWindow;
