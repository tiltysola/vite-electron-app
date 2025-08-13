import { ElectronAlert, IpcRenderer } from '../main/preload';

declare global {
  interface Window {
    ipcRenderer: IpcRenderer;
    electronAlert: ElectronAlert;
  }
  var ipcRenderer: IpcRenderer;
  var electronAlert: ElectronAlert;
}
