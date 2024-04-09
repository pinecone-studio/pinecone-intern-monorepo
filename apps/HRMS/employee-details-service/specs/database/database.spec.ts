import { connectDB } from '../../src/config/database';
import mongoose from 'mongoose';

jest.mock('mongoose', () => ({
  connect: jest.fn(),
}));

describe('Database connection check', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('1. should call connectDB', async () => {
    (mongoose.connect as jest.Mock).mockResolvedValue({ connections: [{ readyState: 1 }] });
    await connectDB();
    expect(mongoose.connect).toBeCalled();
  });

  it('2. should handle error', async () => {
    (mongoose.connect as jest.Mock).mockRejectedValue(new Error('error'));
    try {
      await connectDB();
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
});

describe('Database url null check', () => {
  beforeAll(() => {
    process.env = { ...process.env, MONGODB_URI: undefined };
  });

  afterAll(() => {
    process.env = { ...process.env };
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('1. should return when data base url is undefined', async () => {
    await connectDB();
  });
});
