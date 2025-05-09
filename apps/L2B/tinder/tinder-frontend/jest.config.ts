/* eslint-disable */
export default {
  displayName: 'Tinder-frontend-2025-2B',
  preset: '../../../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/next/babel'], babelrc: false }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/apps/L2B/tinder/tinder-frontend',
  collectCoverageFrom: [
    '!src/app/**/*.{ts,tsx,js,jsx}',
    'src/app/**/_components/**/*.tsx',
    'src/app/**/components/*.tsx',
    'src/app/**/_components/*.tsx',
    '!src/app/**/_features/**/*.tsx',
    '!src/**/generated/**/*.ts',
    '!src/components/providers/*.tsx',
  ],
};
