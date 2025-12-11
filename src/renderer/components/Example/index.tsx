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
      <div className={styles.header}>
        <img className={styles.logo} src="./logo.png" />
        <span className={styles.info}>{data.title}</span>
      </div>
      <div className={styles.main}>
        {data.desc.map((v, i) => (
          <p
            className={
              styles[`text${v.type ? v.type.charAt(0).toUpperCase() + v.type.slice(1) : 'Normal'}`]
            }
            key={i}
          >
            {v.text}
          </p>
        ))}
      </div>
      {data.footer && (
        <div className={styles.footer}>
          <p className={styles.text}>{data.footer}</p>
        </div>
      )}
    </div>
  );
};

export default Index;
