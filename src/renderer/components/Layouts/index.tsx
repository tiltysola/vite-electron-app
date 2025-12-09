import { Outlet } from 'react-router-dom';

import styles from './style.module.less';

const Index = () => {
  return (
    <div className={styles.wrapper}>
      <Outlet />
    </div>
  );
};

export default Index;
