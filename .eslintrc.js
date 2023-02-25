const prettierConfig = require('./.prettierrc');

module.exports = {
    extends: [
        'plugin:react/recommended',
        'airbnb',
        'airbnb-typescript',
        'airbnb/hooks',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:prettier/recommended',
    ],
    parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
        ecmaVersion: 2018,
        ecmaFeatures: {
            jsx: true,
        },
    },
    settings: {
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
            typescript: {},
        },
        react: {
            version: 'detect',
        },
    },
    plugins: [
        '@typescript-eslint/eslint-plugin',
        'react',
        'react-hooks',
        'import',
        'prettier'
    ],
    rules: {
        'prettier/prettier': ['error', prettierConfig],
        'max-len': [
          'error',
          {
            code: 120,
            ignoreComments: true,
            ignoreUrls: true,
            ignoreTemplateLiterals: true,
            ignoreRegExpLiterals: true,
          }
        ],
        'object-curly-newline': 'off',
        'class-methods-use-this': 'off',
        'import/prefer-default-export': 'off',
        'import/first': 'error',
        'import/newline-after-import': 'error',
        'import/no-duplicates': 'error',
        'import/order': [
          'error',
          {
            groups: [
              'external',
              'sibling',
              'parent',
              'internal',
              'builtin',
              'object',
              'type',
              'index',
            ],
            'newlines-between': 'always',
          },
        ],
        '@typescript-eslint/explicit-member-accessibility': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
        '@typescript-eslint/no-floating-promises': 'off',
        'linebreak-style': 'off',
        'no-underscore-dangle': ['error', { 'allow': ['_id', '__ENV'] }],
        'arrow-parens': ['error', 'always'],
        'no-void': ['error', { allowAsStatement: true }],
        '@typescript-eslint/no-use-before-define': 'off',
        'import/no-extraneous-dependencies': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
        'react/require-default-props': 'off',
        'react/function-component-definition': [
            'error',
            {
                namedComponents: 'arrow-function',
                unnamedComponents: 'arrow-function',
            },
        ],
        'react/jsx-first-prop-new-line': ['warn', 'multiline'],
        'react/jsx-closing-bracket-location': [
            'warn',
            'tag-aligned',
        ],
        'react/jsx-max-props-per-line': [
            'warn',
            { maximum: 1, when: 'multiline' },
        ],
        'react/jsx-indent-props': ['warn', 2],
        'no-param-reassign': ['error', { 'props': true, 'ignorePropertyModificationsForRegex': ['^figma'] }],
        'react/jsx-no-useless-fragment': 'off',
        '@typescript-eslint/unbound-method': 'off',
    },
};
