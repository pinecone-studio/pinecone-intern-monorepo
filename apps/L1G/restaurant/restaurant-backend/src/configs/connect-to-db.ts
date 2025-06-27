import { connect } from 'mongoose';

const databaseUri = process.env.MONGO_URI;

export const connectToDatabase = async () => {
  try {
    await connect(databaseUri ?? '');

    console.log('Connected to database');
  } catch (error) {
    console.error('Error connecting to database', error);
  }
};
