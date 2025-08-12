import { useState } from 'react';

import { Flex } from 'antd';

import { useIpcRenderer } from '@/hooks';

import Close from '@/components/Icon/Close';
import Maximize from '@/components/Icon/Maximize';
import Minimize from '@/components/Icon/Minimize';
import Minus from '@/components/Icon/Minus';

import styles from './style.module.less';

const Index = () => {
  const [resizeStatus, setResizeStatus] = useState(false);

  const handleMinimize = () => {
    ipcRenderer.send('controlMinimize');
  };

  const handleResize = () => {
    ipcRenderer.send('controlResize');
  };

  const handleClose = () => {
    ipcRenderer.send('controlClose');
  };

  useIpcRenderer.on('controlResizeStatus', (e, res) => {
    setResizeStatus(res);
  });

  return (
    <Flex className={styles.titleBar} justify="end" align="center" gap={16}>
      <Flex className={styles.titleBarActions} justify="center" align="center" gap={16}>
        <span className={styles.titleBarButton} onClick={handleMinimize}>
          <Minus size={16} />
        </span>
        <span className={styles.titleBarButton} onClick={handleResize}>
          {!resizeStatus ? <Maximize size={16} /> : <Minimize size={16} />}
        </span>
        <span className={styles.titleBarButton} onClick={handleClose}>
          <Close size={16} />
        </span>
      </Flex>
    </Flex>
  );
};

export default Index;
