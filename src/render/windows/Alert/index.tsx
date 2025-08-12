import { useEffect, useRef } from 'react';

import { Flex } from 'antd';
import classNames from 'classnames';

import styles from './style.module.less';

const Index = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  const searchParams = new URLSearchParams(window.location.search);

  const title = searchParams.get('title');
  const content = searchParams.get('content');

  useEffect(() => {
    const height = contentRef.current?.clientHeight || 0;
    ipcRenderer.invoke('funSetHeight', { height });
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
    </Flex>
  );
};

export default Index;
