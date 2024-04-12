import { connect } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDataBase = async () => {
  const DatabaseUri = process.env.MONGODB_URI;
  try {
    if (!DatabaseUri) {
      return;
    }
    await connect(DatabaseUri);
  } catch (error) {
    throw new Error('Connection failed');
  }
};
