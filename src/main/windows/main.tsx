import { BaseWindow, WebContentsView, screen } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    backgroundMaterial: 'acrylic',
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
  titleBar.setBackgroundColor("#00000000");

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
  view.setBackgroundColor("#00000000");

  const resize = () => {
    const bounds = baseWindow.getBounds();
    // 确保宽度不超过屏幕宽度
    const safeWidth = Math.min(bounds.width, screenWidth);
    const safeHeight = Math.min(bounds.height, screenHeight);
    
    titleBar.setBounds({ x: 0, y: 0, width: safeWidth, height: 42 });
    view.setBounds({ x: 0, y: 42, width: safeWidth, height: safeHeight - 42 });
  }
  resize();

  baseWindow.on('blur', () => {
    baseWindow.setBackgroundMaterial('acrylic');
  });

  baseWindow.on('focus', () => {
    baseWindow.setBackgroundMaterial('acrylic');
  });

  baseWindow.on('resize', resize);
  
  // 添加最大化事件处理
  baseWindow.on('maximize', () => {
    // 最大化时重新计算边界
    setTimeout(resize, 100);
  });

  // 添加恢复事件处理
  baseWindow.on('unmaximize', () => {
    // 恢复时重新计算边界
    setTimeout(resize, 100);
  });

  view.webContents.openDevTools({
    mode: 'detach',
  });
}

export default createWindow;
