import { Routes, Route, Navigate } from 'react-router-dom';

import Welcome from '@/pages/welcome';
import ExampleIpcRenderer from '@/pages/example/ipcrenderer';
import ExampleRequest from '@/pages/example/request';
import Notfound from '@/pages/notfound';

const Index = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/welcome" replace />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/example/ipcrenderer" element={<ExampleIpcRenderer />} />
      <Route path="/example/request" element={<ExampleRequest />} />
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
};

export default Index;
