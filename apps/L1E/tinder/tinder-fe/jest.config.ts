/* eslint-disable */
export default {
  displayName: 'tinder-fe',
  preset: '../../../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/next/babel'], babelrc: false }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/apps/L1E/tinder/tinder-fe',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx,js,jsx}',
    '!src/**/generated/**/*.ts',
    '!src/components/profile/Profile.tsx',
    '!src/components/profile/MainSection.tsx',
    '!src/app/**/*.tsx',
    '!src/components/providers/*.tsx',
    '!src/components/**/SwipeCards.tsx',
    '!src/components/chat/GetChat.tsx',
    '!src/components/chat/MainChat.tsx',
    '!src/components/chat/Matches.tsx',
    '!src/components/chat/ProfileCarousel.tsx',
  ],
};
