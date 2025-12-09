import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import Router from '@/router';

import Boundary from '@/components/Boundary';
import Provider from '@/components/Provider';

const root = createRoot(document.getElementById('root')!);
root.render(
  <Provider>
    <Boundary>
      <HashRouter>
        <Router />
      </HashRouter>
    </Boundary>
  </Provider>,
);
