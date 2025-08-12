import styles from './style.module.less';

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  size?: number;
}
const Index = ({ className, style, size = 16 }: IconProps) => (
  <span className={className} style={{ width: size, height: size + 2 }}>
    <svg
      className={styles.iconTerminal}
      style={{ width: size, height: size, ...style }}
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 外框轮廓 */}
      <path
        className={styles.terminalOutline}
        d="M128 128h768a85.333333 85.333333 0 0 1 85.333333 85.333333v597.333334a85.333333 85.333333 0 0 1-85.333333 85.333333H128a85.333333 85.333333 0 0 1-85.333333-85.333333V213.333333a85.333333 85.333333 0 0 1 85.333333-85.333333z"
        fill="none"
        stroke="#ffffff"
        strokeWidth="64"
      />
      {/* 终端符号 > */}
      <path
        className={styles.terminalSymbol}
        d="M230.4 418.133333l51.2-68.266666 216.192 162.133333L281.6 674.133333l-51.2-68.266666L355.541333 512z"
        fill="#ffffff"
      />
      {/* 下划线 */}
      <path
        className={styles.terminalUnderline}
        d="M512 682.666667v-85.333334h213.333333v85.333334h-213.333333z"
        fill="#ffffff"
      />
    </svg>
  </span>
);

export default Index;
