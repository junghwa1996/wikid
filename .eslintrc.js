module.exports = {
  root: true, // 최상위 설정임을 명시
  parser: '@typescript-eslint/parser', // TypeScript 파서
  parserOptions: {
    project: './tsconfig.json', // TypeScript 설정 파일 경로
    tsconfigRootDir: __dirname, // tsconfig의 루트 경로
    ecmaVersion: 'latest', // 최신 ECMAScript 문법 허용
    sourceType: 'module', // 모듈 사용
    ecmaFeatures: {
      jsx: true, // JSX 지원
    },
  },
  env: {
    browser: true, // 브라우저 환경 지원
    es2021: true, // ECMAScript 2021 지원
    node: true, // Node.js 환경 지원
  },
  plugins: [
    'prettier',
    'react',
    '@typescript-eslint',
    'import',
    'simple-import-sort',
    'tailwindcss',
  ],
  extends: [
    'eslint:recommended', // ESLint 기본 추천 규칙
    'plugin:jsx-a11y/recommended', // 접근성 권장 규칙
    'plugin:react/recommended', // React 추천 규칙
    'plugin:@typescript-eslint/recommended', // TypeScript 추천 규칙
    'plugin:prettier/recommended', // Prettier 추천 규칙
    'next/core-web-vitals', // Next.js 권장 규칙
    'plugin:tailwindcss/recommended', // TailwindCSS 권장 규칙 추가
    // 'plugin:@typescript-eslint/recommended-requiring-type-checking', // 타입 체크 권장 규칙 (제거)
  ],
  rules: {
    // Prettier 규칙
    'prettier/prettier': ['error', { endOfLine: 'auto' }],

    // React 관련 규칙
    'react/react-in-jsx-scope': 'off', // React 17+에서는 불필요한 import 제거
    'react/jsx-uses-react': 'off',
    'react/prop-types': 'off', // PropTypes 사용하지 않음

    // TypeScript 관련 규칙
    '@typescript-eslint/no-unused-vars': [
      'warn', // 'error'에서 'warn'으로 변경
      {
        argsIgnorePattern: '^_', // _로 시작하는 변수는 무시
        varsIgnorePattern: '^_', // _로 시작하는 변수는 무시
      },
    ], // 사용하지 않는 변수 에러 처리
    '@typescript-eslint/explicit-module-boundary-types': 'off', // 반환 타입 강제 비활성화

    'no-undef': 'off', // 'error'에서 'off'로 변경
    'no-unused-expressions': 'off', // 'error'에서 'off'로 변경
    'no-prototype-builtins': 'off', // 'error'에서 'off'로 변경
    '@typescript-eslint/no-floating-promises': 'off', // 'error'에서 'off'로 변경
    '@typescript-eslint/no-non-null-assertion': 'off', // 'error'에서 'off'로 변경
    '@typescript-eslint/no-explicit-any': 'off', // 'error'에서 'off'로 변경
    '@typescript-eslint/no-unused-vars': 'off', // 중복 규칙 제거
    '@typescript-eslint/strict-boolean-expressions': 'off', // 'error'에서 'off'로 변경
    '@typescript-eslint/no-unnecessary-condition': 'off', // 'error'에서 'off'로 변경
    '@typescript-eslint/no-unsafe-member-access': 'off', // 'error'에서 'off'로 변경
    '@typescript-eslint/no-misused-promises': [
      'warn', // 'error'에서 'warn'으로 변경
      {
        checksVoidReturn: false, // void 반환을 기대하지 않는 상황에서 경고 비활성화
      },
    ],

    // Import 관련 규칙
    'import/newline-after-import': 'off', // 'error'에서 'off'로 변경
    'simple-import-sort/imports': 'off', // 'error'에서 'off'로 변경
    'simple-import-sort/exports': 'off', // 'error'에서 'off'로 변경
  },
  settings: {
    react: {
      version: 'detect', // React 버전 자동 감지
    },
    'import/resolver': {
      node: {
        paths: ['.'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      typescript: {
        project: './tsconfig.json',
      },
    },
  },
  ignorePatterns: ['node_modules', '.next', 'dist'], // 린트 제외 경로
};
