import { WebContents } from 'electron';
import path from 'path';

const ELECTRON_RENDERER_URL = process.env.ELECTRON_RENDERER_URL || 'http://localhost:5173';

export const loadContent = (
  webContents: WebContents,
  type: string,
  props?: Record<string, any>,
) => {
  const queryString = props && new URLSearchParams({ props: JSON.stringify(props) }).toString();
  switch (process.env.ENV) {
    case 'production':
      webContents.loadFile(path.join(__dirname, `../render/${type}.html?${queryString || ''}`));
      break;
    default:
      webContents.loadURL(`${ELECTRON_RENDERER_URL}/${type}.html?${queryString || ''}`);
  }
};
