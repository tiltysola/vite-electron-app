import { useState } from 'react';

import { Flex } from 'antd';
import classNames from 'classnames';
import packageJson from 'package.json';

import { useIpcRenderer } from '@/hooks';

import Close from '../Icon/Close';
import Maximize from '../Icon/Maximize';
import Minimize from '../Icon/Minimize';
import Minus from '../Icon/Minus';
import styles from './style.module.less';

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
    <Flex className={styles.titleBar} justify="space-between" align="center">
      <Flex className={styles.titleBarMain} justify="center" align="center" gap={8}>
        <div className={styles.titleBarMainLogo}>
          <img src="logo.png" alt="logo" />
        </div>
        <div className={styles.titleBarMainGradient}>
          <span className={styles.titleBarMainTitle}>Vite Electron App</span>
          <span className={styles.titleBarMainSubtitle}>Ver. {packageJson.version}</span>
        </div>
      </Flex>
      <Flex className={styles.titleBarActions} justify="center" align="center" gap={16}>
        <span
          className={classNames(styles.titleBarActionsButton, styles.titleBarActionsMinimize)}
          onClick={handleMinimize}
        >
          <Minus size={16} />
        </span>
        <span
          className={classNames(styles.titleBarActionsButton, styles.titleBarActionsResize)}
          onClick={handleResize}
        >
          {!resizeStatus ? <Maximize size={16} /> : <Minimize size={16} />}
        </span>
        <span
          className={classNames(styles.titleBarActionsButton, styles.titleBarActionsClose)}
          onClick={handleShutdown}
        >
          <Close size={16} />
        </span>
      </Flex>
    </Flex>
  );
};

export default Index;
