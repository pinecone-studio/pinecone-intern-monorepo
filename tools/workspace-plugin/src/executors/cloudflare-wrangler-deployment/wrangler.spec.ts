import deployExecutor from './deploy/executor';
import serveExecutor from './serve/executor';
import buildExecutor from './wrangler-build/executor';

jest.mock('fs/promises');

describe('Wrangler', () => {
  const projectName = 'example-backend';
  const context = {
    root: 'example-mock',
    projectName: projectName,
    targetName: 'example-mock',
    configurationName: 'example-mock',
    cwd: 'example-mock',
    isVerbose: true,
  };
  it('Should return success true for build', async () => {
    const result = await buildExecutor({ command: 'echo' }, context);
    expect(result['success']).toBe(true);
  });

  it('Should return success true for deploy', async () => {
    const result = await deployExecutor({ command: 'echo' }, context);
    expect(result['success']).toBe(true);
  });

  it('Should return success true for serve', async () => {
    const result = await serveExecutor({ command: 'echo' }, context);
    expect(result['success']).toBe(true);
  });
});
