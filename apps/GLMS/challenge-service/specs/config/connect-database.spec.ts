import mongoose from 'mongoose';
import { connectDatabase, connection } from '../../src/config/connect-database';

jest.mock('mongoose', () => ({
  connect: jest.fn(),
}));

describe('connectDatabase', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    connection.isConnected = 0;
  });

  it('1. Should connect to database', async () => {
    (mongoose.connect as jest.Mock).mockResolvedValue({ connections: [{ readyState: 1 }] });
    await connectDatabase();
    expect(mongoose.connect).toBeCalled();
  });

  it('2. Should not reconnect mongodb once connected', async () => {
    connection.isConnected = 1;
    await connectDatabase();
    expect(connection.isConnected).toBe(1);
    expect(mongoose.connect).not.toHaveBeenCalled();
  });

  it('3. Should handle error', async () => {
    (mongoose.connect as jest.Mock).mockRejectedValue(new Error(''));
    try {
      await connectDatabase();
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
});
