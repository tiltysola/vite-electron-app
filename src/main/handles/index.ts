import Logger from '@/utils/Logger';

// Files to exclude from auto-registration
const EXCLUDED_FILES = ['constructor', 'index'];

/**
 * Auto-register all handles
 * Use import.meta.glob for dynamic import, compatible with electron-vite bundling
 */
export const registerAllHandles = async () => {
  // Use import.meta.glob to dynamically import all .ts files
  const modules = import.meta.glob('./*.ts', { eager: false });

  for (const modulePath in modules) {
    if (!Object.prototype.hasOwnProperty.call(modules, modulePath)) continue;

    // Extract filename without extension
    const fileName = modulePath.replace(/^\.\/(.*)\.ts$/, '$1');

    // Skip excluded files
    if (EXCLUDED_FILES.includes(fileName)) {
      continue;
    }

    try {
      // eslint-disable-next-line no-await-in-loop
      const module = (await modules[modulePath]()) as { default?: () => void };
      const registerFn = module.default;

      if (typeof registerFn === 'function') {
        registerFn();
        Logger.info('[Handles]', `Loaded handle module: ${fileName}`);
      }
    } catch (error) {
      Logger.error('[Handles]', `Failed to load handle module: ${fileName}`, error);
    }
  }
};

export default registerAllHandles;
