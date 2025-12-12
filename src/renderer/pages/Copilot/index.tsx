import { useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Plus } from 'lucide-react';

import { Button } from '@/shadcn/components/animate-ui/components/buttons/button'
import { useSidebar } from '@/shadcn/components/animate-ui/components/radix/sidebar';
import { Conversations } from '@ant-design/x';
import { Flex } from '@radix-ui/themes';

import styles from './style.module.less';

interface Conversation {
  id: string;
  title: string;
  createdAt: Date;
}

export interface OutletContext {
  currentConversationId?: string;
  conversations: Conversation[];
  setCurrentConversationId: (id: string) => void;
  setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
}

const Index = () => {
  const { open, setOpen } = useSidebar();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string>();

  const previousOpenStatus = useRef<boolean>(open);

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

  useEffect(() => {
    setOpen(false);
    return () => {
      previousOpenStatus.current && setOpen(previousOpenStatus.current);
    };
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
          <Button className={styles.addConversation} onClick={handleAddConversation}>
            <Plus />
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
      <Outlet
        context={{
          currentConversationId,
          conversations,
          setCurrentConversationId,
          setConversations,
        }}
      />
    </Flex>
  );
};

export default Index;
