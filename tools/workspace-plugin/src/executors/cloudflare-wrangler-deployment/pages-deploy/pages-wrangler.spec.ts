import { ExecutorContext } from '@nx/devkit';
import { runWranglerCommandForProject } from './pages-wrangler';

jest.mock('nx/src/generators/tree', () => ({
  FsTree: jest.fn().mockReturnValue(''),
}));

jest.mock('@nx/devkit', () => ({
  joinPathFragments: jest.fn().mockReturnValue('./'),
  readProjectConfiguration: jest.fn().mockReturnValue({ root: '' }),
}));

jest.mock('dotenv', () => ({
  config: jest.fn().mockResolvedValue({ CLOUDFLARE_ACCOUNT_ID: 'value', CLOUDFLARE_API_TOKEN: 'value' }),
}));

jest.mock('child_process', () => {
  return {
    execSync: jest.fn(),
  };
});

describe('deploy pages wrangler', () => {
  it('should execute with ', async () => {
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

    const result = await runWranglerCommandForProject(
      {
        branch: 'main',
        env: { CLOUDFLARE_ACCOUNT_ID: 'value', CLOUDFLARE_API_TOKEN: 'value' },
      },
      context
    );

    expect(result).toEqual({ success: true });
  });
});
