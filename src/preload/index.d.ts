import { ElectronAlert, IpcRenderer } from './index';

declare global {
  interface Window {
    ipcRenderer: IpcRenderer;
    electronAlert: ElectronAlert;
  }
}
