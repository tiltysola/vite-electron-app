import { app } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

export const APP_PATH = path.join(app.getAppPath());

export const DOC_PATH = app.getPath('documents');

export const ENTRY_PATH = path.join(fileURLToPath(import.meta.url), '../');

export const PRELOAD_PATH = path.join(ENTRY_PATH, '../preload/index.js');
