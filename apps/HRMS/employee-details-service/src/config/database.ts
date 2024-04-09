import { connect } from 'mongoose';

export const connectDB = async () => {
  const databaseUri = process.env.MONGODB_URI;
  try {
    if (!databaseUri) {
      return;
    }
    console.log("connect db");

    await connect(databaseUri);
  } catch (error) {
    throw new Error('connection failed');
  }
};
