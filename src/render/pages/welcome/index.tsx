import { Link } from 'react-router-dom';

import styles from './style.module.less';

const Index = () => {
  return (
    <div className={styles.welcome}>
      <div className={styles.wHeader}>
        <img className={styles.wLogo} src="logo.png" />
        <span className={styles.wInfo}>Hello, react!</span>
      </div>
      <div className={styles.wMain}>
        <p className={styles.wTextPrimary}>This page is powered by vite, electron and react!</p>
        <p className={styles.wTextNormal}>typescript and esbuild are also used for development!</p>
        <p className={styles.wTextNormal}>Time: {new Date().toString()}</p>
        <p>
          <Link to="/example">ipcRenderer example</Link>
        </p>
      </div>
      <div className={styles.wFooter}>
        <p className={styles.wText}>Vite Electron App</p>
      </div>
    </div>
  );
};

export default Index;
