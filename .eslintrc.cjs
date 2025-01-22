module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    settings: {
        'import/resolver': {
            typescript: {
                alwaysTryTypes: true,
            },
        },
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
        // 뭔지 몰라서 제거한 규칙
        '@typescript-eslint/lines-between-class-members': 'off', // 클래스 멤버 사이에 빈 줄을 요구하는 규칙 비활성화
        '@typescript-eslint/no-throw-literal': 'off', // 원시 값 던지기를 방지하는 규칙 비활성화

        // 의도적으로 제거한 규칙
        'import/extensions': 'off', // import 시 확장자를 검사하지 않도록 설정
        'import/no-extraneous-dependencies': 'off', // devDependencies 에서 import 하는 것을 허용
        'no-param-reassign': [
            // immer 패키지를 사용할 때, draft 변수에 대한 재할당을 부분 허용
            // canvasApi 를 사용할 때, ctx 변수에 대한 재할당을 부분 허용
            'error',
            {
                props: true,
                ignorePropertyModificationsFor: ['draft', 'ctx'], // 'draft' 변수에 대해서는 허용
            },
        ],

        // 필요없는 규칙
        'react/react-in-jsx-scope': 'off', // React 17 이상에서는 더 이상 필요하지 않습니다.
        'react/jsx-uses-react': 'off', // React 17 이상에서는 더 이상 필요하지 않습니다.
        'react/prop-types': 'off', // TypeScript 를 사용하므로 prop-types 를 사용하지 않습니다."
    },
};
