import { Fragment, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { findBreadcrumbList, routes } from '@/router/config';
import { SidebarTrigger } from '@/shadcn/components/animate-ui/components/radix/sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/shadcn/ui/breadcrumb';
import { Flex } from '@radix-ui/themes';

import Close from '@/components/Icon/Close';
import Maximize from '@/components/Icon/Maximize';
import Minimize from '@/components/Icon/Minimize';
import Minus from '@/components/Icon/Minus';

import styles from './style.module.less';

const Index = () => {
  const [resizeStatus, setResizeStatus] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const { disableMinimize, disableMaximize } = (location.search as any) || {};

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
        <SidebarTrigger />
        <Flex align="center" gap="2">
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbList.map((item, index) => {
                const pathKey = breadcrumbList
                  .slice(0, index + 1)
                  .map((breadcrumb) => {
                    const pathParts = breadcrumb.path.split('/').filter(Boolean);
                    return pathParts.length > 0 ? pathParts[pathParts.length - 1] : 'root';
                  })
                  .join('-');
                return (
                  <Fragment key={pathKey}>
                    <BreadcrumbItem>
                      {index < breadcrumbList.length - 1 ? (
                        <BreadcrumbLink
                          className={styles.breadcrumbLink}
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(item.path);
                          }}
                        >
                          {item.title}
                        </BreadcrumbLink>
                      ) : (
                        <BreadcrumbPage>{item.title}</BreadcrumbPage>
                      )}
                    </BreadcrumbItem>
                    {index < breadcrumbList.length - 1 && <BreadcrumbSeparator />}
                  </Fragment>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
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
