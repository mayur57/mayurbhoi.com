const nextConfig = require('eslint-config-next');

module.exports = [
  ...nextConfig,
  {
    name: 'project-typescript-overrides',
    files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts', '**/*.d.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      'react-hooks/set-state-in-effect': 'off',
    },
  },
];
