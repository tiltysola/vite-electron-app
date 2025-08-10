/* eslint-disable */
import React, { useEffect, useRef } from 'react';
import { IpcRendererEvent } from 'electron';

interface IpcRendererListener {
  (event: IpcRendererEvent, ...args: any[]): void;
}

export default {
  on: (channel: string, callback: IpcRendererListener, deps?: React.DependencyList) => {
    const channelRef = useRef(channel);
    const callbackRef = useRef(callback);

    // Update callbackRef when callback changes
    useEffect(() => {
      callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
      const removeListener = ipcRenderer.on(channelRef.current, callbackRef.current);
      return () => {
        removeListener();
      };
    }, deps || []);
  },
  once: (channel: string, callback: IpcRendererListener, deps?: React.DependencyList) => {
    const channelRef = useRef(channel);
    const callbackRef = useRef(callback);

    // Update callbackRef when callback changes
    useEffect(() => {
      callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
      const removeListener = ipcRenderer.once(channelRef.current, callbackRef.current);
      return () => {
        removeListener();
      };
    }, deps || []);
  },
};
