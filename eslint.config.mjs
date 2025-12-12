import { react } from 'eslint-config-ali';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import { defineConfig } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';

export default defineConfig(
  {
    ignores: ['**/node_modules', '**/dist', '**/out'],
  },
  ...react,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'react/no-array-index-key': 0,
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^react'],
            ['^'],
            ['^@'],
            ['^@/pages', '^@/components'],
            ['^\\.'],
            ['^\\u0000'],
          ],
        },
      ],
    },
  },
  {
    files: ['src/renderer/shadcn/**/*.{js,jsx,ts,tsx}'],
    rules: {
      'no-nested-ternary': 0,
      'no-param-reassign': 0,
      '@typescript-eslint/consistent-type-assertions': 0,
      '@typescript-eslint/no-shadow': 0,
    },
  },
  eslintConfigPrettier,
);
