import { connect } from 'mongoose';

export const connectToDatabase = async () => {
  const databaseUri = process.env.MONGODB_URI;

  try {
    if (!databaseUri) {
      console.error('MONGODB_URI environment variable not found. Please set it to your MongoDB connection string.');
      return;
    }
    await connect(databaseUri);
    console.log('Connected to MongoDB database successfully!');
  } catch (error: any) {
    console.error('Connection failed:', error.message);
    throw error;
  }
};
