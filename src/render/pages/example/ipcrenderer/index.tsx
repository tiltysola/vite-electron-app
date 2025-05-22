/* eslint-disable no-console */

import { useEffect, useState, useRef } from 'react';
import { useIpcRenderer } from '@/hooks';

import './style.less';

const Index = () => {
  const [messageQueue, setMessageQueue] = useState<string[]>([]);

  const messageQueueRef = useRef<string[]>([]);

  useEffect(() => {
    messageQueueRef.current = messageQueue;
  }, [messageQueue]);

  useEffect(() => {
    ipcRenderer.send('say_hello', {
      msg: 'this is a request method!',
    });
    setMessageQueue(['MSG_SEND: this is a request method!']);
    ipcRenderer.invoke('invoke').then((res) => {
      console.log(res);
      messageQueueRef.current.push(`MSG_INVOKE: ${res}`);
      setMessageQueue([...messageQueueRef.current]);
    });
  }, []);

  useIpcRenderer.on('reply_hello', (e, ...args) => {
    console.log(e, ...args);
    messageQueueRef.current.push(`MSG_RECEIVED: ${[JSON.stringify(e), ...args].join(', ')}`);
    setMessageQueue([...messageQueueRef.current]);
  }, []);

  return (
    <div className="example-invoke">
      <h1 className="title">Hello, react!</h1>
      {messageQueue.map((v) => (
        <p>{v}</p>
      ))}
      <p>
        <a href="/">Back</a>
      </p>
    </div>
  );
};

export default Index;
