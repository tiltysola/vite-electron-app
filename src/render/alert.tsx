import React from 'react';
import { createRoot } from 'react-dom/client';

import Alert from '@/windows/Alert';

import './global.less';

const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <Alert />
  </React.StrictMode>,
);
