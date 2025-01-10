module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'airbnb',
        'airbnb-typescript',
        'prettier',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:import/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: [
        'react',
        'react-hooks',
        '@typescript-eslint',
        'prettier',
        'jsx-a11y',
        'import',
    ],
    rules: {
        '@typescript-eslint/lines-between-class-members': [
            'off',
            {
                exceptAfterSingleLine: true, // 단일 라인 클래스 멤버 사이에 공백을 두지 않도록 설정
            },
        ],
        '@typescript-eslint/no-throw-literal': 'off', // 원시 값 던지기를 방지하는 규칙 활성화
        'import/no-unresolved': 'off', // import 경로를 검사하지 않도록 설정
        'import/extensions': 'off', // import 시 확장자를 검사하지 않도록 설정
        'import/no-extraneous-dependencies': 'off', // devDependencies 에서 import 하는 것을 허용
        'react/react-in-jsx-scope': 'off', // React 17 이상에서는 더 이상 필요하지 않습니다.
        'react/jsx-uses-react': 'off', // React 17 이상에서는 더 이상 필요하지 않습니다.
    },
};
