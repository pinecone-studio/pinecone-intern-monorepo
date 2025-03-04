import deployExecutor from './deploy/executor';
import putSecretsExecutor from './put-secrets/executor';
import serveExecutor from './serve/executor';
import buildExecutor from './wrangler-build/executor';

jest.mock('fs/promises');

describe('Wrangler', () => {
  const projectName = 'orange-service';
  const context = {
    root: 'orange-mock',
    projectName: projectName,
    targetName: 'orange-mock',
    configurationName: 'orange-mock',
    cwd: 'orange-mock',
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

  it('Should return success true for put-secrets', async () => {
    const result = await putSecretsExecutor({ command: 'echo' }, context);
    expect(result['success']).toBe(true);
  });
});
