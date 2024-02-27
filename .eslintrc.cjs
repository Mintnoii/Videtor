module.exports = {
  extends: [
    '@tachikomas/eslint-config',
    // 'eslint:recommended',
    'plugin:svelte/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.eslint.json',
    extraFileExtensions: ['.svelte'] // This is a required setting in `@typescript-eslint/parser` v4.24.0.
  },
  overrides: [
    {
      files: ['*.svelte'],
      parser: 'svelte-eslint-parser',
      // Parse the `<script>` in `.svelte` as TypeScript by adding the following configuration.
      parserOptions: {
        parser: '@typescript-eslint/parser'
      }
    }
    // ...
  ],
  rules: {
    // 暂时关闭
    "@typescript-eslint/no-explicit-any": "off",
    // override/add rules settings here, such as:
    // 'svelte/rule-name': 'error'
  }
};