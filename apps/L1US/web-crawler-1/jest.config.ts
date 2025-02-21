/* eslint-disable */
export default {
  displayName: 'web-crawler-1',
  preset: '../../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../coverage/apps/L1US/web-crawler-1',
  collectCoverageFrom: ['src/resolvers/**/*.ts', 'src/utils/**/*.ts','!src/**/*.schema.ts', '!src/**/index.ts', '!src/handler.ts', '!src/schemas/**'],
};
