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

const input_dir = path.join(__dirname, '../src/main/background.ts');
const input_preload = path.join(__dirname, '../src/main/preload.ts');
const output_dir = path.join(__dirname, '../dist/main/background.js');

const common_config = {
  entryPoints: [input_dir],
  bundle: true,
  format: 'esm',
  platform: 'node',
  outdir: path.join(output_dir, '../'),
  external: Object.keys({
    ...(localPkgJson.dependencies || {}),
    ...(localPkgJson.devDependencies || {}),
    ...(localPkgJson.peerDependencies || {}),
  }),
};

const preload_config = {
  ...common_config,
  entryPoints: [input_preload],
  format: 'cjs',
};

if (process.env.NODE_ENV === 'production') {
  esbuild.build({
    ...common_config,
    define: {
      '__dirname': JSON.stringify(path.join(__dirname, '../dist/main')),
      'process.env.ENV': "'production'",
    },
  });
  esbuild.build(preload_config);
} else {
  esbuild.context({
    ...common_config,
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
  esbuild.build(preload_config);
}
