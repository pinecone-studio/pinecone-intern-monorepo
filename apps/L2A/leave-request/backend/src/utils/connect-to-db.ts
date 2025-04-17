import { connect } from 'mongoose';

export const connectToDb = async () => {
  const MONGO_URI_ENV = process.env.MONGO_URI!
  if (!MONGO_URI_ENV) {
    throw new Error('❌ MONGO_URI is not defined in environment variables.');
  }
  try {
    await connect(process.env.MONGO_URI!);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error);
  }
};
