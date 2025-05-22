import esbuild from 'esbuild';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
      'process.env.ENV': '\'production\'',
    },
  });
  esbuild.build(preload_config);
} else {
  esbuild.build({
    ...common_config,
    define: {
      'process.env.ENV': '\'development\'',
      'process.env.PORT': '14843',
    },
  });
  esbuild.build(preload_config);
}
