module.exports =  {
    parser:  '@typescript-eslint/parser',
    extends:  [
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
    ],
    parserOptions:  {
        ecmaVersion:  2018,
        sourceType:  'module',
    },
    plugins: [
        'react-hooks',
    ],
    'rules': {
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
    },
    settings:  {
        react:  {
            version:  'detect',
        },
    },
};