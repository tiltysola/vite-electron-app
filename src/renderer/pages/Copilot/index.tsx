import { useEffect, useMemo, useState } from 'react';

import { PlusOutlined, RobotOutlined, UserOutlined } from '@ant-design/icons';
import { Bubble, Conversations, Sender, Welcome } from '@ant-design/x';
import { Button, Flex } from '@radix-ui/themes';

import styles from './style.module.less';

interface Conversation {
  id: string;
  title: string;
  createdAt: Date;
}

interface Message {
  content: string;
  role: 'user' | 'assistant';
}

const Index = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');

  const currentConversation = useMemo(() => {
    return conversations.find((conversation) => conversation.id === currentConversationId);
  }, [conversations, currentConversationId]);

  const handleChangeConversation = (data: string) => {
    setCurrentConversationId(data);
  };

  const handleAddConversation = () => {
    setConversations((_conversations) => [
      ..._conversations,
      {
        id: `conversation-${conversations.length + 1}`,
        title: `对话${conversations.length + 1}`,
        createdAt: new Date(),
      },
    ]);
    setCurrentConversationId(`conversation-${conversations.length + 1}`);
  };

  const handleSubmit = () => {
    setMessages((_messages) => [
      ..._messages,
      {
        content: inputValue,
        role: 'user',
      },
    ]);
    window.ipcRenderer
      .invoke('funInvoke', {
        content: inputValue,
      })
      .then((data) => {
        setMessages((_messages) => [
          ..._messages,
          {
            content: data,
            role: 'assistant',
          },
        ]);
      });
    setInputValue('');
  };

  useEffect(() => {
    setMessages([]);
  }, [currentConversation]);

  useEffect(() => {
    setConversations([
      {
        id: 'conversation-1',
        title: '对话1',
        createdAt: new Date(),
      },
      {
        id: 'conversation-2',
        title: '对话2',
        createdAt: new Date(),
      },
    ]);
    setCurrentConversationId('conversation-1');
  }, []);

  return (
    <Flex className={styles.copilot}>
      <Flex className={styles.sidebar} direction="column" gap="4">
        <Flex
          className={styles.sidebarHeader}
          direction="column"
          justify="center"
          align="center"
          gap="4"
        >
          <img src="./logo.png" />
          <span>大模型对话</span>
        </Flex>
        <Flex className={styles.sidebarActions} justify="center" align="center">
          <Button onClick={handleAddConversation}>
            <PlusOutlined />
            新增对话
          </Button>
        </Flex>
        <Conversations
          className={styles.sidebarConversations}
          activeKey={currentConversationId}
          items={conversations.map((conversation) => ({
            key: conversation.id,
            label: conversation.title,
          }))}
          onActiveChange={handleChangeConversation}
        />
      </Flex>
      <Flex className={styles.content} direction="column" gap="4">
        <Flex className={styles.contentBubble} direction="column" gap="4">
          {messages.length === 0 && (
            <Welcome title={currentConversation?.title} description={currentConversation?.id} />
          )}
          {messages.map((message, index) => (
            <Bubble
              key={index}
              content={message.content}
              placement={message.role === 'user' ? 'start' : 'end'}
              avatar={message.role === 'user' ? <UserOutlined /> : <RobotOutlined />}
            />
          ))}
        </Flex>
        <Flex className={styles.contentInput} justify="center" align="center">
          <Sender
            value={inputValue}
            onChange={(v) => {
              setInputValue(v);
            }}
            onSubmit={handleSubmit}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Index;
