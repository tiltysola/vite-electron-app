import { ReactNode } from 'react';

import { Bot, Home, Sticker } from 'lucide-react';

import Copilot from '@/pages/Copilot';
import Chat from '@/pages/Copilot/Chat';
import Example from '@/pages/Example';
import Initialize from '@/pages/Initialize';
import Notfound from '@/pages/NotFound';
import Welcome from '@/pages/Welcome';
import Layout from '@/components/Layouts';

export interface RouteConfig {
  path: string;
  title: string;
  element?: ReactNode;
  icon?: ReactNode;
  index?: boolean;
  hidden?: boolean;
  children?: RouteConfig[];
}

export interface NavigationItem {
  title: string;
  url: string;
  icon?: ReactNode;
  items?: Array<{ title: string; url: string }>;
}

export const routes: RouteConfig = {
  path: '/',
  title: 'Vite-Electron-App',
  element: <Layout />,
  children: [
    {
      path: '/',
      title: 'Initialize',
      element: <Initialize />,
      hidden: true,
      index: true,
    },
    {
      path: 'welcome',
      title: 'Welcome',
      element: <Welcome />,
      icon: <Home />,
    },
    {
      path: 'copilot',
      title: 'Copilot',
      element: <Copilot />,
      icon: <Bot />,
      children: [
        {
          path: 'chat',
          title: 'Chat',
          element: <Chat />,
        },
      ],
    },
    {
      path: 'example',
      title: 'Example',
      element: <Example />,
      icon: <Sticker />,
    },
    {
      path: '*',
      title: 'Error',
      element: <Notfound />,
      hidden: true,
    },
  ],
};

export const findBreadcrumbList = (
  route: RouteConfig,
  pathname: string,
  parentPath = '',
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

export const processRoutes = (
  routeList: RouteConfig[],
  parentPath = '',
  level = 0,
): NavigationItem[] => {
  if (level >= 2) return [];

  return routeList
    .filter((route) => !route.hidden && route.path !== '*')
    .map((route) => {
      const fullPath =
        parentPath + (route.path === '/' ? '' : `/${route.path}`.replace(/\/+/g, '/'));

      const result: NavigationItem = {
        title: route.title,
        url: fullPath || '/',
        icon: route.icon,
      };

      if (route.children && route.children.length > 0 && level < 1) {
        result.items = route.children
          .filter((child) => !child.hidden && child.path !== '*')
          .map((child) => {
            const childFullPath =
              fullPath + (child.path === '/' ? '' : `/${child.path}`.replace(/\/+/g, '/'));
            return {
              title: child.title,
              url: childFullPath || '/',
            };
          });
      }

      return result;
    });
};
