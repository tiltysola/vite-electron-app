import { defineConfig } from 'electron-vite';
import { resolve } from 'path';
import path from 'path';
import eslint from 'vite-plugin-eslint';

import react from '@vitejs/plugin-react';

export default defineConfig({
  main: {
    resolve: {
      alias: {
        '@': resolve('src/main'),
        'package.json': path.resolve(__dirname, 'package.json'),
      },
    },
  },
  preload: {},
  renderer: {
    publicDir: resolve('src/renderer/assets'),
    resolve: {
      alias: {
        '@': resolve('src/renderer'),
        'package.json': path.resolve(__dirname, 'package.json'),
      },
    },
    css: {
      modules: {
        localsConvention: 'camelCase',
        generateScopedName: '[name]__[local]___[hash:base64:5]',
      },
    },
    plugins: [
      react(),
      eslint({
        include: ['./src/**/*.ts', './src/**/*.tsx'],
        fix: true,
      }),
    ],
  },
});
