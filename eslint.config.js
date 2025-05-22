import { react } from 'eslint-config-ali';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import prettier from 'eslint-config-prettier';

export default [
  {
    ignores: ['**/node_modules/**', '**/dist/**']
  },
  ...react,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      'simple-import-sort': simpleImportSort
    },
    rules: {
      "react/no-array-index-key": 0,
      "simple-import-sort/imports": [
        "error",
        {
          "groups": [
            ["^react"],
            ["^"],
            ["^@"],
            [
              "^@/pages",
              "^@/components"
            ],
            ["^\\."],
            ["^\\u0000"]
          ]
        }
      ]
    }
  },
  prettier
];
