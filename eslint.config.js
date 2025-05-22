const { react } = require('eslint-config-ali');

module.exports = [
  {
    ignores: ['**/node_modules/**', '**/dist/**']
  },
  ...react,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      "react/no-array-index-key": 0
    }
  }
];
