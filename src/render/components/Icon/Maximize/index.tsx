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
      className={styles.iconMaximize}
      style={{ width: size, height: size, ...style }}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon
        className={classNames(styles.maximizeTriangle, styles.top)}
        points="40,0 46,10 40,36 34,10"
        fill="#ffffff"
        transform="rotate(45 40 40)"
      />
      <polygon
        className={classNames(styles.maximizeTriangle, styles.bottom)}
        points="40,80 46,70 40,44 34,70"
        fill="#ffffff"
        transform="rotate(45 40 40)"
      />
      <rect x="21" y="21" width="12" height="12" rx="2" fill="#ffffff" opacity="0.1" />
      <rect x="47" y="47" width="12" height="12" rx="2" fill="#ffffff" opacity="0.1" />
    </svg>
  </span>
);

export default Index;
