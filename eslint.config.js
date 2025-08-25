import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import eslintPluginImportHelpers from 'eslint-plugin-import-helpers';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import { globalIgnores } from 'eslint/config';
import prettier from 'eslint-config-prettier';

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
      prettier,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'import-helpers': eslintPluginImportHelpers,
      prettier: eslintPluginPrettier,
    },
    rules: {
      'react-hooks/exhaustive-deps': 'off',
      'import-helpers/order-imports': [
        'warn',
        {
          newlinesBetween: 'always',
          groups: [
            [
              '/^react/',
              '/^react-select/',
              '/^@reduxjs/',
              '/^redux/',
              '/^jwt-decode/',
              '/^axios/',
              '/^formik/',
              '/^yup/',
              '/^framer-motion/',
              '/^classnames/',
            ],
            'module',
            '/^@\\//',
            ['parent', 'sibling', 'index'],
            '/^.+\\.scss$/',
          ],
        },
      ],
      ...prettier.rules,
    },
  },
]);
