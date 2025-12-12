import { Outlet } from 'react-router-dom';

import {
  SidebarInset,
  SidebarProvider,
} from '@/shadcn/components/animate-ui/components/radix/sidebar';

import Boundary from '../Boundary';
import SideBar from '../SideBar';
import TitleBar from '../TitleBar';
import styles from './style.module.less';

const Index = () => {
  return (
    <div className={styles.wrapper}>
      <SidebarProvider>
        <SideBar />
        <SidebarInset className={styles.wrapperContent}>
          <TitleBar />
          <Boundary>
            <Outlet />
          </Boundary>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default Index;
