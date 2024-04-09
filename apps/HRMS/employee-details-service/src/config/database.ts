import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const connectToDatabase = async () => {
  try {
    const mongoUri: string = process.env.MONGODB_URI ?? '';
    await mongoose.connect(mongoUri);
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to database:', error);
  }
};

export const disconnectFromDatabase = async () => {
  try {
    await mongoose.disconnect();
  } catch (error) {
    throw new Error('Error disconnecting from database');
  }
};
