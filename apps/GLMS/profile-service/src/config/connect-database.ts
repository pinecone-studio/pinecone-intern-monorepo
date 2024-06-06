import { connect } from 'mongoose';

export const connectToDatabase = async () => {
  const databaseUri = process.env.MONGODB_URI;

  try {
    if (!databaseUri) {
      console.log('MONGODB_URI environment variable not found. Please set it to your MongoDB connection string.');
      return;
    }
    await connect(databaseUri);
    console.log('Connected to MongoDB database successfully!');
  } catch (error) {
    if (error instanceof Error) {
      console.log('Connection failed:', error.message);
    } else {
      console.log('Unexpected error:', error);
    }
    throw error;
  }
};
