/* eslint-disable no-console */

import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

// 定义允许的通道名称类型
type AllowedChannels = string;

const _ipcRenderer = {
  send: (channel: AllowedChannels, ...args: any[]) => {
    try {
      ipcRenderer.send(channel, ...args);
    } catch (error) {
      console.error(`Error sending IPC message to channel ${channel}:`, error);
    }
  },

  invoke: async (channel: AllowedChannels, ...args: any[]) => {
    try {
      return await ipcRenderer.invoke(channel, ...args);
    } catch (error) {
      console.error(`Error invoking IPC message on channel ${channel}:`, error);
      throw error; // 重新抛出错误以便调用者处理
    }
  },

  on: (channel: AllowedChannels, callback: (event: IpcRendererEvent, ...args: any[]) => void) => {
    try {
      ipcRenderer.on(channel, callback);
      return () => {
        try {
          ipcRenderer.removeListener(channel, callback);
        } catch (error) {
          console.error(`Error removing listener for channel ${channel}:`, error);
        }
      };
    } catch (error) {
      console.error(`Error setting up listener for channel ${channel}:`, error);
      return () => {};
    }
  },

  once: (channel: AllowedChannels, callback: (event: IpcRendererEvent, ...args: any[]) => void) => {
    try {
      ipcRenderer.once(channel, callback);
      return () => {
        try {
          ipcRenderer.removeListener(channel, callback);
        } catch (error) {
          console.error(`Error removing once listener for channel ${channel}:`, error);
        }
      };
    } catch (error) {
      console.error(`Error setting up once listener for channel ${channel}:`, error);
      return () => {};
    }
  },
} as const;

export type IpcRenderer = Readonly<typeof _ipcRenderer>;

// 暴露给渲染进程
contextBridge.exposeInMainWorld('ipcRenderer', _ipcRenderer);
