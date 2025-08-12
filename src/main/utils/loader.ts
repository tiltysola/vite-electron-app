import { WebContents } from 'electron';
import path from 'path';

export const loadContent = (webContents: WebContents, type: string) => {
  switch (process.env.ENV) {
    case 'production':
      webContents.loadFile(path.join(__dirname, `../render/${type}.html`));
      break;
    default:
      webContents.loadURL(`http://localhost:${process.env.PORT}/${type}.html`);
  }
};
