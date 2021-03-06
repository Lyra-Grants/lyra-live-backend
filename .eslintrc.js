module.exports = {
  extends: [
    'eslint:recommended', 
    'plugin:@typescript-eslint/recommended', 
    'airbnb-base'
  ],
  env: {
    node: true,
    browser: true,
    commonjs: true,
    es6: true,
    mocha: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint', 
    'simple-import-sort', 
    'unused-imports',
  ],
  rules: {
    'indent': ['warn', 2],
    '@typescript-eslint/no-inferrable-types': 0,
    'simple-import-sort/imports': 'error',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
  },
  settings: {},
}
