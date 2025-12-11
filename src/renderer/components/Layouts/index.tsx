import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import classNames from 'classnames';

import { Flex } from '@radix-ui/themes';

import Boundary from '../Boundary';
import SideBar from '../SideBar';
import TitleBar from '../TitleBar';
import styles from './style.module.less';

const Index = () => {
  const [os, setOs] = useState('win32');

  useEffect(() => {
    window.ipcRenderer.invoke('getOs').then((res) => {
      setOs(res);
    });
  }, []);

  return (
    <Flex className={classNames(styles.wrapper, styles[os])}>
      <SideBar />
      <Flex className={styles.wrapperContent} direction="column" width="100%">
        <TitleBar />
        <Boundary>
          <Outlet />
        </Boundary>
      </Flex>
    </Flex>
  );
};

export default Index;
