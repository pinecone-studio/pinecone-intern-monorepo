import { connect } from 'mongoose';

export const connectDB = async () => {
  const databaseUri = process.env.MONGODB_URI;
  try {
    if (!databaseUri) {
      return;
    }
    await connect(databaseUri);
    console.log("connect");

  } catch (error) {
    throw new Error('connection failed');
  }
};
