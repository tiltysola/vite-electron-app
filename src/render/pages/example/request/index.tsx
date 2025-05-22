import { useEffect, useState } from 'react';

import ajax from '@/scripts/ajax';

import styles from './style.module.less';

const Index = () => {
  const [data, setData] = useState('');

  useEffect(() => {
    ajax({
      url: '/test/testFunc',
      data: {
        test: 'helloElectron',
      },
    }).then((res) => {
      setData(JSON.stringify(res));
    }).catch((err) => {
      setData(JSON.stringify(err));
    });
  }, []);

  return (
    <div className={styles.exampleRequest}>
      <h1 className={styles.title}>Hello, react!</h1>
      <code>
        {data}
      </code>
      <p>
        <a href="/">Back</a>
      </p>
    </div>
  );
};

export default Index;
