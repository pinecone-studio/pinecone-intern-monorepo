import { connectDatabase, connection } from '@/config/connect-database';
import { connect } from 'mongoose';

jest.mock('mongoose', () => ({
  connect: jest.fn(),
}));

describe('Database Connection Tests', () => {
  beforeEach(() => {
    connection.isConnected = 0;
    jest.clearAllMocks();
  });

  it('should establish a database connection when not already connected', async () => {
    (connect as jest.Mock).mockResolvedValue({
      connections: [{ readyState: 1 }],
    });

    await connectDatabase();

    expect(connect).toHaveBeenCalled();
    expect(connection.isConnected).toBe(1);
  });

  it('should not attempt to connect if already connected', async () => {
    connection.isConnected = 1;

    await connectDatabase();

    expect(connect).not.toHaveBeenCalled();
  });

  it('should throw an error if the connection fails', async () => {
    (connect as jest.Mock).mockRejectedValue(new Error('Failed to connect'));
    connection.isConnected = 0;

    await expect(connectDatabase()).rejects.toThrow('Failed to connect to database');

    expect(connect).toHaveBeenCalled();
  });
});
