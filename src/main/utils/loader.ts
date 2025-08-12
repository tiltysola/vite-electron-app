import { WebContents } from 'electron';
import path from 'path';

export const loadContent = (
  webContents: WebContents,
  type: string,
  props?: Record<string, string>,
) => {
  const queryString = new URLSearchParams(props).toString();
  switch (process.env.ENV) {
    case 'production':
      webContents.loadFile(path.join(__dirname, `../render/${type}.html?${queryString}`));
      break;
    default:
      webContents.loadURL(`http://localhost:${process.env.PORT}/${type}.html?${queryString}`);
  }
};
