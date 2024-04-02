/* eslint-disable */
export default {
  displayName: 'file-management',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/libs/file-management',
  collectCoverageFrom: ['*.ts', '**/*.ts', '!jest.config.ts', '!**/index.ts'],
};
