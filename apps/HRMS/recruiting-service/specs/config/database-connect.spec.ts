import { connectToDatabase, connection } from '@/config/database-connect';
import mongoose from 'mongoose';

jest.mock('mongoose', () => ({
  connect: jest.fn(),
}));

describe('connectDatabase', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    connection.isConnected = 0;
  });

  it('1. should call connectToDatabase', async () => {
    (mongoose.connect as jest.Mock).mockResolvedValue({ connections: [{ readyState: 1 }] });
    await connectToDatabase();
    expect(mongoose.connect);
  });

  it('2. Should not reconnect mongodb once connected', async () => {
    connection.isConnected = 1;
    await connectToDatabase();
    expect(connection.isConnected).toBe(1);
    expect(mongoose.connect).not.toHaveBeenCalled();
  });
  it('3. Should handle error', async () => {
    (mongoose.connect as jest.Mock).mockRejectedValue(new Error(''));
    try {
      await connectToDatabase();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});
