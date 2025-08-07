import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectToDB = async (): Promise<void> => {
  if (mongoose.connection.readyState !== 1) {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }

    try {
      await mongoose.connect(mongoURI);
      console.log('MongoDB connected successfully');
    } catch (error) {
      const err = error as Error;
      console.error('Failed to connect to MongoDB:', err.message);
      process.exit(1);
    }
  } else {
    console.log('MongoDB is already connected');
  }
};

export default connectToDB;
