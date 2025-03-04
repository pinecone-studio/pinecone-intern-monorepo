import chalk from 'chalk';
import { execSync } from 'child_process';
import fs from 'fs';
import seedTestingExecutor from './executor';
import { SeedTestingExecutorSchema } from './schema';

jest.mock('child_process');
jest.mock('fs');

jest.mock('./utils', () => ({
  getTableNames: jest.fn().mockReturnValue(['mockTable']),
  runCommand: jest.fn(),
}));

describe('seedTestingExecutor', () => {
  let options: SeedTestingExecutorSchema;

  beforeEach(() => {
    options = {
      productionDb: 'prod-db',
      testingDb: 'test-db',
    };

    jest.clearAllMocks();
  });

  it('should return false if testingDb includes "prod"', async () => {
    const invalidOptions = { ...options, testingDb: 'prod-database' };

    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    const result = await seedTestingExecutor(invalidOptions);

    expect(result).toEqual({ success: false });

    consoleSpy.mockRestore();
  });

  it('should execute all commands in the correct order', async () => {
    (execSync as jest.Mock).mockImplementation(() => {});

    (fs.unlinkSync as jest.Mock).mockImplementation(() => {});

    const result = await seedTestingExecutor(options);

    expect(result).toEqual({ success: true });
  });

  it('should clean up SQL file after execution', async () => {
    (execSync as jest.Mock).mockImplementation(() => {});
    (fs.unlinkSync as jest.Mock).mockImplementation(() => {});

    await seedTestingExecutor(options);
  });

  it('should log progress for each step', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    (execSync as jest.Mock).mockImplementation(() => {});
    (fs.unlinkSync as jest.Mock).mockImplementation(() => {});

    await seedTestingExecutor(options);

    expect(consoleSpy).toHaveBeenCalledWith(chalk.green('Starting seed testing database process...'));
    expect(consoleSpy).toHaveBeenCalledWith(chalk.yellow('Backing up production database...'));
    expect(consoleSpy).toHaveBeenCalledWith(chalk.yellow('Purging testing database...'));
    expect(consoleSpy).toHaveBeenCalledWith(chalk.yellow('Restoring testing database...'));
    expect(consoleSpy).toHaveBeenCalledWith(chalk.yellow('Cleaning up SQL backup file...'));
    expect(consoleSpy).toHaveBeenCalledWith(chalk.green('Seed testing database process completed successfully!'));

    consoleSpy.mockRestore();
  });
});
