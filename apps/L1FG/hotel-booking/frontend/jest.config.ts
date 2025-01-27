/* eslint-disable */
export default {
  displayName: 'hotel-booking-frontend',
  preset: '../../../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/next/babel'], babelrc: false }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/apps/L1FG/hotel-booking/frontend',
  collectCoverageFrom: [
    'src/app/_components/**/*.{ts,tsx,js,jsx}',
    'src/components/**/*.{ts,tsx,js,jsx}',
    '!src/**/generated/**/*.ts',
    '!src/app/**/*.tsx',
    '!src/components/providers/*.tsx',
    '!src/features/**/*.tsx',
  ],
};
