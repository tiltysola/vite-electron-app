import { createRoot } from 'react-dom/client';

import Router from '@/router';

import Boundary from '@/components/Boundary';
import Provider from '@/components/Provider';

const root = createRoot(document.getElementById('root')!);
root.render(
  <Provider>
    <Boundary>
      <Router />
    </Boundary>
  </Provider>,
);
