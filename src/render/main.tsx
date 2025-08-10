import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import Layout from '@/components/Layouts';

import '@ant-design/v5-patch-for-react-19';
import './global.less';

const root = createRoot(document.getElementById('root')!);
root.render(
  <HashRouter>
    <Layout />
  </HashRouter>,
);
