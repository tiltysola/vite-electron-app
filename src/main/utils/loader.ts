import { WebContents } from 'electron';
import path from 'path';

const isDev = process.env.ENV !== 'production';
const RENDERER_URL = process.env.ELECTRON_RENDERER_URL || 'http://localhost:5173';

export const loadContent = (
  webContents: WebContents,
  targetView?: string,
  props?: Record<string, unknown>,
): void => {
  const query = {
    targetView: targetView || 'index',
    props: JSON.stringify(props || {}),
  }
  if (isDev) {
    const url = new URL(`index.html`, RENDERER_URL);
    if (query) {
      Object.entries(query).forEach(([key, value]) => url.searchParams.set(key, value));
    }
    webContents.loadURL(url.toString());
  } else {
    webContents.loadFile(path.join(__dirname, `../renderer/index.html`), { query });
  }
};
