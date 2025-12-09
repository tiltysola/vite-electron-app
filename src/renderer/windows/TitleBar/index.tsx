import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

import { Flex } from 'antd';

import Close from '@/components/Icon/Close';
import Maximize from '@/components/Icon/Maximize';
import Minimize from '@/components/Icon/Minimize';
import Minus from '@/components/Icon/Minus';
import Provider from '@/components/Provider';

import styles from './style.module.less';

const App = () => {
  const [resizeStatus, setResizeStatus] = useState(false);

  const searchParams = new URLSearchParams(window.location.search);
  const { disableMinimize, disableMaximize } = JSON.parse(searchParams.get('props') || '{}');

  const handleMinimize = () => {
    window.ipcRenderer.invoke('controlMinimize');
  };

  const handleResize = () => {
    window.ipcRenderer.invoke('controlResize');
  };

  const handleClose = () => {
    window.ipcRenderer.invoke('controlClose');
  };

  useEffect(() => {
    window.ipcRenderer.invoke('controlResizeStatus').then((res) => {
      setResizeStatus(res);
    });
  }, []);

  return (
    <Flex className={styles.titleBar} justify="end" align="center" gap={16}>
      <Flex className={styles.titleBarActions} justify="center" align="center" gap={16}>
        {!disableMinimize && (
          <span className={styles.titleBarButton} onClick={handleMinimize}>
            <Minus size={16} />
          </span>
        )}
        {!disableMaximize && (
          <span className={styles.titleBarButton} onClick={handleResize}>
            {!resizeStatus ? <Maximize size={16} /> : <Minimize size={16} />}
          </span>
        )}
        <span className={styles.titleBarButton} onClick={handleClose}>
          <Close size={16} />
        </span>
      </Flex>
    </Flex>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(
  <Provider>
    <App />
  </Provider>,
);
