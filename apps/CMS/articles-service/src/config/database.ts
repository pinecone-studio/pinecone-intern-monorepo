import { connect } from 'mongoose';

export const connectDB = async () => {
  const databaseUri = process.env.MONGODB_URI;
  try {
    if (!databaseUri) {
      return;
    }
    await connect(databaseUri);
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw new Error(`connection failed`);
  }
};
