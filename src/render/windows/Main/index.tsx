import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import Layout from '@/components/Layouts';
import Provider from '@/components/Provider';

const root = createRoot(document.getElementById('root')!);
root.render(
  <Provider>
    <HashRouter>
      <Layout />
    </HashRouter>
  </Provider>,
);
