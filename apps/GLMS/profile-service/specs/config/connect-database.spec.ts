import { connectToDatabase } from '@/config/connect-database';
import mongoose from 'mongoose';

jest.mock('mongoose', () => ({
  connect: jest.fn(),
}));

describe('connectToDatabase', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should connect to the database successfully', async () => {
    (mongoose.connect as jest.Mock).mockResolvedValue({ connections: [{ readyState: 1 }] });
    process.env.MONGODB_URI = 'valid_connection_string';
  
    await connectToDatabase();
  
    expect(mongoose.connect).toHaveBeenCalledTimes(1); 
    expect(mongoose.connect).toHaveBeenCalledWith('valid_connection_string');
    expect(console.log).toHaveBeenCalledWith('Connected to MongoDB database successfully!');
  });

  it('should handle missing MONGODB_URI environment variable', async () => {
    process.env.MONGODB_URI = undefined;

    await expect(connectToDatabase()).rejects.toThrowError(
      'MONGODB_URI environment variable not found. Please set it to your MongoDB connection string.'
    );
  });

  it('should handle connection errors', async () => {
    (mongoose.connect as jest.Mock).mockRejectedValue(new Error('Connection error'));
    process.env.MONGODB_URI = 'valid_connection_string';
  
    await expect(connectToDatabase()).rejects.toThrowError('Connection error');
  
    expect(console.log).toHaveBeenCalledWith('Connection failed:', 'Connection error');
  });
});