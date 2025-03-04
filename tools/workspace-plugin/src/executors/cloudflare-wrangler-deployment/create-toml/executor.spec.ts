import { ExecutorContext } from '@nx/devkit';
import fs from 'fs/promises';
import createToml, { getTomlFile } from './executor';

jest.mock('@nx/devkit', () => ({
  joinPathFragments: jest.fn(),
  readProjectConfiguration: jest.fn().mockReturnValue({ root: {} }),
}));

jest.mock('fs/promises');

jest.mock('dotenv', () => ({
  config: jest.fn(),
}));

describe('getTomlFile', () => {
  it('should get source toml file (Testing)', () => {
    const sourceFile = getTomlFile('Testing');
    expect(sourceFile).toBe('wrangler.testing.toml');
  });
  it('should get source toml file (Development)', () => {
    const sourceFile = getTomlFile('Development');
    expect(sourceFile).toBe('wrangler.dev.toml');
  });
  it('should get source toml file (Production)', () => {
    const sourceFile = getTomlFile('Production');
    expect(sourceFile).toBe('wrangler.prod.toml');
  });
});

describe('createToml', () => {
  it('should return true output', async () => {
    const mockContext = {
      projectName: 'test-project',
      root: '/root',
      target: { executor: 'run' },
      workspace: {
        projects: {
          'test-project': {
            targets: {
              build: {
                options: {
                  outputPath: 'dist/test-project',
                },
              },
            },
          },
        },
      },
    } as unknown as ExecutorContext;

    const result = await createToml({ env: 'Testing' }, mockContext);
    expect(fs.copyFile).toBeCalledWith(undefined, undefined);
    expect(result.success).toBe(true);
  });
});
