import { app, WebContents } from 'electron';
import path from 'path';

const { ELECTRON_RENDERER_URL } = process.env;

export const loadContent = (
  webContents: WebContents,
  targetView?: string,
  props?: Record<string, unknown>,
): void => {
  const query = {
    targetView: targetView || 'index',
    props: JSON.stringify(props || {}),
  };
  if (!app.isPackaged && ELECTRON_RENDERER_URL) {
    const url = new URL(`index.html`, ELECTRON_RENDERER_URL);
    if (query) {
      Object.entries(query).forEach(([key, value]) => url.searchParams.set(key, value));
    }
    webContents.loadURL(url.toString());
  } else {
    webContents.loadFile(path.join(__dirname, `../renderer/index.html`), { query });
  }
};
