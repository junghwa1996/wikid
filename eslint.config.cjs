// eslint.config.cjs
const prettierPlugin = require('eslint-plugin-prettier');
const reactPlugin = require('eslint-plugin-react');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const importPlugin = require('eslint-plugin-import');
const simpleImportSortPlugin = require('eslint-plugin-simple-import-sort');

module.exports = [
  {
    // 검사할 파일 패턴
    files: ['pages/**/*.{js,jsx,ts,tsx}', 'components/**/*.{js,jsx,ts,tsx}'], // 검사 대상 파일
    ignores: ['node_modules', '.next', 'dist'], // 검사에서 제외할 파일 및 폴더
    languageOptions: {
      ecmaVersion: 'latest', // 최신 ECMAScript 문법 허용
      sourceType: 'module', // ECMAScript 모듈 사용
      parser: tsParser, // TypeScript 파일을 파싱할 파서 설정
      parserOptions: {
        ecmaFeatures: { jsx: true }, // JSX 문법 허용
        project: null, // TypeScript 프로젝트 설정 (타입 기반 분석 미사용)
      },
    },
    plugins: {
      prettier: prettierPlugin, // Prettier와 ESLint 연동
      react: reactPlugin, // React 관련 규칙 활성화
      '@typescript-eslint': tsPlugin, // TypeScript 관련 규칙 활성화
      import: importPlugin, // Import 관련 규칙 활성화
      'simple-import-sort': simpleImportSortPlugin, // Import 정렬 관련 규칙 활성화
    },
    rules: {
      // Prettier 관련 규칙
      'prettier/prettier': ['error', { endOfLine: 'auto' }],

      // React 관련 규칙
      'react/react-in-jsx-scope': 'off', // React 17+에서는 import React가 필요 없으므로 비활성화

      // TypeScript 관련 규칙
      '@typescript-eslint/no-unused-vars': ['error'], // 사용되지 않는 변수에 대해 에러 표시
      '@typescript-eslint/explicit-module-boundary-types': 'off', // 함수 반환 타입 명시를 강제하지 않음

      // Import/Export 관련 규칙
      'import/newline-after-import': 'error', // import 문 다음에 빈 줄 강제
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // Node.js built-ins
            ['^node:'],
            // Packages
            ['^@?\\w'],
            // Absolute imports and other imports such as Vue-style `@/foo`
            ['^@/'],
            // Relative imports
            ['^\\.'],
            // Style imports
            ['^.+\\.s?css$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
    },
    settings: {
      react: {
        version: 'detect', // React 버전을 자동으로 감지 (설정 불필요)
      },
      'import/resolver': {
        node: {
          paths: ['.'],
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
        alias: {
          map: [
            ['@/components', './components'],
            ['@/styles', './styles'],
            ['@/pages', './pages'],
            ['@/utils', './utils'],
            ['@/hooks', './hooks'],
          ],
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
  },
  {
    ignores: ['.next'], // .next 폴더를 전역적으로 무시
  },
  // ESLint 권장 규칙
  'eslint:recommended',
  // React 권장 규칙
  'plugin:react/recommended',
  // TypeScript 권장 규칙
  'plugin:@typescript-eslint/recommended',
  // Prettier와 ESLint 통합 규칙
  'plugin:prettier/recommended',
];
