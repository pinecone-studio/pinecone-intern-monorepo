import { connect, connection } from 'mongoose';

const databaseUri = process.env.MONGODB_URI;

export const connectToDatabase = async () => {
  if (connection.readyState === 1) {
    return;
  }
  
  try {
    await connect(databaseUri ?? '', {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log('Connected to database');
  } catch (error) {
    console.error('Error connecting to database', error);
  }
};
