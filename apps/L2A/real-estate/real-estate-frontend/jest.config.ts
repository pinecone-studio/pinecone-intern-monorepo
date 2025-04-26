
export default {
  displayName: 'real-estate-frontend',
  preset: '../../../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/next/babel'], babelrc: false }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/apps/L2A/real-estate/real-estate-frontend',
  collectCoverageFrom: [
    '!src/app/**/*.{ts,tsx,js,jsx}',
    'src/app/**/_components/**/*.tsx',
    'src/app/**/components/*.tsx',
    'src/app/**/_components/*.tsx',
    '!src/app/**/_features/**/*.tsx',
    '!src/**/generated/**/*.ts',
    '!src/components/providers/*.tsx',
  ],

    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

 
};
