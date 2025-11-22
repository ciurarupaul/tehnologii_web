import antfu from '@antfu/eslint-config';
import boundariesPlugin from 'eslint-plugin-boundaries';
import securityPlugin from 'eslint-plugin-security';

const serverFiles = ['./server/**/*.{js,mjs,ts}'];
const clientFiles = ['./client/**/*.{js,jsx,ts,tsx}'];

export default antfu(
  // antfu basic setup
  {
    type: 'app',
    typescript: true,
    formatters: true,
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.next/**',
      '**/out/**',
      '**/build/**',
      '**/coverage-ts/**',
      '**/type-coverage-report.json',
      '**/*.d.ts',
      '**/*.config.ts',
      'client/src/data/unused/**',
    ],
  },

  {
    plugins: {
      security: securityPlugin,
    },
    rules: {
      // stylistic
      // port prettier rules to eslint-plugin-stylistic
      'style/semi': ['error', 'always'],
      'style/indent': ['error', 2],
      'style/quotes': ['error', 'single'],
      'max-len': [
        "warn",
        {
          "code": 120,
          "ignoreUrls": true,
          "ignoreStrings": true,
          "ignoreComments": true, 
          "ignoreRegExpLiterals": true,
          "ignoreTemplateLiterals": true, 
      }
    ],
      'style/arrow-parens': ['error', 'always'],
      'style/linebreak-style': ['error', 'unix'],
      'style/jsx-closing-bracket-location': ['error', 'line-aligned'],
      'style/quote-props': ['error', 'as-needed'],
      'style/comma-dangle': ['error', 'always-multiline'],
      'style/jsx-quotes': ['error', 'prefer-single'],

      // other settings
      'ts/no-redeclare': 'off',
      'ts/consistent-type-definitions': ['error', 'type'],
      'no-console': ['warn'],
      'antfu/no-top-level-await': ['off'],
      'node/prefer-global/process': ['off'],
      'perfectionist/sort-imports': [
        'error',
        {
          tsconfigRootDir: '.',
        },
      ],

      // global security rules
      ...securityPlugin.configs.recommended.rules,
      'security/detect-object-injection': 'off',
      'import/no-named-as-default': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },

  // server-specific rule overrides
  {
    files: serverFiles,
    rules: {
      // apply process.env rule to server files
      'node/no-process-env': ['error'],

      // disable unsafe 'any' checks ONLY for the server files
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
    },
  },

  // client-specific rule overrides
 {
    files: clientFiles,
    plugins: { boundaries: boundariesPlugin },
    settings: {
      'boundaries/dependency-resolution': ['typescript'],
      'boundaries/elements': [
        { type: 'app', pattern: 'client/src/app' },
        { type: 'components', pattern: 'client/src/components' },
        { type: 'lib', pattern: 'client/src/lib' },
        { type: 'utils', pattern: 'client/src/utils' },
        { type: 'data', pattern: 'client/src/data' },
        { type: 'scss', pattern: 'client/src/scss' },
        { type: 'feature:(.*)', pattern: 'client/src/features/([^/]+)' },
        { type: 'types', pattern: 'client/src/types' },
      ],
    },
    rules: {
      '@next/next/no-html-link-for-pages': 'off',

      // boundaries rules
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          rules: [
            {
              from: ['app'],
              allow: [
                'app',
                'components',
                'feature:(.*)',
                'lib',
                'utils',
                'data',
                'scss',
                'types',
              ],
            },
            {
              from: ['feature:(.*)'],
              allow: ['components', 'lib', 'utils', 'data', 'scss', 'types'],
            },
            {
              from: ['components'],
              allow: ['components', 'lib', 'utils', 'data', 'scss', 'types'],
            },
            { from: ['lib'], allow: ['lib', 'utils', 'data', 'types'] },
            { from: ['utils'], allow: ['utils', 'data', 'types'] },
            { from: ['data'], allow: ['data', 'types'] },
            { from: ['scss'], allow: ['scss'] },
            { from: ['types'], allow: ['types'] },
          ],
        },
      ],
    },
  },

  // filenaming convention rules
  {
    // PascalCase for tsx components and tests
    files: ['client/src/**/*.{tsx,jsx}', 'client/__tests__/**/*.{tsx,jsx}'],
    ignores: [
      // Next.js specific files are exempt
      'client/src/app/**/{page,layout,loading,error,global-error,template,not-found,providers}.{tsx,jsx}',
    ],
    rules: {
      'unicorn/filename-case': ['error', { cases: { pascalCase: true } }],
    },
  },
  {
    // camelCase for .ts files
    files: ['**/*.ts'],
    ignores: [
      '**/*.d.ts',
      '**/*.setup.ts',
      '**/*.config.ts',
      
       // sentry config file
      'client/src/instrumentation-client.ts'
    ],
    rules: {
      'unicorn/filename-case': ['error', { cases: { camelCase: true } }],
    },
  },

  // specific file overrides
  {
    files: ['./client/jest.config.ts', './client/next.config.ts'],
    rules: {
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/require-await': 'off',
    },
  },
  {
    files: ['./client/next-env.d.ts'],
    rules: {
      '@typescript-eslint/triple-slash-reference': 'off',
    },
  },
  {
    files: ['./server/src/core/config.ts'],
    rules: {
      // only allow process.env calls in the config file
      'node/no-process-env': 'off',
    }
  }
);
