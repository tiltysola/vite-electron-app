import { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';

import { Button, Flex, Input } from 'antd';
import classNames from 'classnames';

import Provider from '@/components/Provider';

import styles from './style.module.less';

const searchParams = new URLSearchParams(window.location.search);
const { alertId, type, title, content, okText, cancelText } = JSON.parse(
  searchParams.get('props') || '{}',
);

const App = () => {
  const [inputValue, setInputValue] = useState<string>('');

  const contentRef = useRef<HTMLDivElement>(null);

  const emitEvent = (event: string, args: any = {}) => {
    window.ipcRenderer.send('alertEvents', {
      alertId,
      event,
      ...args,
    });
  };

  const handleOk = () => {
    if (type === 'input') {
      emitEvent('confirm', { data: inputValue });
    } else {
      emitEvent('confirm', { data: true });
    }
  };

  const handleCancel = () => {
    emitEvent('close');
  };

  useEffect(() => {
    const height = (contentRef.current?.clientHeight || 0) + 80;
    emitEvent('show', { height });
  }, []);

  return (
    <Flex
      className={classNames(styles.alert)}
      vertical
      justify="space-between"
      align="center"
      gap={12}
    >
      <Flex className={styles.alertContent} gap={12}>
        <div className={styles.alertContentIcon}>
          <img src="/assets/logo.png" alt="icon" />
        </div>
        <div className={styles.alertContentContainer} ref={contentRef}>
          {title && (
            <div className={styles.alertContentTitle}>
              <span>{title}</span>
            </div>
          )}
          {content && (
            <div className={styles.alertContentText}>
              <span>{content}</span>
            </div>
          )}
          {type === 'input' && (
            <div className={styles.alertContentInput}>
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="请输入..."
              />
            </div>
          )}
        </div>
      </Flex>
      <Flex className={styles.alertButtons} justify="end" align="center" gap={12}>
        {(okText || type === 'input') && (
          <Button type="primary" onClick={handleOk}>
            {okText || '确定'}
          </Button>
        )}
        <Button type="default" onClick={handleCancel}>
          {cancelText || '关闭'}
        </Button>
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
