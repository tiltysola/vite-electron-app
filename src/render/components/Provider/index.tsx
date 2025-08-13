import React from 'react';

import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

import { theme } from './theme';

import '@ant-design/v5-patch-for-react-19';
import './global.less';

interface ThemeProps {
  children: React.ReactNode;
}

const Index = (props: ThemeProps) => {
  const { children } = props;

  return (
    <React.StrictMode>
      <ConfigProvider locale={zhCN} theme={theme}>
        {children}
      </ConfigProvider>
    </React.StrictMode>
  );
};

export default Index;
