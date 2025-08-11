/* eslint-disable */
module.exports = {
  displayName: 'tinder-frontend',
  preset: '../../../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/next/babel'], babelrc: false }],
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/apps/L1G/tinder/tinder-frontend',
  collectCoverageFrom: ['src/**/*.{ts,tsx,js,jsx}', '!src/**/generated/**/*.ts', '!src/app/**/*.tsx', '!src/components/providers/ApolloWrapper.tsx'],
};
