import { Flex } from '@radix-ui/themes';

import styles from './style.module.less';

const Index = () => {
  return (
    <Flex className={styles.initialize} direction="column" align="center" justify="center">
      <div>Initialize</div>
    </Flex>
  );
};

export default Index;
