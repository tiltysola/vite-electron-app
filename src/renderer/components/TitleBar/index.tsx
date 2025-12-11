import { useEffect, useState } from 'react';

import { MenuOutlined } from '@ant-design/icons';
import { Flex,IconButton, Separator } from '@radix-ui/themes';

import Close from '@/components/Icon/Close';
import Maximize from '@/components/Icon/Maximize';
import Minimize from '@/components/Icon/Minimize';
import Minus from '@/components/Icon/Minus';

import styles from './style.module.less';

const Index = () => {
  const [resizeStatus, setResizeStatus] = useState(false);

  const searchParams = new URLSearchParams(window.location.search);
  const { disableMinimize, disableMaximize } = JSON.parse(searchParams.get('props') || '{}');

  const handleMinimize = () => {
    window.ipcRenderer.invoke('minimize');
  };

  const handleResize = () => {
    window.ipcRenderer.invoke('resize');
  };

  const handleClose = () => {
    window.ipcRenderer.invoke('close');
  };

  useEffect(() => {
    window.ipcRenderer.invoke('resizeStatus').then((res) => {
      setResizeStatus(res);
    });
  }, []);

  return (
    <Flex className={styles.titleBar} justify="between" align="center" gap="16px">
      <Flex className={styles.barLeft} align="center" gap="4">
        <IconButton className={styles.menuButton} variant="ghost">
          <MenuOutlined size={16} />
        </IconButton>
        <Separator orientation="vertical" />
        <span>Dashboard</span>
      </Flex>
      <Flex className={styles.barRight} align="center" gap="16px">
        {!disableMinimize && (
          <span className={styles.controlButton} onClick={handleMinimize}>
            <Minus size={16} />
          </span>
        )}
        {!disableMaximize && (
          <span className={styles.controlButton} onClick={handleResize}>
            {!resizeStatus ? <Maximize size={16} /> : <Minimize size={16} />}
          </span>
        )}
        <span className={styles.controlButton} onClick={handleClose}>
          <Close size={16} />
        </span>
      </Flex>
    </Flex>
  );
};

export default Index;
