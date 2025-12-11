import { Route, Routes } from 'react-router-dom';

import { RouteConfig,routes } from './config';

const renderRoutes = (routeList: RouteConfig[]): React.ReactNode =>
  routeList.map((route) =>
    route.index ? (
      <Route key={route.path} index element={route.element} />
    ) : (
      <Route key={route.path} path={route.path} element={route.element}>
        {route.children && renderRoutes(route.children)}
      </Route>
    )
  );

const Index = () => (
  <Routes>
    <Route path={routes.path} element={routes.element}>
      {routes.children && renderRoutes(routes.children)}
    </Route>
  </Routes>
);

export default Index;
