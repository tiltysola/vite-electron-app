/* eslint-disable no-console */

import { useEffect, useRef, useState } from 'react';

import { useIpcRenderer } from '@/hooks';

import styles from './style.module.less';

const Index = () => {
  const [messageQueue, setMessageQueue] = useState<string[]>([]);

  const messageQueueRef = useRef<string[]>([]);

  useEffect(() => {
    messageQueueRef.current = messageQueue;
  }, [messageQueue]);

  useEffect(() => {
    window.ipcRenderer.send('funSayHello', {
      msg: 'this is a request method!',
    });
    setMessageQueue(['MSG_SEND: this is a request method!']);
    window.ipcRenderer.invoke('invoke').then((res) => {
      console.log(res);
      messageQueueRef.current.push(`MSG_INVOKE: ${res}`);
      setMessageQueue([...messageQueueRef.current]);
    });
  }, []);

  useIpcRenderer.on('funReplyHello', (e, ...args) => {
    console.log(e, ...args);
    messageQueueRef.current.push(`MSG_RECEIVED: ${[JSON.stringify(e), ...args].join(', ')}`);
    setMessageQueue([...messageQueueRef.current]);
  }, []);

  return (
    <div className={styles.exampleInvoke}>
      <h1 className={styles.title}>Hello, react!</h1>
      {messageQueue.map((v, i) => (
        <p key={i}>{v}</p>
      ))}
      <p>
        <a href="/">Back</a>
      </p>
    </div>
  );
};

export default Index;
