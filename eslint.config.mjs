import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import { fixupConfigRules } from '@eslint/compat';
import eslintPluginFormat from 'eslint-plugin-formatjs';
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        module: 'readonly',
        ...globals.serviceworker,
        ...globals.jest,
        ...globals.node,
      },
    },
    plugins: {
      formatjs: eslintPluginFormat,
      'jsx-a11y': jsxA11y,
    },
    // ignores: ['node_modules', 'public', 'build', 'dist', '.gitignore', 'internals'],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...fixupConfigRules({
    ...pluginReactConfig,
    settings: {
      react: {
        version: 'detect',
      },
    },
  }),
  {
    rules: {
      'react/react-in-jsx-scope': 'off',
      'formatjs/no-literal-string-in-jsx': 'error',
      'formatjs/no-multiple-whitespaces': 'error',
      ...jsxA11y.configs.recommended.rules,
      'react/display-name': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      'jsx-a11y/tabindex-no-positive': 'off',
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
];
