import { connect } from 'mongoose';

export const connectDataBase = async () => {
  const DatabaseUri = process.env.MONGODB_URI;
  try {
    if (!DatabaseUri) {
      return;
    }
    await connect(DatabaseUri);
  } catch (error) {
    throw new Error('connection failed');
  }
};
