import { useNavigate } from 'react-router-dom';

import { Button } from '@/shadcn/components/animate-ui/components/buttons/button'
import { Flex } from '@radix-ui/themes';

import styles from './style.module.less';

const Index = () => {
  const navigate = useNavigate();

  const handleIpcExample = () => {
    navigate('/example');
  };

  const handleCopilot = () => {
    navigate('/copilot');
  };

  const handleOpenAlert = () => {
    window.electronAlert
      .open({
        title: 'Alert',
        content: 'This is an Electron Alert modal.',
        okText: 'OK',
        cancelText: 'Cancel',
      })
      .then((res) => {
        if (res) {
          window.electronAlert.open({
            title: 'Alert',
            content: 'You clicked the OK button.',
          });
        } else {
          window.electronAlert.open({
            title: 'Alert',
            content: 'You clicked the Cancel or Close button.',
          });
        }
      });
  };

  const handleOpenInputAlert = () => {
    window.electronAlert.open({
      type: 'input',
      title: 'Alert',
      content: 'This is an Electron Alert input modal.',
      okText: 'OK',
      cancelText: 'Cancel',
    });
  };

  return (
    <Flex className={styles.welcome} direction="column" align="center" justify="center" gap="4">
      <Flex justify="center" align="center">
        <div className={styles.freeComp}>
          <div className={styles.logo}>
            <img src="./logo.png" />
          </div>
          <div className={styles.title}>
            <span>Vite Electron App</span>
          </div>
          <div className={styles.content}>
            <span>Powered by Vite & Electron</span>
          </div>
        </div>
      </Flex>
      <Flex justify="center" align="center" gap="4">
        <Button onClick={handleIpcExample}>IPC Example</Button>
        <Button onClick={handleCopilot}>Copilot</Button>
        <Button onClick={handleOpenAlert}>Open Alert</Button>
        <Button onClick={handleOpenInputAlert}>Open Input Alert</Button>
      </Flex>
    </Flex>
  );
};

export default Index;
