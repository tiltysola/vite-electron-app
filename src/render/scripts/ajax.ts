// Remove the direct electron import and use the exposed ipcRenderer
import type { IpcRendererEvent } from 'electron';

declare global {
  interface Window {
    ipcRenderer: {
      send: (channel: string, ...args: any[]) => void;
      invoke: (channel: string, ...args: any[]) => Promise<any>;
      on: (channel: string, callback: (event: IpcRendererEvent, ...args: any[]) => void) => () => void;
      once: (channel: string, callback: (event: IpcRendererEvent, ...args: any[]) => void) => () => void;
    };
  }
}

// 定义请求配置接口
interface AjaxConfig {
  url: string;
  data?: any;
  timeout?: number;
  headers?: Record<string, any>;
}

// 定义响应接口
interface AjaxResponse {
  headers: {
    request: {
      gmtRequest: number;
      [key: string]: any;
    };
    response: {
      url: string;
      gmtReceive: number;
      gmtResponse: number;
    };
  };
  data: any;
  code: number;
  message?: string;
}

// 定义错误类型
class AjaxError extends Error {
  constructor(
    public code: number,
    message: string,
    public response?: AjaxResponse
  ) {
    super(message);
    this.name = 'AjaxError';
  }
}

// 默认超时时间（毫秒）
const DEFAULT_TIMEOUT = 30000;

const ajax = async ({
  url,
  data,
  timeout = DEFAULT_TIMEOUT,
  headers = {},
}: AjaxConfig): Promise<AjaxResponse> => {
  const gmtRequest = new Date().getTime();

  // 创建超时 Promise
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(new AjaxError(408, 'Request timeout'));
    }, timeout);
  });

  // 创建请求 Promise
  const requestPromise = window.ipcRenderer.invoke('__ajax__', {
    url,
    data,
    headers: {
      gmtRequest,
      ...headers,
    },
  });

  try {
    // 使用 Promise.race 实现超时控制
    const response = await Promise.race([requestPromise, timeoutPromise]);

    // 检查响应状态码
    if (response.code !== 200) {
      throw new AjaxError(
        response.code,
        response.message || 'Request failed',
        response
      );
    }

    return response;
  } catch (error) {
    if (error instanceof AjaxError) {
      throw error;
    }
    throw new AjaxError(500, error instanceof Error ? error.message : 'Unknown error');
  }
};

export default ajax;
