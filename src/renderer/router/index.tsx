import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { useIpcRenderer } from '@/hooks';

import Copilot from '@/pages/Copilot';
import Example from '@/pages/Example';
import Notfound from '@/pages/NotFound';
import Welcome from '@/pages/Welcome';
import Layout from '@/components/Layouts';

const Index = () => {
  const location = useLocation();
  const navigate = useNavigate();

  console.log(location, 'as');

  useEffect(() => {
    window.ipcRenderer.invoke('setRouter', location.pathname);
  }, [location.pathname]);

  // prettier-ignore
  useIpcRenderer.on('setRouter', (_, data) => {
    if (location.pathname !== data) {
      navigate(data);
    }
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/welcome" replace />} />
        <Route path="welcome" element={<Welcome />} />
        <Route path="copilot" element={<Copilot />} />
        <Route path="example" element={<Example />} />
        <Route path="*" element={<Notfound />} />
      </Route>
    </Routes>
  );
};

export default Index;
