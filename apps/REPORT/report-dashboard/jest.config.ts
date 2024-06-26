/* eslint-disable */
export default {
  displayName: 'report-dashboard',
  preset: '../../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/next/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../coverage/apps/REPORT/report-dashboard',
  setupFilesAfterEnv: ['jest-canvas-mock'],
  collectCoverageFrom: [
    '!src/components/**/*.tsx',
    'src/**/_components/*.tsx',
    '!**/*.spec.tsx',
    '!**/node_modules/**',
    '!**/generated.ts',
    '!src/generated/*.ts',
    '!**/generated/*.ts',
    '*-schema.ts',
    '!**/*-schema.ts',
    '*.graphql',
    '!codegen.ts',
    '!src/pages/api/graphql.ts',
  ],
};
