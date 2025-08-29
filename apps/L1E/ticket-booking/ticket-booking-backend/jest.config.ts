/* eslint-disable */
export default {
  displayName: 'example-backend',
  preset: '../../../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/next/babel'], babelrc: false }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/apps/L1E/ticket-booking/ticket-booking-backend',
  collectCoverageFrom: [
    'src/resolvers/**/*.ts',
    '!src/**/*.schema.ts', 
    '!src/**/index.ts', 
    '!src/handler.ts', 
    '!src/schemas/**'
  ],
  maxWorkers: 1,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
