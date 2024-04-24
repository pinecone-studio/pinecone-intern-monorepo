import mongoose from 'mongoose';
import { connectToDatabase, connection } from '@/config/database-connect';

jest.mock('mongoose', () => ({
  connect: jest.fn(),
}));

describe('connectToDatabase', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    connection.isConnected = 0;
  });

  it('1. Should connect to database', async () => {
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
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
});
