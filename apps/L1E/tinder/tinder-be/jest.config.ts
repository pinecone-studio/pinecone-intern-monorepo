/* eslint-disable */
export default {
  displayName: 'tinder-be',
  preset: '../../../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/apps/L1E/tinder/tinder-be',
  collectCoverageFrom: [
    'src/resolvers/**/*.ts',
    '!src/**/*.schema.ts',
    '!src/utils/**',
    '!src/**/index.ts',
    '!src/handler.ts',
    '!src/schemas/**',
    '!src/resolvers/mutations/user/create-user.ts',
    '!src/resolvers/mutations/user/match.ts',
  ],
};
