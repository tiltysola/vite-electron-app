import { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { Plus } from 'lucide-react';

import { Button } from '@/shadcn/components/animate-ui/components/buttons/button';
import { useSidebar } from '@/shadcn/components/animate-ui/components/radix/sidebar';
import { Conversations } from '@ant-design/x';

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
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string>();

  const location = useLocation();

  const { open, setOpen } = useSidebar();

  const previousOpenStatus = useRef<boolean>(open);

  const handleChangeConversation = (data: string) => {
    setCurrentConversationId(data);
  };

  const handleAddConversation = () => {
    setConversations((_conversations) => [
      ..._conversations,
      {
        id: `conversation-${conversations.length + 1}`,
        title: `Conversation ${conversations.length + 1}`,
        createdAt: new Date(),
      },
    ]);
    setCurrentConversationId(`conversation-${conversations.length + 1}`);
  };

  useEffect(() => {
    setConversations([
      {
        id: 'conversation-1',
        title: 'Conversation 1',
        createdAt: new Date(),
      },
      {
        id: 'conversation-2',
        title: 'Conversation 2',
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
    <div className={styles.copilot}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <img src="./logo.png" />
          <span>Copilot Chat</span>
        </div>
        <div className={styles.sidebarActions}>
          <Button className={styles.addConversation} onClick={handleAddConversation}>
            <Plus />
            New Conversation
          </Button>
        </div>
        <Conversations
          className={styles.sidebarConversations}
          activeKey={currentConversationId}
          items={conversations.map((conversation) => ({
            key: conversation.id,
            label: conversation.title,
          }))}
          onActiveChange={handleChangeConversation}
        />
      </div>
      {location.pathname !== '/copilot' ? (
        <Outlet
          context={{
            currentConversationId,
            conversations,
            setCurrentConversationId,
            setConversations,
          }}
        />
      ) : (
        <div className={styles.empty}>Empty</div>
      )}
    </div>
  );
};

export default Index;
