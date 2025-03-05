import { ExecutorContext, joinPathFragments } from '@nx/devkit';
import chalk from 'chalk';
import { execSync } from 'child_process';
import fs from 'fs';
import inquirer from 'inquirer';
import path from 'path';
import migrateD1, { getSqlFiles } from './executor';
import { MigrateD1ExecutorSchema } from './schema';

jest.mock('@nx/devkit', () => ({
  joinPathFragments: jest.fn(),
  readProjectConfiguration: jest.fn().mockReturnValue({ root: {} }),
}));

jest.mock('fs');
jest.mock('path', () => ({
  extname: jest.fn((file: string) => `.${file.split('.').pop()}`),
}));
jest.mock('child_process');
jest.mock('inquirer');

describe('getSqlFiles', () => {
  it('should return only .sql files from the directory', () => {
    // Mock data
    const mockFiles = ['file1.sql', 'file2.txt', 'file3.sql', 'file4.js'];

    // Mock implementation of fs.readdirSync
    (fs.readdirSync as jest.Mock).mockReturnValue(mockFiles);

    // Mock implementation of path.extname
    (path.extname as jest.Mock).mockImplementation((file: string) => {
      return file.split('.').pop() ? `.${file.split('.').pop()}` : '';
    });

    const result = getSqlFiles('/mock-directory');

    expect(fs.readdirSync).toHaveBeenCalledWith('/mock-directory');
    expect(result).toEqual(['file1.sql', 'file3.sql']);
  });

  it('should return an empty array if no .sql files are present', () => {
    const mockFiles = ['file1.txt', 'file2.js'];

    (fs.readdirSync as jest.Mock).mockReturnValue(mockFiles);

    const result = getSqlFiles('/mock-directory');

    expect(result).toEqual([]);
  });

  it('should return an empty array if directory is empty', () => {
    (fs.readdirSync as jest.Mock).mockReturnValue([]);

    const result = getSqlFiles('/mock-directory');

    expect(result).toEqual([]);
  });
});

describe('migrateD1', () => {
  let context: ExecutorContext;
  let options: MigrateD1ExecutorSchema;

  beforeEach(() => {
    context = {
      projectName: 'test-project',
      workspace: {
        projects: {
          'test-project': {
            root: 'test-project',
          },
        },
      },
    } as unknown as ExecutorContext;

    options = {
      name: 'test-database',
      directory: 'sql',
    };
  });

  it('should execute SQL migration with selected file', async () => {
    const mockProjectPath = '/mock/test-project';
    const mockSqlFiles = ['migration1.sql', 'migration2.sql'];

    (joinPathFragments as jest.Mock).mockReturnValue(mockProjectPath);
    (fs.readdirSync as jest.Mock).mockReturnValue(mockSqlFiles);

    (inquirer.prompt as jest.Mock).mockResolvedValueOnce({ selectedFile: 'migration1.sql' });
    (inquirer.prompt as jest.Mock).mockResolvedValueOnce({ finalName: 'final-database' });

    const result = await migrateD1(options, context);

    expect(joinPathFragments).toHaveBeenCalledWith('test-project');
    expect(fs.readdirSync).toHaveBeenCalledWith(`${mockProjectPath}/sql`);
    expect(inquirer.prompt).toHaveBeenCalledTimes(2);
    expect(execSync).toHaveBeenCalledWith(`npx wrangler d1 execute final-database --local --file=/mock/test-project/sqlmigration1.sql --config=/mock/test-project/wrangler.toml --yes`);
    expect(result).toEqual({ success: true });
  });

  it('should exit if no SQL files are found', async () => {
    const mockProjectPath = '/mock/test-project';

    (joinPathFragments as jest.Mock).mockReturnValue(mockProjectPath);
    (fs.readdirSync as jest.Mock).mockReturnValue([]);

    const exitSpy = jest.spyOn(process, 'exit').mockImplementation(() => {
      throw new Error('process.exit');
    });
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    await expect(migrateD1(options, context)).rejects.toThrow('process.exit');

    expect(joinPathFragments).toHaveBeenCalledWith('test-project');
    expect(fs.readdirSync).toHaveBeenCalledWith(`${mockProjectPath}/sql`);
    expect(consoleSpy).toHaveBeenCalledWith(chalk.red('No SQL files found in the directory.'));
    expect(exitSpy).toHaveBeenCalledWith(1);

    exitSpy.mockRestore();
    consoleSpy.mockRestore();
  });
});
