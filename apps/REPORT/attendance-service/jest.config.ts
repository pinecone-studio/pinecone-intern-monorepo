/* eslint-disable */
export default {
  displayName: 'attendance-service',
  preset: '../../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/next/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../coverage/apps/REPORT/attendance-service',
  collectCoverageFrom: [
    '*.ts',
    '**/*.ts',
    'utils/**/*.ts',
    '!**/models/*.ts',
    '!**.d.ts',
    'src/config/database.ts',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**/generated.ts',
    '!**/generated/*.ts',
    '!**/resolvers/**/*index.ts',
    '!**/resolvers/error.ts',
    '!**/schemas/*.ts',
    '*-schema.ts',
    '!**/*-schema.ts',
    '*.graphql',
    '!*.config.ts',
    '!codegen.ts',
    '!src/pages/api/graphql.ts',
  ],
};
