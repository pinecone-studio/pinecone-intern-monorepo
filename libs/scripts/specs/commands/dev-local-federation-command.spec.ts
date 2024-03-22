import * as copyFile from '../../src/utils/commands/federation/copy-dev-to-local-env';
import * as executeServices from '../../src/utils/commands/federation/run-selected-services';
import * as runDevLocalCommandOnFederation from './../../src/commands/dev-local-federation-command';

jest.mock('../../src/utils/commands/federation/run-selected-services');

describe('runDevLocalCommandOnFederation', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('1. Should handle error during runDevLocalCommandOnFederation', async () => {
    const error = new Error('File copying error');
    const mockCopyFile = jest.spyOn(copyFile, 'copyDevToLocalEnv');
    mockCopyFile.mockImplementation(() => {
      throw error;
    });

    const exitProcessSpy = jest.spyOn(process, 'exit').mockImplementation();

    const mockExecuteServices = jest.spyOn(
      executeServices,
      'runSelectedServices'
    );
    mockExecuteServices.mockImplementation();

    await runDevLocalCommandOnFederation.runDevLocalCommandOnFederation();

    expect(exitProcessSpy).toHaveBeenCalledWith(1);
    exitProcessSpy.mockRestore();
  });
});
