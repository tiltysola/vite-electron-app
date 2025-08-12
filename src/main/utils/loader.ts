import { WebContents } from 'electron';
import fs from 'fs';
import path from 'path';

import logger from './logger';

const deepPath = (_path: string, _source?: string): string[] => {
  const _files: any[] = [];
  if (fs.existsSync(_path)) {
    const files = fs.readdirSync(_path);
    for (const file of files) {
      if (fs.lstatSync(path.join(_path, file)).isDirectory()) {
        _files.push(...deepPath(path.join(_path, file), _source || _path));
      } else {
        const relativePath = path.join(_path, file).replace(_source || _path, '');
        if (/^.*\.[tj]s$/i.test(relativePath)) {
          const match = relativePath.match(/^(.*)\.[tj]s$/i);
          if (match && !path.basename(match[1]).startsWith('.')) {
            _files.push(relativePath);
          }
        }
      }
    }
  }
  return _files;
};

export const loadHandles = async (_path: string) => {
  const handles = deepPath(_path);
  for (const handle of handles) {
    // eslint-disable-next-line no-await-in-loop
    const handleModule = await import(path.join(_path, handle));
    const handleObject = handleModule.default;
    if (handleObject) {
      logger.info('[Loader]', 'Register handle:', handle);
      handleObject();
    }
  }
};

export const loadContent = (webContents: WebContents, type: string) => {
  switch (process.env.ENV) {
    case 'production':
      webContents.loadFile(path.join(__dirname, `../render/${type}.html`));
      break;
    default:
      webContents.loadURL(`http://localhost:${process.env.PORT}/${type}.html`);
  }
};
