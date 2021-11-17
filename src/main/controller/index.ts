import { ipcMain } from 'electron';
import test from './test';

interface AjaxProps {
  url: string;
  data?: {};
  headers: {};
}

const routes = {
  test
}

const router = async () => {
  ipcMain.handle('__ajax__', async (event, { url, data: requestData, headers: requestHeaders }: AjaxProps) => {
    const gmtReceive = new Date().getTime();
    let code: number = 200, data: any = null;
    if (/^(?:\/[A-Za-z0-9_-]+?)+$/.test(url)) {
      let route: any = routes;
      const requestUrl = url.split('/');
      for (let i = 1; i < requestUrl.length; i++) {
        route = route[requestUrl[i]]
        if (!route) {
          // route not found
          code = 500;
          data = 'ROUTE_NOT_FOUND'
          break;
        }
        if (i === requestUrl.length - 1) {
          data = await route(requestData);
        }
      }
    } else {
      // url must: /xx/xx
      code = 500;
      data = 'URL_INVALID'
    }
    const gmtResponse = new Date().getTime();
    return {
      headers: {
        request: requestHeaders,
        response: {
          url,
          gmtReceive,
          gmtResponse,
        }
      },
      data,
      code
    };
  });
}

export default router;
