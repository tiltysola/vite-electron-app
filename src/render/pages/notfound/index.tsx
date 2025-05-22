import { useLocation } from 'react-router-dom';

import Error from '@/components/Error';

import styles from './style.module.less';

const Index = () => {
  const location = useLocation();

  return (
    <div className={styles.notfound}>
      <Error data={{
        title: 'Sorry, something went wrong.',
        desc: [{
          text: 'The resource you request was not found on this app.',
          type: 'primary',
        }, {
          text: 'Error Code: 404',
        }, {
          text: `Location: ${location.pathname}`,
        }, {
          text: `Time: ${new Date().toString()}`,
        }, {
          text: <a href="/">Get Back!</a>,
        }],
        footer: 'Vite Electron App',
      }}
      />
    </div>
  );
};

export default Index;
