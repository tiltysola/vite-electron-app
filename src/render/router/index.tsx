import { Navigate, Route, Routes } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';

import Copilot from '@/pages/Copilot';
import Example from '@/pages/Example';
import Notfound from '@/pages/NotFound';
import Welcome from '@/pages/Welcome';
import Layout from '@/components/Layouts';

const Index = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/welcome" replace />} />
          <Route path="welcome" element={<Welcome />} />
          <Route path="copilot" element={<Copilot />} />
          <Route path="example" element={<Example />} />
          <Route path="*" element={<Notfound />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default Index;
