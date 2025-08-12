import { useEffect, useState } from 'react';

import { Flex } from 'antd';
import classNames from 'classnames';

import styles from './style.module.less';

const Index = () => {
  const [os, setOs] = useState('win32');

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
        <span>{os}</span>
      </div>
    </Flex>
  );
};

export default Index;
