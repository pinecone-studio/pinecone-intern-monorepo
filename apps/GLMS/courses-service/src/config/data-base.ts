import { connect } from 'mongoose';

export const connectDataBase = async () => {
  const databaseUri = process.env.MONGODB_URI;
  try {
    if (!databaseUri) {
      return;
    }
    await connect(databaseUri);
  } catch (error: unknown) {
    throw new Error('unsuccess');
  }
};
