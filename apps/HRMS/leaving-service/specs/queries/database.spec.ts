import { connectDataBase } from '@/graphql/configs/database';
import mongoose from 'mongoose';

describe('Database Connection', () => {
  beforeAll(async () => {
    await connectDataBase();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should connect to the database successfully', () => {
    expect(mongoose.connection.readyState).toBe(1);
  });

  it('should throw an error if unable to connect to the database', async () => {
    const originalEnv = process.env.MONGODB_URI;
    process.env.MONGODB_URI = '';

    await expect(connectDataBase()).rejects.toThrow('Database cannot connect');

    process.env.MONGODB_URI = originalEnv;
  });
});
