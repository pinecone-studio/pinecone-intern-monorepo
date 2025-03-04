/* eslint-disable */
export default {
  displayName: 'chatbot-service',
  preset: '../../../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/next/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  modulePathIgnorePatterns: ['generated', '.next'],
  setupFilesAfterEnv: ['jest-canvas-mock'],
  coverageDirectory: '../../../../coverage/apps/L1US/chatbot/service',
  collectCoverageFrom: [
    '*.ts',
    '**/*.ts',
    '!**/graphql.ts',
    '!**/schema/index.ts',
    '!**/*.schema.ts',
    '!specs/**/*.ts',
    '!**/_service.ts',
    '!**/graphql/index.ts',
    '!**/cors.ts',
    '!**/drizzle.ts',
    '!**/schemas/*.ts',
    '!**.d.ts',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**/generated.ts',
    '!**/generated/*.ts',
    '*-schema.ts',
    '!**/*-schema.ts',
    '*.graphql',
    '!*.config.ts',
    '!graphql/*.ts',
    '!graphql/resolvers/index.ts',
    '!src/graphql/resolvers/index.ts',
    '!pages/api/graphql.ts',
    '!resolvers/index.ts',
    '!schemas/index.ts',
  ],
};
