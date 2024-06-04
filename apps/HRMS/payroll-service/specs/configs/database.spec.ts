import { connectDataBase } from '@/graphql/configs/database';
import { connect } from 'mongoose';

jest.mock('mongoose', () => ({
  connect: jest.fn(),
}));

describe('Database connection check', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should connect to the database when URI is provided', async () => {
    const mockURI = 'mock-uri';
    process.env.MONGO_ENDPOINT = mockURI;

    await connectDataBase();

    expect(connect).toHaveBeenCalledWith(mockURI);
    expect(connect).toHaveBeenCalledTimes(1);
  });

  it('should not connect to the database when URI is not provided', async () => {
    delete process.env.MONGO_ENDPOINT;

    await connectDataBase();

    expect(connect).not.toHaveBeenCalled();
  });

  it('should throw an error when connection fails', async () => {
    const mockURI = 'mock-uri';
    const mockError = new Error('Connection failed');
    process.env.MONGO_ENDPOINT = mockURI;
    (connect as jest.Mock).mockRejectedValue(mockError);

    await expect(connectDataBase()).rejects.toThrowError('Connection failed');
  });
});
