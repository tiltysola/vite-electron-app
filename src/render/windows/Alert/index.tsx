import { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

import { Button, Flex } from 'antd';
import classNames from 'classnames';

import Provider from '@/components/Provider';

import styles from './style.module.less';

const App = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  const searchParams = new URLSearchParams(window.location.search);
  const { alertId, title, content, okText, cancelText } = JSON.parse(
    searchParams.get('props') || '{}',
  );

  const handleOk = () => {
    ipcRenderer.send(`alertResult-${alertId}`, true);
  };

  const handleCancel = () => {
    ipcRenderer.send(`alertResult-${alertId}`, false);
  };

  useEffect(() => {
    const height = contentRef.current?.clientHeight || 0;
    ipcRenderer.invoke('alertSetHeight', { height });
  }, [content]);

  return (
    <Flex className={classNames(styles.alert)} vertical justify="space-between" align="center">
      <Flex className={classNames(styles.alertTitle)} align="center">
        <span className={styles.alertTitleText}>{title}</span>
      </Flex>
      <div className={styles.alertContent}>
        <span ref={contentRef} className={styles.alertContentText}>
          {content}
        </span>
      </div>
      <Flex className={styles.alertButtons} justify="center" align="center" gap={12}>
        {okText && (
          <Button type="primary" onClick={handleOk}>
            {okText}
          </Button>
        )}
        {cancelText && (
          <Button type="default" onClick={handleCancel}>
            {cancelText}
          </Button>
        )}
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
