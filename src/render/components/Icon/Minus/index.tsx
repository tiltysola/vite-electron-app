import classNames from 'classnames';

import styles from './style.module.less';

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  size?: number;
}

const Index = ({ className, style, size = 16 }: IconProps) => (
  <span className={className} style={{ width: size, height: size + 2 }}>
    <svg
      className={styles.iconMinus}
      style={{ width: size, height: size, ...style }}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon className={classNames(styles.minusTriangle, styles.top)} points="40,0 46,30 40,36 34,30" fill="#ffffff" />
      <polygon className={classNames(styles.minusTriangle, styles.bottom)} points="40,80 46,50 40,44 34,50" fill="#ffffff" />
      <rect x="34" y="16" width="12" height="12" rx="2" transform="rotate(45 40 22)" fill="#ffffff" opacity="0.1" />
      <rect x="34" y="52" width="12" height="12" rx="2" transform="rotate(45 40 58)" fill="#ffffff" opacity="0.1" />
    </svg>
  </span>
);

export default Index;
