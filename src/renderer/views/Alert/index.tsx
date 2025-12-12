import { useEffect, useRef, useState } from 'react';

import classNames from 'classnames';

import { Button } from '@/shadcn/components/animate-ui/components/buttons/button'
import { Input } from '@/shadcn/ui/input';

import styles from './style.module.less';

const searchParams = new URLSearchParams(window.location.search);
const { alertId, type, title, content, okText, cancelText } = JSON.parse(
  searchParams.get('props') || '{}',
);

const Index = () => {
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
    <div className={classNames(styles.alert)}>
      <div className={styles.alertContent}>
        <div className={styles.alertContentIcon}>
          <img src="./logo.png" alt="icon" />
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
                placeholder="Enter your input..."
              />
            </div>
          )}
        </div>
      </div>
      <div className={styles.alertButtons}>
        {(okText || type === 'input') && <Button size="sm" onClick={handleOk}>{okText || '确定'}</Button>}
        <Button variant="ghost" size="sm" onClick={handleCancel}>
          {cancelText || 'Close'}
        </Button>
      </div>
    </div>
  );
};

export default Index;
