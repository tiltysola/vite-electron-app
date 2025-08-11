import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Splitter, Tag } from 'antd';

import styles from './style.module.less';

const Index = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const navigate = useNavigate();

  const handleIpcExample = () => {
    navigate('/example');
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
          <div className={styles.splitterLeft}>
            <FreeComp />
          </div>
        </Splitter.Panel>
        <Splitter.Panel min={8}>
          <div className={styles.splitterRight}>
            <FreeComp />
          </div>
        </Splitter.Panel>
      </Splitter>
      <div className={styles.actions}>
        <Button type="default" onClick={handleIpcExample}>
          IPC通讯示例
        </Button>
        <Tag>
          当前指针坐标 [{cursorPosition.x}, {cursorPosition.y}]
        </Tag>
      </div>
    </div>
  );
};

export default Index;
