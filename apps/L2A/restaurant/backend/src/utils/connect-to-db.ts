import { connect } from 'mongoose';

export const connectToDb = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.log('Error: Missing MONGO_URI environment variable');
    throw new Error('MONGO_URI is required');
  }

  try {
    await connect(mongoUri);
    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.log('Error connecting to MongoDB:', error);
    throw error; 
  }
};
