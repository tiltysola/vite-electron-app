import { Navigate, Route, Routes } from 'react-router-dom';

import ExampleIpcRenderer from '@/pages/Example/IpcRenderer';
import ExampleRequest from '@/pages/Example/Request';
import Notfound from '@/pages/NotFound';
import Welcome from '@/pages/Welcome';

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
