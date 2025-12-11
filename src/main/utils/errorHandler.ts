/* eslint-disable no-console */

import Logger from '@/utils/Logger';
import AlertWindow from '@/windows/alert';
import MainWindow from '@/windows/main';

interface ErrorInfo {
  type: string;
  content: string;
  error?: unknown;
}

/**
 * Emit error to frontend via AlertWindow
 */
const emitError = (errorInfo: ErrorInfo) => {
  const parentWindow = MainWindow.getBrowserWindow();

  // Only show alert if main window exists
  if (parentWindow && !parentWindow.isDestroyed()) {
    AlertWindow.open({
      type: 'confirm',
      title: errorInfo.type,
      content: errorInfo.content,
      okText: 'OK',
      cancelText: false,
      parent: parentWindow,
    }).catch((err) => {
      Logger.error('[ErrorHandler] Failed to show alert:', err);
    });
  }
};

/**
 * Global unhandled rejection handler (browser-style)
 */
global.onunhandledrejection = (event) => {
  const errorString = JSON.stringify(event.reason, ['message', 'arguments', 'type', 'name']);
  Logger.error('[Unhandled]', event.reason, errorString);
  console.log(event.reason);
  emitError({
    type: 'Unhandled Exception',
    content: errorString,
    error: event.reason,
  });
};

/**
 * Process unhandled rejection handler (Node.js-style)
 */
process.on('unhandledRejection', (error: unknown) => {
  const errorString = error instanceof Error ? error.message : JSON.stringify(error);
  Logger.error('[Unhandled]', errorString);
  console.log(error);
  emitError({
    type: 'Unhandled Rejection',
    content: errorString,
    error,
  });
});

/**
 * Process uncaught exception handler
 */
process.on('uncaughtException', (error: Error) => {
  Logger.error('[UncaughtException]', error.message, error.stack);
  console.log(error);
  emitError({
    type: 'Uncaught Exception',
    content: error.message,
    error,
  });
});

export { emitError };
