import { connectDataBase } from '@/graphql/configs/database';
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

  it('1. should call connectDataBase', async () => {
    (mongoose.connect as jest.Mock).mockResolvedValue({ connections: [{ readyState: 1 }] });
    await connectDataBase();
    expect(mongoose.connect).toBeCalled();
  });

  it('2. should handle error', async () => {
    (mongoose.connect as jest.Mock).mockRejectedValue(new Error('error'));
    try {
      await connectDataBase();
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
    await connectDataBase();
  });
});
