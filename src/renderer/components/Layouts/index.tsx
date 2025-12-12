import { Outlet } from 'react-router-dom';

import {
  SidebarInset,
  SidebarProvider,
} from '@/shadcn/components/animate-ui/components/radix/sidebar';
import { Flex } from '@radix-ui/themes';

import Boundary from '../Boundary';
import SideBar from '../SideBar';
import TitleBar from '../TitleBar';
import styles from './style.module.less';

const Index = () => {
  return (
    <Flex className={styles.wrapper}>
      <SidebarProvider>
        <SideBar />
        <SidebarInset className={styles.wrapperContent}>
          <TitleBar />
          <Boundary>
            <Outlet />
          </Boundary>
        </SidebarInset>
      </SidebarProvider>
    </Flex>
  );
};

export default Index;
