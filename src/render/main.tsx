import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import Layout from '@/components/layouts';

import './global.less';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Layout />
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
