/* eslint-disable */
export default {
  displayName: 'example-frontend',
  preset: '../../../jest.preset.js',
  testEnvironment: 'jsdom',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/next/babel'] }],
  },
  testTimeout: 10000,
  modulePathIgnorePatterns: ['generated', '.next'],
  setupFilesAfterEnv: ['jest-canvas-mock'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../coverage/apps/example/frontend',
  collectCoverageFrom: ['src/**/*.{ts,tsx,js,jsx}'],
};
