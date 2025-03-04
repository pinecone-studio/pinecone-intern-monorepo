/* eslint-disable max-nested-callbacks */
import fs from 'fs';
import runExecutor, { ConvertCsvToSqlOptions, ensureDirectoryExists, readCsvFile } from './executor';

jest.mock('fs', () => ({
  ...jest.requireActual('fs'),
  existsSync: jest.fn(),
  mkdirSync: jest.fn(),
  readFileSync: jest.fn(),
  promises: {
    mkdir: jest.fn(),
    writeFile: jest.fn(),
  },
}));

jest.mock('csv-parse', () => {
  const originalModule = jest.requireActual('csv-parse');
  return {
    ...originalModule,
    parse: jest.fn().mockImplementation((input, options, callback) => {
      const data = [
        {
          resource: 'Resource1',
          owner: 'Owner1',
          code: 'Code1',
          severity: 1,
          message: 'Message1',
          source: 'Source1',
          startLineNumber: 1,
          startColumn: 1,
          endLineNumber: 2,
          endColumn: 2,
        },
      ];
      const Parser = originalModule.parse;
      const parser = new Parser(options, callback);
      process.nextTick(() => parser.write(input));

      process.nextTick(() => {
        parser.end();
        callback(null, data);
      });

      return parser;
    }),
  };
});

describe('executor', () => {
  const options: ConvertCsvToSqlOptions = {
    inputCsvPath: 'path/to/input.csv',
    outputSqlPath: 'path/to/output.sql',
    tableName: 'test_table',
  };

  describe('ensureDirectoryExists', () => {
    it('should create directory if it does not exist', async () => {
      const directoryPath = 'path/to';
      (fs.existsSync as jest.Mock).mockReturnValue(false);
      await ensureDirectoryExists(options.outputSqlPath);
      expect(fs.existsSync).toHaveBeenCalledWith(directoryPath);
      expect(fs.promises.mkdir).toHaveBeenCalledWith(directoryPath, { recursive: true });
    });
  });

  describe('readCsvFile', () => {
    beforeEach(() => {
      jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should handle errors thrown during file reading', async () => {
      const inputCsvPath = 'path/to/nonexistent.csv';
      (fs.readFileSync as jest.Mock).mockImplementationOnce(() => {
        throw new Error('File read error');
      });

      await expect(readCsvFile(inputCsvPath)).rejects.toThrow('File read error');
      expect(console.log).toHaveBeenCalledWith('Error during file reading or CSV parsing:', expect.any(Error));
    });
  });

  describe('runExecutor', () => {
    beforeEach(() => {
      (fs.readFileSync as jest.Mock).mockReturnValue(
        'resource,owner,code,severity,message,source,startLineNumber,startColumn,endLineNumber,endColumn\nResource1,Owner1,Code1,1,Message1,Source1,1,1,2,2'
      );
    });

    it('should process CSV and generate SQL successfully', async () => {
      const result = await runExecutor(options);
      expect(result.success).toBe(true);
      expect(fs.promises.writeFile).toHaveBeenCalledWith(options.outputSqlPath, expect.stringContaining('INSERT INTO test_table'));
    });

    it('should return failure if there is an error reading the CSV file', async () => {
      (fs.readFileSync as jest.Mock).mockImplementation(() => {
        throw new Error('Failed to read file');
      });

      const errorOptions = {
        inputCsvPath: '',
        outputSqlPath: 'path/to/output.sql',
        tableName: 'test_table',
      };

      const result = await runExecutor(errorOptions);
      expect(result.success).toBe(false);
    });

    it('should return failure if there is an error writing the SQL file', async () => {
      (fs.promises.writeFile as jest.Mock).mockImplementation(() => {
        throw new Error('Failed to write file');
      });
      const result = await runExecutor(options);
      expect(result.success).toBe(false);
    });
  });
});
