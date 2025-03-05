/* eslint-disable */
export default {
  displayName: 'workspace-plugin',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/tools/workspace-plugin/src',
  collectCoverageFrom: ['*.ts', '**/*.ts', '!jest.config.ts'],
};
