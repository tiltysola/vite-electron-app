/* eslint-disable no-console */

import { ipcMain } from 'electron';

import test from './test';

// 定义请求和响应的接口
interface RequestHeaders {
  gmtRequest: number;
  [key: string]: any;
}

interface ResponseHeaders {
  request: RequestHeaders;
  response: {
    url: string;
    gmtReceive: number;
    gmtResponse: number;
  };
}

interface AjaxRequest {
  url: string;
  data?: any;
  headers: RequestHeaders;
}

interface AjaxResponse {
  headers: ResponseHeaders;
  data: any;
  code: number;
  message?: string;
}

// 定义路由处理函数的类型
type RouteHandler = (data?: any) => Promise<any>;

// 定义路由表类型
interface RouteTable {
  [key: string]: RouteHandler | RouteTable;
}

// 定义错误码
const ErrorCodes = {
  SUCCESS: 200,
  ROUTE_NOT_FOUND: 404,
  URL_INVALID: 400,
  SERVER_ERROR: 500,
} as const;

// 定义错误消息
const ErrorMessages = {
  [ErrorCodes.ROUTE_NOT_FOUND]: 'Route not found',
  [ErrorCodes.URL_INVALID]: 'Invalid URL format',
  [ErrorCodes.SERVER_ERROR]: 'Internal server error',
} as const;

const routes: RouteTable = {
  test,
};

// 路由缓存
const routeCache = new Map<string, RouteHandler>();

// 查找路由处理函数
const findRouteHandler = (url: string): RouteHandler | null => {
  // 检查缓存
  if (routeCache.has(url)) {
    return routeCache.get(url)!;
  }

  if (!/^(?:\/[A-Za-z0-9_-]+?)+$/.test(url)) {
    return null;
  }

  let route: any = routes;
  const requestUrl = url.split('/');
  
  for (let i = 1; i < requestUrl.length; i++) {
    route = route[requestUrl[i]];
    if (!route) {
      return null;
    }
  }

  // 缓存路由处理函数
  if (typeof route === 'function') {
    routeCache.set(url, route);
    return route;
  }

  return null;
};

// 创建标准响应
const createResponse = (
  code: number,
  data: any,
  headers: ResponseHeaders,
  message?: string
): AjaxResponse => ({
  headers,
  data,
  code,
  message: message || ErrorMessages[code as keyof typeof ErrorMessages],
});

const router = async () => {
  ipcMain.handle('__ajax__', async (event, { url, data: requestData, headers: requestHeaders }: AjaxRequest) => {
    const gmtReceive = new Date().getTime();
    
    try {
      const routeHandler = findRouteHandler(url);
      
      if (!routeHandler) {
        return createResponse(
          ErrorCodes.ROUTE_NOT_FOUND,
          null,
          {
            request: requestHeaders,
            response: {
              url,
              gmtReceive,
              gmtResponse: new Date().getTime(),
            },
          }
        );
      }

      const data = await routeHandler(requestData);
      
      return createResponse(
        ErrorCodes.SUCCESS,
        data,
        {
          request: requestHeaders,
          response: {
            url,
            gmtReceive,
            gmtResponse: new Date().getTime(),
          },
        }
      );
    } catch (error) {
      console.error('AJAX Error:', error);
      return createResponse(
        ErrorCodes.SERVER_ERROR,
        null,
        {
          request: requestHeaders,
          response: {
            url,
            gmtReceive,
            gmtResponse: new Date().getTime(),
          },
        },
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  });
};

export default router;
