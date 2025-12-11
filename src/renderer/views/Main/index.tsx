import { HashRouter } from 'react-router-dom';

import Router from '@/router';

import Boundary from '@/components/Boundary';

const Index = () => {
  return (
    <Boundary>
      <HashRouter>
        <Router />
      </HashRouter>
    </Boundary>
  );
}

export default Index;
