import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import esbuild from 'esbuild';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const localPkgJson = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8'),
);

const inputDir = path.join(__dirname, '../src/main/background.ts');
const inputPreload = path.join(__dirname, '../src/main/preload.ts');
const outputDir = path.join(__dirname, '../dist/main');

const external = Object.keys({
  ...(localPkgJson.dependencies || {}),
  ...(localPkgJson.devDependencies || {}),
  ...(localPkgJson.peerDependencies || {}),
});

const commonConfig = {
  entryPoints: [inputDir],
  bundle: true,
  format: 'esm',
  platform: 'node',
  outdir: outputDir,
  external,
};

const preloadConfig = {
  ...commonConfig,
  entryPoints: [inputPreload],
  format: 'cjs',
};

const isDev = process.env.NODE_ENV !== 'production';

if (isDev) {
  let electronProcess = null;

  const startElectron = () => {
    if (electronProcess) {
      electronProcess.kill();
      electronProcess = null;
    }
    electronProcess = spawn('electron', ['.'], {
      stdio: 'inherit',
      shell: true,
    });
  };

  let isFirstBuild = true;
  let lastBuildTime = 0;

  const ctx = await esbuild.context({
    ...commonConfig,
    define: {
      __dirname: JSON.stringify(outputDir),
      'process.env.ENV': "'development'",
      'process.env.PORT': '14843',
    },
    plugins: [
      {
        name: 'on-rebuild',
        setup(build) {
          build.onEnd(() => {
            if (Date.now() - lastBuildTime > 1000) {
              lastBuildTime = Date.now();
              if (isFirstBuild) {
                isFirstBuild = false;
                startElectron();
              } else {
                startElectron();
              }
            }
          });
        },
      },
    ],
  });

  await esbuild.build(preloadConfig);
  await ctx.watch();
} else {
  await esbuild.build({
    ...commonConfig,
    define: {
      __dirname: JSON.stringify(outputDir),
      'process.env.ENV': "'production'",
    },
  });
  await esbuild.build(preloadConfig);
}
