import { connectToDb } from '../../src/utils';
import { connect } from 'mongoose';

jest.mock('mongoose', () => ({
  connect: jest.fn(),
}));

describe('connectToDb', () => {
  it('should log a success message if the connection is successful', async () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation();
    (connect as jest.Mock).mockResolvedValue(undefined);

    await connectToDb();

    expect(logSpy).toHaveBeenCalledWith('✅ MongoDB connected successfully!');
    logSpy.mockRestore();
  });

  it('should log an error message if the connection fails', async () => {
    const errorLogSpy = jest.spyOn(console, 'error').mockImplementation();
    const mockError = new Error('Connection error');
    (connect as jest.Mock).mockRejectedValue(mockError);

    await connectToDb();

    expect(errorLogSpy).toHaveBeenCalledWith('❌ Failed to connect to MongoDB:', mockError);
    errorLogSpy.mockRestore();
  });
});