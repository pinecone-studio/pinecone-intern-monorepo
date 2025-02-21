/* eslint-disable */
export default {
  displayName: 'real-state-frontend',
  preset: '../../../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/next/babel'], babelrc: false }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/apps/L1FG/real-state/frontend',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx,js,jsx}',
    '!src/**/generated/**/*.ts',
    '!src/app/**/*.tsx',
    '!src/components/providers/*.tsx',
    '!src/constants/*.ts',
    '!src/components/ui/icon/*.tsx',
    '!src/middleware.ts',
    '!src/features/card/*.{ts,tsx,js,jsx}',
    '!src/components/adminSinglePage/AdminSideInfo.tsx',
  ],
};
