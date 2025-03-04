import chalk from 'chalk';
import { execSync } from 'child_process';
import fs from 'fs';
import seedLocalExecutor from './executor';
import { SeedLocalExecutorSchema } from './schema';

jest.mock('child_process');
jest.mock('fs');

describe('seedLocalExecutor', () => {
  let options: SeedLocalExecutorSchema;

  beforeEach(() => {
    options = {
      dbName: 'local-db',
      tomlPath: './path/to/wrangler.toml',
    };

    jest.clearAllMocks();
  });

  it('should execute all commands in the correct order', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    (execSync as jest.Mock).mockImplementation(() => {});
    (fs.unlinkSync as jest.Mock).mockImplementation(() => {});

    const result = await seedLocalExecutor(options);

    expect(result).toEqual({ success: true });

    expect(consoleSpy).toHaveBeenCalledWith(chalk.green('Starting seed local database process...'));
    expect(consoleSpy).toHaveBeenCalledWith(chalk.yellow('Backing up remote database...'));
    expect(execSync).toHaveBeenCalledWith(expect.stringMatching(/^npx wrangler d1 export local-db --remote --output=cache\/.*\.sql$/), expect.any(Object));
    expect(consoleSpy).toHaveBeenCalledWith(chalk.yellow('Restoring local database...'));
    expect(execSync).toHaveBeenCalledWith(expect.stringMatching(/^npx wrangler d1 execute local-db --local --config=\.\/path\/to\/wrangler\.toml --file=cache\/.*\.sql$/), expect.any(Object));
    expect(consoleSpy).toHaveBeenCalledWith(chalk.yellow('Cleaning up SQL backup file...'));
    expect(fs.unlinkSync).toHaveBeenCalledWith(expect.stringMatching(/^cache\/.*\.sql$/));
    expect(consoleSpy).toHaveBeenCalledWith(chalk.green('Seed local database process completed successfully!'));

    consoleSpy.mockRestore();
  });

  it('should clean up SQL file after execution', async () => {
    (execSync as jest.Mock).mockImplementation(() => {});
    (fs.unlinkSync as jest.Mock).mockImplementation(() => {});

    await seedLocalExecutor(options);

    expect(fs.unlinkSync).toHaveBeenCalledWith(expect.stringMatching(/^cache\/.*\.sql$/));
  });

  it('should log progress for each step', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    (execSync as jest.Mock).mockImplementation(() => {});
    (fs.unlinkSync as jest.Mock).mockImplementation(() => {});

    await seedLocalExecutor(options);

    expect(consoleSpy).toHaveBeenCalledWith(chalk.green('Starting seed local database process...'));
    expect(consoleSpy).toHaveBeenCalledWith(chalk.yellow('Backing up remote database...'));
    expect(consoleSpy).toHaveBeenCalledWith(chalk.yellow('Restoring local database...'));
    expect(consoleSpy).toHaveBeenCalledWith(chalk.yellow('Cleaning up SQL backup file...'));
    expect(consoleSpy).toHaveBeenCalledWith(chalk.green('Seed local database process completed successfully!'));

    consoleSpy.mockRestore();
  });

  it('should throw an error if a command fails', async () => {
    const error = new Error('Command failed');
    (execSync as jest.Mock).mockImplementation(() => {
      throw error;
    });

    await expect(seedLocalExecutor(options)).rejects.toThrow(error);
  });
});
