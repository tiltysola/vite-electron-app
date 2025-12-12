import { useEffect, useMemo, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

import { Bot, User } from 'lucide-react';

import { Bubble, Sender, Welcome } from '@ant-design/x';

import type { OutletContext } from '..';
import styles from './style.module.less';

interface Message {
  content: string;
  role: 'user' | 'assistant';
}

const Index = () => {
  const { currentConversationId, conversations, setCurrentConversationId, setConversations } =
    useOutletContext<OutletContext>();

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');

  const currentConversation = useMemo(() => {
    return conversations.find((conversation) => conversation.id === currentConversationId);
  }, [conversations, currentConversationId]);

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
    <div className={styles.content}>
      <div className={styles.contentBubble}>
        {messages.length === 0 && (
          <Welcome title={currentConversation?.title} description={currentConversation?.id} />
        )}
        {messages.map((message, index) => (
          <Bubble
            key={index}
            content={message.content}
            placement={message.role === 'user' ? 'start' : 'end'}
            avatar={message.role === 'user' ? <User /> : <Bot />}
          />
        ))}
      </div>
      <div className={styles.contentInput}>
        <Sender
          value={inputValue}
          onChange={(v) => {
            setInputValue(v);
          }}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Index;
