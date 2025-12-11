import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { findBreadcrumbList,routes } from '@/router/config';
import { MenuOutlined } from '@ant-design/icons';
import { Button, Flex,IconButton, Separator } from '@radix-ui/themes';

import Close from '@/components/Icon/Close';
import Maximize from '@/components/Icon/Maximize';
import Minimize from '@/components/Icon/Minimize';
import Minus from '@/components/Icon/Minus';

import styles from './style.module.less';

const Index = () => {
  const [resizeStatus, setResizeStatus] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const { disableMinimize, disableMaximize } = location.search as any || {};

  const breadcrumbList = useMemo(() => {
    return findBreadcrumbList(routes, location.pathname) || [];
  }, [location.pathname]);

  const handleMinimize = () => {
    window.ipcRenderer.invoke('minimize');
  };

  const handleResize = () => {
    window.ipcRenderer.invoke('resize');
  };

  const handleClose = () => {
    window.ipcRenderer.invoke('close');
  };

  useEffect(() => {
    window.ipcRenderer.invoke('resizeStatus').then((res) => {
      setResizeStatus(res);
    });
  }, []);

  return (
    <Flex className={styles.titleBar} justify="between" align="center" gap="4">
      <Flex className={styles.barLeft} align="center" gap="4">
        <IconButton variant="ghost">
          <MenuOutlined size={16} />
        </IconButton>
        <Separator orientation="vertical" />
        <Flex align="center" gap="2">
          {breadcrumbList.map((item, index) => (
            <>
              <Button key={item.path} variant="ghost" size="1" onClick={() => navigate(item.path)}>{item.title}</Button>
              {index < breadcrumbList.length - 1 && <Separator orientation="vertical" style={{ transform: 'rotate(10deg)' }} />}
            </>
          ))}
        </Flex>
      </Flex>
      <Flex className={styles.barRight} align="center" gap="4">
        {!disableMinimize && (
          <span className={styles.controlButton} onClick={handleMinimize}>
            <Minus size={16} />
          </span>
        )}
        {!disableMaximize && (
          <span className={styles.controlButton} onClick={handleResize}>
            {!resizeStatus ? <Maximize size={16} /> : <Minimize size={16} />}
          </span>
        )}
        <span className={styles.controlButton} onClick={handleClose}>
          <Close size={16} />
        </span>
      </Flex>
    </Flex>
  );
};

export default Index;
