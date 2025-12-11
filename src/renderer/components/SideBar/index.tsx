import { useLocation, useNavigate } from 'react-router-dom';

import classNames from 'classnames';

import { HomeOutlined } from '@ant-design/icons';
import { Flex } from '@radix-ui/themes';

import Copilot from '@/components/Icon/Copilot';
import Terminal from '@/components/Icon/Terminal';

import styles from './style.module.less';

const menuList = [
  {
    path: '/welcome',
    icon: <HomeOutlined style={{ fontSize: 20 }} />,
    label: 'Home',
  },
  {
    path: '/copilot',
    icon: <Copilot size={20} />,
    label: 'Copilot',
  },
];

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleTerminal = () => {
    window.ipcRenderer.invoke('funOpenDevTools', 'view');
  };

  return (
    <Flex
      className={styles.sideBar}
      direction="column"
      justify="between"
      align="center"
    >
      <div className={styles.logo}>
        <img src="./logo.png" alt="logo" />
      </div>
      <Flex className={styles.barMenu} direction="column" justify="center" align="center" gap="8px">
        {menuList.map((item) => (
          <span
            key={item.path}
            className={classNames(styles.menuButton, {
              [styles.active]: location.pathname === item.path,
            })}
            onClick={() => {
              navigate(item.path);
            }}
          >
            {item.icon}
          </span>
        ))}
      </Flex>
      <div className={styles.barActions}>
        <span className={styles.menuButton} onClick={handleTerminal}>
          <Terminal size={20} />
        </span>
      </div>
    </Flex>
  );
};

export default Index;
