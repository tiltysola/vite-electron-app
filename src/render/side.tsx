import React from 'react';
import { createRoot } from 'react-dom/client';

import SideBar from '@/windows/SideBar';

import './global.less';

const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <SideBar />
  </React.StrictMode>,
);
