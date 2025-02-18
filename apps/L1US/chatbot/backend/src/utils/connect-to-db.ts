import { connect } from 'mongoose';

const MONGO_URI = process.env.MONGO_URI as string;

export const connectToDb = async () => {
  try {
    await connect(MONGO_URI);
    console.log('✅ MongoDB connected successfully!');
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error);
  }
};
