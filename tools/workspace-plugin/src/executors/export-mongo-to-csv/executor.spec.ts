/* eslint-disable no-secrets/no-secrets */
import { createObjectCsvWriter } from 'csv-writer';
import dotenv from 'dotenv';
import fs from 'fs';
import { MongoClient } from 'mongodb';
import path from 'path';
import runExecutor from './executor';

jest.mock('mongodb');
jest.mock('fs', () => ({
  promises: {
    readFile: jest.fn(),
  },
  existsSync: jest.fn(),
  mkdirSync: jest.fn(),
}));
jest.mock('path');
jest.mock('csv-writer');
jest.mock('dotenv');

describe('runExecutor', () => {
  const mockOptions = {
    databaseName: 'testDb',
    collectionName: 'testCollection',
    outputPath: '/test/output.csv',
    filePath: '/test/.env',
  };

  const mockMongoUri = 'mongodb://localhost:27017';
  const mockData = [{ id: 1, name: 'Test' }];

  beforeEach(() => {
    (fs.promises.readFile as jest.Mock).mockResolvedValue('MONGO_URI=mongodb://localhost:27017');
    (path.resolve as jest.Mock).mockReturnValue('/resolved/path');
    (path.dirname as jest.Mock).mockReturnValue('/test');
    (fs.existsSync as jest.Mock).mockReturnValue(false);
    (dotenv.parse as jest.Mock).mockReturnValue({ MONGO_URI: mockMongoUri });
    jest.spyOn(console, 'warn').mockImplementation();
    jest.spyOn(console, 'error').mockImplementation();
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should successfully export data to CSV', async () => {
    const mockClient = setupMockClient(mockData);
    const mockCsvWriter = setupMockCSVWriter();

    const result = await runExecutor(mockOptions);

    expect(result).toEqual({ success: true });
    expectMocksToHaveBeenCalled(mockClient, mockCsvWriter, mockData);
  });

  it('should handle empty data array', async () => {
    const mockClient = setupMockClient([]);
    const mockCsvWriter = setupMockCSVWriter();

    (fs.existsSync as jest.Mock).mockReturnValue(true);

    const result = await runExecutor(mockOptions);

    expect(result).toEqual({ success: true });
    expect(mockCsvWriter.writeRecords).toHaveBeenCalledWith([]);
    expect(createObjectCsvWriter).toHaveBeenCalledWith({
      path: mockOptions.outputPath,
      header: [],
    });
    expect(mockClient.close).toHaveBeenCalled();
  });

  it('should log a warning for empty data', async () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();

    await runExecutor(mockOptions);

    expect(consoleSpy).toHaveBeenCalledWith('No data available, or the collection or database name might be incorrect');
    consoleSpy.mockRestore();
  });

  it('should handle database connection error', async () => {
    (MongoClient as unknown as jest.Mock).mockImplementation(() => ({
      connect: jest.fn().mockRejectedValue(new Error('Connection failed')),
    }));

    const result = await runExecutor(mockOptions);

    expect(result).toEqual({ success: false });
  });
  it('should handle file read error', async () => {
    (fs.promises.readFile as jest.Mock).mockImplementation(() => {
      throw new Error('File read error');
    });

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    const result = await runExecutor(mockOptions);

    expect(result).toEqual({ success: false });
    expect(consoleErrorSpy).toHaveBeenCalledWith("An error occurred in 'runExecutor' during 'exportToCsv' operation.", expect.objectContaining({ message: 'File read error' }));

    consoleErrorSpy.mockRestore();
  });

  const setupMockClient = (data) => {
    const mockClient = {
      connect: jest.fn(),
      db: jest.fn().mockReturnValue({
        collection: jest.fn().mockReturnValue({
          find: jest.fn().mockReturnValue({
            toArray: jest.fn().mockResolvedValue(data),
          }),
        }),
      }),
      close: jest.fn(),
    };

    (MongoClient as unknown as jest.Mock).mockImplementation(() => mockClient);
    return mockClient;
  };

  const setupMockCSVWriter = () => {
    const mockCsvWriter = {
      writeRecords: jest.fn().mockResolvedValue(undefined),
    };
    (createObjectCsvWriter as jest.Mock).mockReturnValue(mockCsvWriter);
    return mockCsvWriter;
  };

  const expectMocksToHaveBeenCalled = (mockClient, mockCsvWriter, mockData) => {
    expect(MongoClient).toHaveBeenCalledWith(mockMongoUri);
    expect(mockClient.connect).toHaveBeenCalled();
    expect(mockClient.db).toHaveBeenCalledWith('testDb');
    expect(fs.mkdirSync).toHaveBeenCalledWith('/test', { recursive: true });
    expect(mockCsvWriter.writeRecords).toHaveBeenCalledWith(mockData);
    expect(mockClient.close).toHaveBeenCalled();
  };
});
