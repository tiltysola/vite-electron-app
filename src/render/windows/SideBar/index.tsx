import { useEffect, useState } from 'react';

import { Flex } from 'antd';
import classNames from 'classnames';

import Terminal from '@/components/Icon/Terminal';

import styles from './style.module.less';

const Index = () => {
  const [os, setOs] = useState('win32');

  const handleTerminal = () => {
    ipcRenderer.invoke('funOpenAlert', {
      title: '调试控制台',
      content: '您正在打开调试控制台，请稍后...',
    });
  };

  useEffect(() => {
    ipcRenderer.invoke('utilGetOs').then((res) => {
      setOs(res);
    });
  }, []);

  return (
    <Flex
      className={classNames(styles.sideBar, styles[os])}
      vertical
      justify="space-between"
      align="center"
    >
      <div className={styles.sideBarLogo}>
        <img src="logo.png" alt="logo" />
      </div>
      <div className={styles.sideBarActions}>
        <span className={styles.sideBarButton} onClick={handleTerminal}>
          <Terminal size={20} />
        </span>
      </div>
    </Flex>
  );
};

export default Index;
