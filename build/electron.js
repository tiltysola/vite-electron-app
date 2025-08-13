import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

import electronConnect from 'electron-connect';
import esbuild from 'esbuild';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const electron = electronConnect.server.create({
  stopOnClose: true,
});

const localPkgJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8'));

const inputDir = path.join(__dirname, '../src/main/background.ts');
const inputPreload = path.join(__dirname, '../src/main/preload.ts');
const outputDir = path.join(__dirname, '../dist/main/background.js');

const commonConfig = {
  entryPoints: [inputDir],
  bundle: true,
  format: 'esm',
  platform: 'node',
  outdir: path.join(outputDir, '../'),
  external: Object.keys({
    ...(localPkgJson.dependencies || {}),
    ...(localPkgJson.devDependencies || {}),
    ...(localPkgJson.peerDependencies || {}),
  }),
};

const preloadConfig = {
  ...commonConfig,
  entryPoints: [inputPreload],
  format: 'cjs',
};

if (process.env.NODE_ENV === 'production') {
  esbuild.build({
    ...commonConfig,
    define: {
      '__dirname': JSON.stringify(path.join(__dirname, '../dist/main')),
      'process.env.ENV': "'production'",
    },
  });
  esbuild.build(preloadConfig);
} else {
  esbuild.context({
    ...commonConfig,
    define: {
      '__dirname': JSON.stringify(path.join(__dirname, '../dist/main')),
      'process.env.ENV': "'development'",
      'process.env.PORT': '14843',
    },
    plugins: [{
      name: 'plugin-on-rebuild',
      setup(build) {
        let lastestBuildTime = 0;
        let isFirstBuild = true;
        build.onEnd(() => {
          if (Date.now() - lastestBuildTime > 1000) {
            lastestBuildTime = Date.now();
            if (isFirstBuild) {
              isFirstBuild = false;
              electron.start();
            } else {
              electron.restart();
            }
          }
        });
      },
    }]
  }).then((context) => {
    context.watch();
  });
  esbuild.build(preloadConfig);
}
