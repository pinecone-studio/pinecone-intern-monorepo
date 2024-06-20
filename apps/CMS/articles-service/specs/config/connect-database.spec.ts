import { connect } from 'mongoose';
import { connectToDatabase } from '@/config/connect-database';

jest.mock('mongoose', () => ({
  connect: jest.fn(),
}));

describe('connectToDatabase', () => {
  let consoleLogSpy: jest.SpyInstance;
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

    originalEnv = process.env;
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    process.env = originalEnv;
    jest.clearAllMocks();
  });

  it('should log an error if MONGODB_URI is not set', async () => {
    delete process.env.MONGODB_URI;

    await connectToDatabase();

    expect(consoleLogSpy).toHaveBeenCalledWith('MONGODB_URI environment variable not found. Please set it to your MongoDB connection string.');
  });

  it('should connect to the database if MONGODB_URI is set', async () => {
    process.env.MONGODB_URI = 'mongodb://localhost:27017/test';

    await connectToDatabase();

    expect(connect).toHaveBeenCalledWith('mongodb://localhost:27017/test');
    expect(consoleLogSpy).toHaveBeenCalledWith('Connected to MongoDB database successfully!');
  });

  it('should log connection error messages', async () => {
    process.env.MONGODB_URI = 'mongodb://localhost:27017/test';
    const errorMessage = 'Connection error';
    (connect as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(connectToDatabase()).rejects.toThrow(errorMessage);

    expect(consoleLogSpy).toHaveBeenCalledWith('Connection failed:', errorMessage);
  });

  it('should log unexpected errors', async () => {
    process.env.MONGODB_URI = 'mongodb://localhost:27017/test';
    const unexpectedError = { some: 'error' };
    (connect as jest.Mock).mockRejectedValue(unexpectedError);

    await expect(connectToDatabase()).rejects.toEqual(unexpectedError);

    expect(consoleLogSpy).toHaveBeenCalledWith('Unexpected error:', unexpectedError);
  });
});
