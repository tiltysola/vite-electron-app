import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import Router from '@/router';
import Alert from '@/views/Alert';
import SideBar from '@/views/SideBar';
import TitleBar from '@/views/TitleBar';

import Boundary from '@/components/Boundary';
import Provider from '@/components/Provider';

const searchParams = new URLSearchParams(window.location.search);
const targetView = searchParams.get('targetView') || 'index';

const getTargetWindow = () => {
  switch (targetView) {
    case 'title':
      return <TitleBar />;
    case 'side':
      return <SideBar />;
    case 'alert':
      return <Alert />;
    default:
      return (
        <HashRouter>
          <Router />
        </HashRouter>
      );
  }
};

const root = createRoot(document.getElementById('root')!);
root.render(
  <Provider>
    <Boundary>
      {getTargetWindow()}
    </Boundary>
  </Provider>,
);
