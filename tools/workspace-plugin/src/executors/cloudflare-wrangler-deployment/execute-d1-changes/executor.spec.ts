import { execSync } from 'child_process';
import executeD1Changes from './executor';

jest.mock('child_process');

jest.mock('chalk', () => ({
  ...jest.requireActual('chalk'),
  yellow: jest.fn((msg) => msg),
  green: jest.fn((msg) => msg),
  red: jest.fn((msg) => msg),
  cyan: jest.fn((msg) => msg),
  bold: jest.fn((msg) => msg),
}));

describe('executeD1Changes', () => {
  const mockArgs = {
    name: 'name',
  };
  const mockCtx = {
    projectName: 'sample-pages',
    workspace: {
      version: 1,
      projects: {
        'sample-pages': {
          root: 'apps/sample-pages',
        },
      },
    },
    root: '',
    cwd: '',
    isVerbose: false,
  };
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('1. should execute successfully', () => {
    (execSync as jest.Mock).mockReturnValueOnce('apps/sample-pages/0.sql');
    executeD1Changes(mockArgs, mockCtx);
  });
  it('2. should exit if no SQL files are found', () => {
    (execSync as jest.Mock).mockReturnValue('');

    const logSpy = jest.spyOn(console, 'log').mockImplementation();

    const exitSpy = jest.spyOn(process, 'exit').mockImplementation();

    executeD1Changes({ name: 'test-database' }, mockCtx);

    expect(logSpy).toHaveBeenCalledWith('Not found any sql migration files.');
    expect(exitSpy).toHaveBeenCalledWith(0);

    logSpy.mockRestore();
    exitSpy.mockRestore();
  });
  it('3. should handle error during SQL file execution', async () => {
    (execSync as jest.Mock).mockReturnValueOnce(Buffer.from('apps/sample-pages/0.sql')).mockImplementationOnce(() => {
      throw new Error('Wrangler execution failed');
    });

    const logSpy = jest.spyOn(console, 'log').mockImplementation();
    const errorSpy = jest.spyOn(console, 'error').mockImplementation();

    await expect(executeD1Changes(mockArgs, mockCtx)).resolves.toEqual({ success: true });

    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('There is error during executing apps/sample-pages/0.sql on name database'));
    expect(errorSpy).toHaveBeenCalledWith(expect.any(Error));

    logSpy.mockRestore();
    errorSpy.mockRestore();
  });
});
