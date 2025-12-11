/* eslint-disable no-console */

import chalk from 'chalk';
import dayjs from 'dayjs';
import { app } from 'electron';
import fs from 'fs';
import path from 'path';
import util from 'util';

import { stopHandler } from './cleanup';

// Log directory
const logPath = path.join(app.getPath('userData'), app.isPackaged ? 'logs' : 'logs-dev');

// Log streams
let logStreamInfo: fs.WriteStream;
let logStreamDebug: fs.WriteStream;
let logStreamWarn: fs.WriteStream;
let logStreamError: fs.WriteStream;

/**
 * Convert argument to string
 */
const stringify = (arg: unknown): string => {
  try {
    if (arg instanceof Error) {
      const formattedError = util.inspect(arg, { showHidden: false, depth: null, colors: false });
      return `${arg?.toString()?.substring(0, 10240)}\n${formattedError}`;
    } else if (typeof arg === 'string') {
      return arg;
    } else {
      return JSON.stringify(arg);
    }
  } catch {
    return String(arg);
  }
};

type ChalkColor = 'blue' | 'green' | 'yellow' | 'red' | 'grey';

/**
 * Core log function
 */
const log = (level: string, color: ChalkColor, ...args: unknown[]) => {
  const time = dayjs().format('YYYY-MM-DD HH:mm:ss');

  let logStream: fs.WriteStream | undefined;
  if (level === 'INFO') {
    logStream = logStreamInfo;
  } else if (level === 'DEBUG') {
    logStream = logStreamDebug;
  } else if (level === 'WARN') {
    logStream = logStreamWarn;
  } else if (level === 'ERROR') {
    logStream = logStreamError;
  }

  const logContent = `[${time}] [${level}] ${args.map((arg) => stringify(arg)).join(' ')}\n`;

  try {
    logStream?.write(logContent);
  } catch (e) {
    console.error('Logger write error:', e);
  }

  // Console output
  console.log(
    chalk.grey(`[${time}]`),
    chalk[color](`[${level}]`),
    ...args.map((arg) => String(arg).substring(0, 1024)),
  );
};

/**
 * Initialize/update log streams
 */
const initLogStreams = () => {
  const date = dayjs().format('YYYY-MM-DD');
  const logDir = path.join(logPath, date);

  // Ensure log directory exists
  if (!fs.existsSync(logPath)) {
    fs.mkdirSync(logPath, { recursive: true });
  }
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  const createWriteStream = (fileName: string) => {
    return fs.createWriteStream(path.join(logDir, fileName), { flags: 'a' });
  };

  const suffix = app.isPackaged ? 'prod' : 'dev';

  // Close old log streams
  const oldStreams = [logStreamInfo, logStreamDebug, logStreamWarn, logStreamError];

  // Create new log streams
  logStreamInfo = createWriteStream(`${date}.info.${suffix}.log`);
  logStreamDebug = createWriteStream(`${date}.debug.${suffix}.log`);
  logStreamWarn = createWriteStream(`${date}.warn.${suffix}.log`);
  logStreamError = createWriteStream(`${date}.error.${suffix}.log`);

  // Safely close old streams
  oldStreams.forEach((stream) => {
    try {
      stream?.close();
    } catch {
      // ignore
    }
  });
};

// Initialize log streams
initLogStreams();

/**
 * Logger object
 */
export const Logger = {
  info: (...args: unknown[]) => {
    log('INFO', 'blue', ...args);
  },
  debug: (...args: unknown[]) => {
    log('DEBUG', 'green', ...args);
  },
  warn: (...args: unknown[]) => {
    log('WARN', 'yellow', ...args);
  },
  error: (...args: unknown[]) => {
    log('ERROR', 'red', ...args);
  },
};

// Start logging
Logger.info('[Logger] Start logging...');

// Register cleanup handler
stopHandler.push(() => {
  Logger.info('[Logger] Stop logging...');
  try {
    logStreamInfo?.close();
    logStreamDebug?.close();
    logStreamWarn?.close();
    logStreamError?.close();
  } catch {
    // ignore
  }
});

// Default export for compatibility
export default Logger;
