// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      import: importPlugin,
    },
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // Кастомные правила из старой конфигурации
      'quotes': ['error', 'single'],
      'max-len': [
        'error',
        140,
        2,
        {
          ignoreComments: true,
          ignoreUrls: true,
        },
      ],
      'linebreak-style': ['error', 'unix'],
      'object-curly-spacing': [2, 'always'],
      
      // React правила
      'react/require-default-props': 'off',
      'react/function-component-definition': 'off',
      'react/prop-types': 'off',
      'react/jsx-no-useless-fragment': 'off',
      'react/jsx-props-no-spreading': 'off',
      'jsx-a11y/media-has-caption': 'off',
      'react/jsx-filename-extension': 'off',
      'react/react-in-jsx-scope': 'off',
      
      // Import правила
      'import/prefer-default-export': 'off',
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: true,
        },
      ],
      
      // TypeScript правила
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-inferrable-types': 'error',
      '@typescript-eslint/ban-ts-comment': 'error',
      '@typescript-eslint/prefer-for-of': 'error',
      
      // Next.js правила (заменяем отсутствующие)
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/aria-props': 'error',
      'jsx-a11y/aria-proptypes': 'error',
      'jsx-a11y/aria-unsupported-elements': 'error',
      'jsx-a11y/role-has-required-aria-props': 'error',
      'jsx-a11y/role-supports-aria-props': 'error',
      
      // Отключаем отсутствующие правила Next.js
      '@next/next/no-img-element': 'off',
    },
  },
  {
    files: ['**/*.config.{js,mjs}'],
    rules: {
      'import/no-extraneous-dependencies': 'off',
    },
  },
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'dist/**',
      '*.config.js',
      'next.config.mjs',
      'src/types/gray-matter.d.ts',
    ],
  },
);
