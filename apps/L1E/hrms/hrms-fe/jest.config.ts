/* eslint-disable */
export default {
  displayName: 'hrms-fe',
  preset: '../../../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/next/babel'], babelrc: false }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/apps/L1E/hrms/hrms-fe',
  collectCoverageFrom: ['src/**/*.{ts,tsx,js,jsx}', '!src/**/generated/**/*.ts', '!src/app/**/*.tsx', '!src/components/providers/*.tsx'],
};