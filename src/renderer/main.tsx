import React from 'react';
import { createRoot } from 'react-dom/client';

import Alert from '@/views/Alert';
import Main from '@/views/Main';
import { Theme } from '@radix-ui/themes';

import "@radix-ui/themes/styles.css";
import './global.less';

const searchParams = new URLSearchParams(window.location.search);
const targetView = searchParams.get('targetView') || 'index';

const getTargetWindow = () => {
  switch (targetView) {
    case 'alert':
      return <Alert />;
    default:
      return <Main />;
  }
};

const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <Theme>
      {getTargetWindow()}
    </Theme>
  </React.StrictMode>
);
