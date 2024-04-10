import { connect } from 'mongoose';
import dotenv from 'dotenv';



export const connectToDatabase = async () => {
  const databaseUri = process.env.MONGODB_URI;
  // console.log('check');
  // console.log(databaseUri);
  try {
    if (!databaseUri) {
      console.log(process.env.MONGODB_URI)
      return;
    }
    await connect(databaseUri);
    console.log("connected")
  } catch (error) {
    throw new Error('connection failed');
  }
};
