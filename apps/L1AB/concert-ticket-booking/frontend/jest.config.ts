/* eslint-disable */
export default {
  displayName: 'ticket-frontend',
  preset: '../../../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/next/babel'], babelrc: false }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/apps/L1AB/concert-ticket-booking/frontend',
  collectCoverageFrom: ['src/**/**/*.{ts,tsx,js,jsx}', '!src/**/generated/**/*.ts', '!src/app/**/*.tsx', '!src/components/providers/*.tsx'],
};
