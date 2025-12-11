/* eslint-disable no-console */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

import { AlertProps } from '../main/windows/alert';

const _ipcRenderer = {
  send: (channel: string, ...args: any[]) => {
    console.log('[IpcMain]', `Channel: \`${channel}\`,`, 'Direction: Renderer => Main.');
    ipcRenderer.send(channel, ...args);
  },
  invoke: (channel: string, ...args: any[]) => {
    console.log('[IpcMain]', `Channel: \`${channel}\`,`, 'Direction: Invoke.');
    return ipcRenderer.invoke(channel, ...args);
  },
  on: (channel: string, callback: (event: IpcRendererEvent, ...args: any[]) => void) => {
    const autoLog = () => {
      console.log('[IpcMain]', `Channel: \`${channel}\`,`, 'Direction: Main => Renderer.');
    };
    ipcRenderer.on(channel, autoLog);
    ipcRenderer.on(channel, callback);
    // Return a function to clean up listeners
    return () => {
      ipcRenderer.removeListener(channel, autoLog);
      ipcRenderer.removeListener(channel, callback);
    };
  },
  once: (channel: string, callback: (event: IpcRendererEvent, ...args: any[]) => void) => {
    const autoLog = () => {
      console.log('[IpcMain]', `Channel: \`${channel}\`,`, 'Direction: Main => Renderer.');
    };
    ipcRenderer.once(channel, autoLog);
    ipcRenderer.once(channel, callback);
    // Return a function to clean up listeners
    return () => {
      ipcRenderer.removeListener(channel, autoLog);
      ipcRenderer.removeListener(channel, callback);
    };
  },
} as const;

export type IpcRenderer = Readonly<typeof _ipcRenderer>;

const _electronAlert = {
  open: (props: AlertProps) => {
    return ipcRenderer.invoke('openAlert', props);
  },
} as const;

export type ElectronAlert = Readonly<typeof _electronAlert>;

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('ipcRenderer', _ipcRenderer);
    contextBridge.exposeInMainWorld('electronAlert', _electronAlert);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore ts-2339
  window.ipcRenderer = _ipcRenderer;
  // @ts-ignore ts-2339
  window.electronAlert = _electronAlert;
}
