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

  const handleDevTools = (type: 'title' | 'view') => {
    ipcRenderer.invoke('funOpenDevTools', type);
  };

  const FreeComp = () => {
    return (
      <div className={styles.freeComp}>
        <div className={styles.logo}>
          <img src="logo.png" />
        </div>
        <div className={styles.title}>
          <span>基于Electron构建的客户端</span>
        </div>
        <div className={styles.content}>
          <span>欢迎体验由Electron技术驱动的客户端</span>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const requestAnimation = () => {
      ipcRenderer.invoke('funCursorPosition').then((res) => {
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
        <Button type="default" onClick={() => handleDevTools('title')}>
          打开调试控制台（标题）
        </Button>
        <Button type="default" onClick={() => handleDevTools('view')}>
          打开调试控制台（主窗口）
        </Button>
      </Flex>
      <div className={styles.cursor}>
        <Tag>
          当前指针坐标 [{cursorPosition.x}, {cursorPosition.y}]
        </Tag>
      </div>
    </div>
  );
};

export default Index;
