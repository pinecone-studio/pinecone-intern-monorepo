/* eslint-disable */
export default {
  displayName: 'glms-dashboard',
  preset: '../../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/next/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../coverage/apps/GLMS/glms-dashboard',
  setupFilesAfterEnv: ['jest-canvas-mock'],
  collectCoverageFrom: [
    '!src/app/**/*.tsx',
    'src/**/_components/*.tsx',
    '!**/*.spec.tsx',
    '!**/node_modules/**',
    '!**/generated.ts',
    '!**/generated/*.ts',
    '*-schema.ts',
    '!**/*-schema.ts',
    '*.graphql',
    '!codegen.ts',
    '!src/pages/api/graphql.ts',
    '!src/lib/utils.ts',
  ],
};
