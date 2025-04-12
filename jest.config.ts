import { getJestProjects } from '@nx/jest';

export default {
  projects: getJestProjects(),
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
};
