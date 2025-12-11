import { ReactNode } from 'react';

import styles from './style.module.less';

interface ErrorDataProp {
  data: {
    title: string;
    desc: Array<{
      text: string | ReactNode;
      type?: 'normal' | 'primary';
    }>;
    footer?: string;
  };
}

const Index = ({ data }: ErrorDataProp) => {
  return (
    <div className={styles.error}>
      <div className={styles.eHeader}>
        <img className={styles.eLogo} src="./logo.png" />
        <span className={styles.eInfo}>{data.title}</span>
      </div>
      <div className={styles.eMain}>
        {data.desc.map((v, i) => (
          <p
            className={
              styles[`eText${v.type ? v.type.charAt(0).toUpperCase() + v.type.slice(1) : 'Normal'}`]
            }
            key={i}
          >
            {v.text}
          </p>
        ))}
      </div>
      {data.footer && (
        <div className={styles.eFooter}>
          <p className={styles.eText}>{data.footer}</p>
        </div>
      )}
    </div>
  );
};

export default Index;
