import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

import { Flex } from 'antd';
import classNames from 'classnames';

import Terminal from '@/components/Icon/Terminal';
import Provider from '@/components/Provider';

import styles from './style.module.less';

const App = () => {
  const [os, setOs] = useState('win32');

  const handleTerminal = () => {
    ipcRenderer.invoke('funOpenDevTools', 'view');
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

const root = createRoot(document.getElementById('root')!);
root.render(
  <Provider>
    <App />
  </Provider>,
);
