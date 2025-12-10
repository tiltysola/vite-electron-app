import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

import { Flex } from 'antd';
import classNames from 'classnames';

import { useIpcRenderer } from '@/hooks';
import { HomeOutlined } from '@ant-design/icons';

import Copilot from '@/components/Icon/Copilot';
import Terminal from '@/components/Icon/Terminal';
import Provider from '@/components/Provider';

import styles from './style.module.less';

const menuList = [
  {
    path: '/welcome',
    icon: <HomeOutlined style={{ fontSize: 20 }} />,
    label: 'Home',
  },
  {
    path: '/copilot',
    icon: <Copilot size={20} />,
    label: 'Copilot',
  },
];

const App = () => {
  const [path, setPath] = useState('/');
  const [os, setOs] = useState('win32');

  const handleTerminal = () => {
    window.ipcRenderer.invoke('funOpenDevTools', 'view');
  };

  useEffect(() => {
    window.ipcRenderer.invoke('getRouter').then((res) => {
      setPath(res);
    });
    window.ipcRenderer.invoke('getOs').then((res) => {
      setOs(res);
    });
  }, []);

  useIpcRenderer.on('setRouter', (_, data) => {
    setPath(data);
  });

  return (
    <Flex
      className={classNames(styles.sideBar, styles[os])}
      vertical
      justify="space-between"
      align="center"
    >
      <div className={styles.sideBarLogo}>
        <img src="/assets/logo.png" alt="logo" />
      </div>
      <Flex className={styles.sideBarMenu} vertical justify="center" align="center" gap={8}>
        {menuList.map((item) => (
          <span
            key={item.path}
            className={classNames(styles.sideBarButton, {
              [styles.active]: path === item.path,
            })}
            onClick={() => {
              window.ipcRenderer.invoke('routerSetPath', item.path);
            }}
          >
            {item.icon}
          </span>
        ))}
      </Flex>
      <div className={styles.sideBarActions}>
        <span className={styles.sideBarButton} onClick={handleTerminal}>
          <Terminal size={20} />
        </span>
      </div>
    </Flex>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(
  <Provider>
    <App />
  </Provider>,
);
