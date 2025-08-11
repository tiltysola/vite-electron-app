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
      className={styles.iconClose}
      style={{ width: size, height: size, ...style }}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 四个白色三角形 */}
      <polygon
        className={classNames(styles.closeTriangle, styles.top)}
        points="40,0 46,30 40,36 34,30"
        fill="#ffffff"
        transform="rotate(45 40 40)"
      />
      <polygon
        className={classNames(styles.closeTriangle, styles.bottom)}
        points="40,80 46,50 40,44 34,50"
        fill="#ffffff"
        transform="rotate(45 40 40)"
      />
      <polygon
        className={classNames(styles.closeTriangle, styles.left)}
        points="0,40 30,34 36,40 30,46"
        fill="#ffffff"
        transform="rotate(45 40 40)"
      />
      <polygon
        className={classNames(styles.closeTriangle, styles.right)}
        points="80,40 50,34 44,40 50,46"
        fill="#ffffff"
        transform="rotate(45 40 40)"
      />
      {/* 四个灰色小菱形 */}
      <rect
        x="34"
        y="8"
        width="12"
        height="12"
        rx="2"
        transform="rotate(45 40 14)"
        fill="#ffffff"
        opacity="0.1"
      />
      <rect
        x="60"
        y="34"
        width="12"
        height="12"
        rx="2"
        transform="rotate(45 66 40)"
        fill="#ffffff"
        opacity="0.1"
      />
      <rect
        x="8"
        y="34"
        width="12"
        height="12"
        rx="2"
        transform="rotate(45 14 40)"
        fill="#ffffff"
        opacity="0.1"
      />
      <rect
        x="34"
        y="60"
        width="12"
        height="12"
        rx="2"
        transform="rotate(45 40 66)"
        fill="#ffffff"
        opacity="0.1"
      />
    </svg>
  </span>
);

export default Index;
