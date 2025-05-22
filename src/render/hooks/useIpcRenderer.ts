/* eslint-disable */
import React, { useEffect, useRef, useCallback } from 'react';
import { IpcRendererEvent } from 'electron';

// 定义全局类型
declare global {
  interface Window {
    ipcRenderer: {
      send: (channel: string, ...args: any[]) => void;
      invoke: (channel: string, ...args: any[]) => Promise<any>;
      on: (channel: string, callback: (event: IpcRendererEvent, ...args: any[]) => void) => () => void;
      once: (channel: string, callback: (event: IpcRendererEvent, ...args: any[]) => void) => () => void;
    };
  }
}

interface IpcRendererListener {
  (event: IpcRendererEvent, ...args: any[]): void;
}

export default {
  on: (channel: string, callback: IpcRendererListener, deps?: React.DependencyList) => {
    const channelRef = useRef(channel);
    const callbackRef = useRef(callback);
    
    const wrappedCallback = useCallback((event: IpcRendererEvent, ...args: any[]) => {
      try {
        callbackRef.current(event, ...args);
      } catch (error) {
        console.error(`Error in IPC listener for channel ${channel}:`, error);
      }
    }, []);

    useEffect(() => {
      try {
        const removeListener = window.ipcRenderer.on(channelRef.current, wrappedCallback);
        return () => {
          removeListener();
        };
      } catch (error) {
        console.error(`Error setting up IPC listener for channel ${channel}:`, error);
        return () => {};
      }
    }, deps);
  },

  once: (channel: string, callback: IpcRendererListener, deps?: React.DependencyList) => {
    const channelRef = useRef(channel);
    const callbackRef = useRef(callback);
    
    const wrappedCallback = useCallback((event: IpcRendererEvent, ...args: any[]) => {
      try {
        callbackRef.current(event, ...args);
      } catch (error) {
        console.error(`Error in IPC once listener for channel ${channel}:`, error);
      }
    }, []);

    useEffect(() => {
      try {
        const removeListener = window.ipcRenderer.once(channelRef.current, wrappedCallback);
        return () => {
          removeListener();
        };
      } catch (error) {
        console.error(`Error setting up IPC once listener for channel ${channel}:`, error);
        return () => {};
      }
    }, deps);
  },
};
