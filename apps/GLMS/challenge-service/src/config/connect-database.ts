import mongoose from 'mongoose';

export const connectDatabase = async () => {
  const databaseUri = process.env.MONGODB_URI;
  try {
    await mongoose.connect(databaseUri || '');
    console.log('Connection successful');
  } catch (error) {
    console.log(error);
  }
};
