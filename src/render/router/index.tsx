import { Navigate, Route, Routes } from 'react-router-dom';

import Example from '@/pages/Example';
import Notfound from '@/pages/NotFound';
import Welcome from '@/pages/Welcome';

const Index = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/welcome" replace />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/example" element={<Example />} />
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
};

export default Index;
