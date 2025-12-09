import classNames from 'classnames';

import styles from './style.module.less';

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  size?: number;
}

const Index = ({ className, style, size = 16 }: IconProps) => (
  <span
    className={classNames(styles.iconCopilot, className)}
    style={{ width: size, height: size + 2 }}
  >
    <svg
      style={{ width: size, height: size, ...style }}
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1006.344828 17.655172v988.689656H17.655172V17.655172M918.068966 105.931034H104.871724v812.137932H918.068966V105.931034z"
        fill="#ffffff"
      />
      <path
        className={styles.iconCopilotLine}
        d="M706.59531 317.793103l-288.061793 388.413794H317.722483l284.954483-388.413794z"
        fill="#ffffff"
      />
    </svg>
  </span>
);

export default Index;
