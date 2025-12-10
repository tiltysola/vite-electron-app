import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Flex, Splitter, Tag } from 'antd';

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

  const FreeComp = () => {
    return (
      <div className={styles.freeComp}>
        <div className={styles.logo}>
          <img src="/assets/logo.png" />
        </div>
        <div className={styles.title}>
          <span>Vite Electron App</span>
        </div>
        <div className={styles.content}>
          <span>Powered by Vite & Electron</span>
        </div>
      </div>
    );
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
    <div className={styles.welcome}>
      <Splitter className={styles.splitter}>
        <Splitter.Panel min={8}>
          <Flex className={styles.splitterLeft} justify="center" align="center">
            <FreeComp />
          </Flex>
        </Splitter.Panel>
        <Splitter.Panel min={8}>
          <Flex className={styles.splitterRight} justify="center" align="center">
            <FreeComp />
          </Flex>
        </Splitter.Panel>
      </Splitter>
      <Flex className={styles.actions} justify="center" align="center" gap={16}>
        <Button type="default" onClick={handleIpcExample}>
          IPC通讯示例
        </Button>
        <Button type="default" onClick={handleCopilot}>
          大模型对话
        </Button>
        <Button type="default" onClick={handleOpenAlert}>
          打开弹窗提示
        </Button>
      </Flex>
      <div className={styles.cursor}>
        <Tag color="black" bordered={false}>
          [{cursorPosition.x}, {cursorPosition.y}]
        </Tag>
      </div>
    </div>
  );
};

export default Index;
