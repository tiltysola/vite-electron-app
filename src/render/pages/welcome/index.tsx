import { Link } from 'react-router-dom';

import './style.less';

const Index = () => {
  return (
    <div className="welcome">
      <div className="w-header">
        <img className="w-logo" src="logo.png" />
        <span className="w-info">Hello, react!</span>
      </div>
      <div className="w-main">
        <p className="w-text-primary">This page is powered by vite, electron and react!</p>
        <p className="w-text-normal">typescript and esbuild are also used for development!</p>
        <p className="w-text-normal">Time: {new Date().toString()}</p>
        <p>
          <Link to="/example/ipcrenderer">ipcRenderer example</Link>
        </p>
        <p>
          <Link to="/example/request">request example</Link>
        </p>
      </div>
      <div className="w-footer">
        <p className="w-text">Vite Electron App</p>
      </div>
    </div>
  );
};

export default Index;
