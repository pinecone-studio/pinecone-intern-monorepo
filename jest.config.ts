import { getJestProjects } from '@nx/jest';

export default {
  projects: getJestProjects(),
  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.ts', 
  ],
};
