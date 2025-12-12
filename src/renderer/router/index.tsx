import { Route, Routes } from 'react-router-dom';

import { RouteConfig, routes } from './config';

const renderRoutes = (routeList: RouteConfig[], parentPath = ''): React.ReactNode =>
  routeList.map((route) => {
    const currentPath = route.path === '/' ? '' : route.path;
    const fullPathKey = parentPath ? `${parentPath}-${currentPath}` : currentPath || '/';
    const uniqueKey = route.index ? `${fullPathKey}-index` : fullPathKey;

    return route.index ? (
      <Route key={uniqueKey} index element={route.element} />
    ) : (
      <Route key={uniqueKey} path={route.path} element={route.element}>
        {route.children &&
          renderRoutes(route.children, parentPath ? `${parentPath}-${currentPath}` : currentPath)}
      </Route>
    );
  });

const Index = () => (
  <Routes>
    <Route path={routes.path} element={routes.element}>
      {routes.children && renderRoutes(routes.children)}
    </Route>
  </Routes>
);

export default Index;
