import { Outlet } from 'react-router-dom';

import { Flex } from '@radix-ui/themes';

import SideBar from '../SideBar';
import TitleBar from '../TitleBar';
import styles from './style.module.less';

const Index = () => {
  return (
    <Flex className={styles.wrapper}>
      <SideBar />
      <Flex className={styles.wrapperContent} direction="column" width="100%">
        <TitleBar />
        <Flex height="100%">
          <Outlet />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Index;
