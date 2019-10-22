module.exports = {
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  plugins: ['react'],

  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    node: true,
  },
  globals: {
    __static: true,
  },
  rules: {
    'no-unused-vars': 0,
  },
};
