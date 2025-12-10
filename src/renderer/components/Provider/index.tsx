import React from 'react';

import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

interface ThemeProps {
  children: React.ReactNode;
}

const Index = (props: ThemeProps) => {
  const { children } = props;

  return (
    <React.StrictMode>
      <ConfigProvider locale={zhCN}>
        {children}
      </ConfigProvider>
    </React.StrictMode>
  );
};

export default Index;
