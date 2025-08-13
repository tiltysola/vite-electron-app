import { WebContents } from 'electron';
import path from 'path';

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
      webContents.loadURL(`http://localhost:${process.env.PORT}/${type}.html?${queryString || ''}`);
  }
};
