import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Flex } from 'antd';

import { useIpcRenderer } from '@/hooks';
import { UserOutlined } from '@ant-design/icons';
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
      content: '这是一条通过 ipcRenderer.send 方式发送的消息，将会在1秒后收到消息回复。',
      role: 'user',
    };
    window.ipcRenderer.send('funSayHello', outgoingData);
    setMessageQueue((messages) => {
      return [...messages, outgoingData];
    });
    const outGoingDataInvoke: MessageProps = {
      content: '这是一条通过 ipcRenderer.invoke 方式发送的消息，将会立刻收到消息回复。',
      role: 'user',
    };
    setMessageQueue((messages) => {
      return [...messages, outGoingDataInvoke];
    });
    window.ipcRenderer.invoke('funInvoke', outGoingDataInvoke).then((res) => {
      const incomingData: MessageProps = {
        content: `收到 ipcRenderer.invoke 的返回值: ${res}`,
        role: 'assistant',
      };
      setMessageQueue((messages) => {
        return [...messages, incomingData];
      });
    });
  }, []);

  useIpcRenderer.on(
    'funReplyHello',
    (e, data) => {
      setMessageQueue((messages) => {
        return [
          ...messages,
          {
            content: `收到 ipcRenderer.send 的返回值: ${data}`,
            role: 'assistant',
          },
        ];
      });
    },
    [],
  );

  return (
    <div className={styles.example}>
      <Flex vertical gap={16}>
        <Welcome
          icon={<img src="logo.png" />}
          title="欢迎来到IPC通讯环节"
          description="您可以通过ipcRenderer.send和ipcRenderer.invoke来发送和接收消息"
        />
        <Flex vertical gap={16}>
          {messageQueue.map((v, i) => (
            <Bubble
              key={i}
              placement={v.role === 'user' ? 'end' : 'start'}
              content={v.content}
              avatar={{ icon: <UserOutlined /> }}
            />
          ))}
        </Flex>
        <Flex justify="end">
          <Button type="default" onClick={handleBack}>
            返回首页
          </Button>
        </Flex>
      </Flex>
    </div>
  );
};

export default Index;
