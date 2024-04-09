import { connect } from 'mongoose';

export const connectToDatabase = async () => {
  const databaseUri = process.env.MONGODB_URI;
  try {
    if (!databaseUri) {
      return;
    }
    await connect(databaseUri);
    console.log("connect database");
  } catch (error) {
    throw new Error('connection failed');
  }
};
