/* eslint-disable */
export default {
  displayName: 'instagram-frontend',
  preset: '../../../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/next/babel'], babelrc: false }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/apps/L1FG/instagram/frontend',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx,js,jsx}',
    '!src/**/generated/**/*.ts',
    '!src/app/**/*.tsx',
    '!src/components/providers/*.tsx',
    '!src/**/mock.ts',
    '!src/components/svg/**/*.{ts,tsx,js,jsx}',
    '!src/components/home/main/PostLike.tsx',
    '!src/components/home-post/Post.tsx',
    '!src/features/**/*.{ts,tsx,js,jsx}',
  ],
};
