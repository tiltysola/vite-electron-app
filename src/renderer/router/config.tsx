
import { ReactNode } from 'react';

import Copilot from '@/pages/Copilot';
import Example from '@/pages/Example';
import Initialize from '@/pages/Initialize';
import Notfound from '@/pages/NotFound';
import Welcome from '@/pages/Welcome';
import Layout from '@/components/Layouts';

export interface RouteConfig {
  path: string;
  title: string;
  element?: ReactNode;
  children?: RouteConfig[];
  index?: boolean;
}

export const routes: RouteConfig = {
  path: '/',
  title: 'Vite-Electron-App',
  element: <Layout />,
  children: [
    {
      path: '/',
      title: '初始化',
      element: <Initialize />,
      index: true,
    },
    {
      path: 'welcome',
      title: '欢迎',
      element: <Welcome />,
    },
    {
      path: 'copilot',
      title: '助手',
      element: <Copilot />,
    },
    {
      path: 'example',
      title: '示例',
      element: <Example />,
    },
    {
      path: '*',
      title: '错误页面',
      element: <Notfound />,
    },
  ]
};

export const findBreadcrumbList = (
  route: RouteConfig,
  pathname: string,
  parentPath = ''
): Array<{ path: string; title: string }> | null => {
  const fullPath = parentPath + (route.path === '/' ? '' : `/${route.path}`);
  const isMatch = route.index
    ? pathname === '/' || pathname === parentPath
    : pathname === fullPath || pathname === `/${route.path}`;

  if (isMatch) {
    return [{ path: fullPath || '/', title: route.title }];
  }

  if (route.children) {
    for (const child of route.children) {
      const result = findBreadcrumbList(child, pathname, fullPath);
      if (result) {
        return [{ path: fullPath || '/', title: route.title }, ...result];
      }
    }
  }

  return null;
};
