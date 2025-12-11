import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Code,Flex } from '@radix-ui/themes';

import styles from './style.module.less';

const Index = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

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
        title: '提示',
        content: '这是一个弹窗提示。',
        okText: '确认',
        cancelText: '取消',
      })
      .then((res) => {
        if (res) {
          window.electronAlert.open({
            title: '提示',
            content: '你点击了确认',
          });
        } else {
          window.electronAlert.open({
            title: '提示',
            content: '你点击了取消或者关闭按钮',
          });
        }
      });
  };

  useEffect(() => {
    const requestAnimation = () => {
      window.ipcRenderer.invoke('funCursorPosition').then((res) => {
        setCursorPosition(res);
        requestAnimation();
      });
    };
    const animationFrame = requestAnimationFrame(requestAnimation);
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

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
        <Button onClick={handleIpcExample}>
          IPC通讯示例
        </Button>
        <Button  onClick={handleCopilot}>
          大模型对话
        </Button>
        <Button onClick={handleOpenAlert}>
          打开弹窗提示
        </Button>
      </Flex>
      <div className={styles.cursor}>
        <Code color="gray">
          [{cursorPosition.x}, {cursorPosition.y}]
        </Code>
      </div>
    </Flex>
  );
};

export default Index;
