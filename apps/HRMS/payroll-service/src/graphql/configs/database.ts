import dotenv from 'dotenv';
import { connect } from 'mongoose';

dotenv.config();

export const connectDataBase = async () => {
  const DatabaseUri = process.env.MONGO_ENDPOINT;
  try {
    if (!DatabaseUri) {
      return;
    }
    await connect(DatabaseUri);
  } catch (err) {
    throw new Error(`Connection failed ${err}`);
  }
};
