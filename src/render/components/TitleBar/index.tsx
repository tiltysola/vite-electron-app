import { useState } from 'react';

import packageJson from 'package.json';

import { useIpcRenderer } from '@/hooks';

import Close from '../Icon/Close';
import Maximize from '../Icon/Maximize';
import Minimize from '../Icon/Minimize';
import Minus from '../Icon/Minus';

import './style.less';

const Index = () => {
  const [resizeStatus, setResizeStatus] = useState(false);

  const handleMinimize = () => {
    ipcRenderer.send('controlMinimize');
  };

  const handleResize = () => {
    ipcRenderer.send('controlResize');
  };

  const handleShutdown = () => {
    ipcRenderer.send('controlShutdown');
  };

  useIpcRenderer.on('controlResizeStatus', (e, res) => {
    setResizeStatus(res);
  });

  return (
    <div className="title-bar">
      <div className="title-bar-main">
        <div className="title-bar-main-logo">
          <img src="logo.png" alt="logo" />
        </div>
        <div className="title-bar-main-gradient">
          <span className="title-bar-main-title">Vite Electron App</span>
          <span className="title-bar-main-subtitle">Ver. {packageJson.version}</span>
        </div>
      </div>
      <div className="title-bar-actions">
        <span
          className="title-bar-actions-button title-bar-actions-minimize"
          onClick={handleMinimize}
        >
          <Minus size={16} />
        </span>
        <span className="title-bar-actions-button title-bar-actions-resize" onClick={handleResize}>
          {!resizeStatus ? <Maximize size={16} /> : <Minimize size={16} />}
        </span>
        <span className="title-bar-actions-button title-bar-actions-close" onClick={handleShutdown}>
          <Close size={16} />
        </span>
      </div>
    </div>
  );
};

export default Index;
