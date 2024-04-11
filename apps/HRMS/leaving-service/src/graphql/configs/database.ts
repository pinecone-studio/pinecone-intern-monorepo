import mongoose from 'mongoose';

export const connectDataBase = async () => {
  try {
    const MONGODB_URL: string = process.env.MONGODB_URI || '';
    await mongoose.connect(MONGODB_URL);
  } catch (error: unknown) {
    console.log(error, 'Database connection error');
  }
};
