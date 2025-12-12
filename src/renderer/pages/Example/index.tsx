import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { User } from 'lucide-react';

import { useIpcRenderer } from '@/hooks';
import { Button } from '@/shadcn/components/animate-ui/components/buttons/button';
import { Bubble, Welcome } from '@ant-design/x';

import styles from './style.module.less';

interface MessageProps {
  content: string;
  role: 'user' | 'assistant';
}

const Index = () => {
  const [messageQueue, setMessageQueue] = useState<MessageProps[]>([]);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  useEffect(() => {
    const outgoingData: MessageProps = {
      content:
        'This is a message sent by ipcRenderer.send, will receive a message reply in 1 second.',
      role: 'user',
    };
    window.ipcRenderer.send('funSayHello', outgoingData);
    setMessageQueue((messages) => {
      return [...messages, outgoingData];
    });
    const outGoingDataInvoke: MessageProps = {
      content:
        'This is a message sent by ipcRenderer.invoke, will receive a message reply immediately.',
      role: 'user',
    };
    setMessageQueue((messages) => {
      return [...messages, outGoingDataInvoke];
    });
    window.ipcRenderer.invoke('funInvoke', outGoingDataInvoke).then((res) => {
      const incomingData: MessageProps = {
        content: `Received the return value of ipcRenderer.invoke: ${res}`,
        role: 'assistant',
      };
      setMessageQueue((messages) => {
        return [...messages, incomingData];
      });
    });
  }, []);

  useIpcRenderer.on(
    'funReplyHello',
    (_, data) => {
      setMessageQueue((messages) => {
        return [
          ...messages,
          {
            content: `Received the return value of ipcRenderer.send: ${data}`,
            role: 'assistant',
          },
        ];
      });
    },
    [],
  );

  return (
    <div className={styles.example}>
      <Welcome
        icon={<img src="./logo.png" />}
        title="Welcome to the IPC communication"
        description="You can send and receive messages by ipcRenderer.send and ipcRenderer.invoke"
      />
      <div className={styles.messageList}>
        {messageQueue.map((v, i) => (
          <Bubble
            key={i}
            placement={v.role === 'user' ? 'end' : 'start'}
            content={v.content}
            avatar={<User />}
          />
        ))}
      </div>
      <div className={styles.actions}>
        <Button onClick={handleBack}>Back to Home</Button>
      </div>
    </div>
  );
};

export default Index;
