/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['@monorepo/eslint-config/next.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
  },
  ignorePatterns: ['.eslintrc.js'],
}