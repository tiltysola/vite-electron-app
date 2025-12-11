import { Route, Routes } from 'react-router-dom';

import Copilot from '@/pages/Copilot';
import Example from '@/pages/Example';
import Initialize from '@/pages/Initialize';
import Notfound from '@/pages/NotFound';
import Welcome from '@/pages/Welcome';
import Layout from '@/components/Layouts';

const Index = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Initialize />} />
        <Route path="welcome" element={<Welcome />} />
        <Route path="copilot" element={<Copilot />} />
        <Route path="example" element={<Example />} />
        <Route path="*" element={<Notfound />} />
      </Route>
    </Routes>
  );
};

export default Index;
