import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
  root: './src/render',
  base: './',
  publicDir: './assets/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/render'),
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
  build: {
    outDir: path.resolve(__dirname, './dist/render'),
    emptyOutDir: true,
    rollupOptions: {
      external: ['electron', 'path'],
      input: {
        index: path.resolve(__dirname, 'src/render/index.html'),
        ...fs
          .readdirSync(path.resolve(__dirname, 'src/render/windows'))
          .filter((file) => file.endsWith('.html'))
          .reduce(
            (acc, file) => {
              const name = path.basename(file, '.html');
              acc[name] = path.resolve(__dirname, 'src/render/windows', file);
              return acc;
            },
            {} as Record<string, string>,
          ),
      },
    },
    chunkSizeWarningLimit: 10240,
  },
  optimizeDeps: {
    exclude: ['electron'],
  },
  server: {
    port: 14843,
  },
});
