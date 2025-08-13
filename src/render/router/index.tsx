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

  useEffect(() => {
    ipcRenderer.invoke('routerSetPath', location.pathname);
  }, [location.pathname]);

  useIpcRenderer.on(
    'routerSetPath',
    (e, data) => {
      if (location.pathname !== data) {
        navigate(data);
      }
    },
    [location.pathname],
  );

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
