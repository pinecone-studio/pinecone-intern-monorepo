/* eslint-disable */
export default {
  displayName: 'real-estate-frontend',
  preset: '../../../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/next/babel'], babelrc: false }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/apps/L2A/real-estate/real-estate-frontend',
  collectCoverageFrom: ['src/**/*.{ts,tsx,js,jsx}', '!src/**/generated/**/*.ts', '!src/app/**/*.tsx', '!src/components/providers/*.tsx'],
};
