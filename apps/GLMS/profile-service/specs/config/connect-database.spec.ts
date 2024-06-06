// import { connectToDatabase } from '@/config/connect-database';
// import mongoose from 'mongoose';

// jest.mock('mongoose', () => ({
//   connect: jest.fn(),
// }));

// describe('connectToDatabase', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it('should connect to the database successfully', async () => {
//     (mongoose.connect as jest.Mock).mockResolvedValue({ connections: [{ readyState: 1 }] });
//     process.env.MONGODB_URI = 'valid_connection_string';
  
//     await connectToDatabase();
  
//     expect(mongoose.connect).toHaveBeenCalledTimes(1); 
//     expect(mongoose.connect).toHaveBeenCalledWith('valid_connection_string');
//     expect(console.log).toHaveBeenCalledWith('Connected to MongoDB database successfully!');
//   });

//   it('should handle missing MONGODB_URI environment variable', async () => {
//     process.env.MONGODB_URI = undefined;

//     await expect(connectToDatabase()).rejects.toThrowError(
//       'MONGODB_URI environment variable not found. Please set it to your MongoDB connection string.'
//     );
//   });

//   it('should handle connection errors', async () => {
//     (mongoose.connect as jest.Mock).mockRejectedValue(new Error('Connection error'));
//     process.env.MONGODB_URI = 'valid_connection_string';
  
//     await expect(connectToDatabase()).rejects.toThrowError('Connection error');
  
//     expect(console.log).toHaveBeenCalledWith('Connection failed:', 'Connection error');
//   });
// });

// connectToDatabase.test.ts
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

    expect(consoleLogSpy).toHaveBeenCalledWith(
      'MONGODB_URI environment variable not found. Please set it to your MongoDB connection string.'
    );
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
