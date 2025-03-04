import { ExecutorContext } from '@nx/devkit';
import deployExecutor from './executor';

jest.mock('nx/src/generators/tree', () => ({
  FsTree: jest.fn().mockReturnValue(''),
}));

jest.mock('@nx/devkit', () => ({
  joinPathFragments: jest.fn().mockReturnValue('./'),
  readProjectConfiguration: jest.fn().mockReturnValue({ root: '' }),
}));

jest.mock('dotenv', () => ({
  config: jest.fn().mockReturnValue({ parsed: { CLOUDFLARE_ACCOUNT_ID: 'value', CLOUDFLARE_API_TOKEN: 'value' } }),
}));

jest.mock('child_process', () => {
  return {
    execSync: jest.fn().mockReturnValue('123'),
  };
});

describe('deployExecutor', () => {
  it('should call joinPathFragments with correct arguments', async () => {
    delete process.env.GITHUB_HEAD_REF;

    const context = {
      workspace: {
        projects: {
          myProject: {
            targets: {
              build: {
                options: {
                  outputPath: 'apps/my-project',
                },
              },
            },
          },
        },
      },
      projectName: 'myProject',
      root: '',
    } as unknown as ExecutorContext;

    await deployExecutor({}, context);
  });
  it('should call joinPathFragments with correct arguments on github action', async () => {
    process.env.GITHUB_HEAD_REF = '1234-branch';

    const context = {
      workspace: {
        projects: {
          myProject: {
            targets: {
              build: {
                options: {
                  outputPath: 'apps/my-project',
                },
              },
            },
          },
        },
      },
      projectName: 'myProject',
      root: '',
    } as unknown as ExecutorContext;

    await deployExecutor({}, context);
  });
});
