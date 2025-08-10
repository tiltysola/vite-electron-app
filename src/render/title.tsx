import React from 'react';
import { createRoot } from 'react-dom/client';

import TitleBar from '@/components/TitleBar';

import './global.less';

const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <TitleBar />
  </React.StrictMode>,
);
