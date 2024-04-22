
import { connect } from 'mongoose';



export const connectToDatabase = async () => {
  const databaseUri = process.env.MONGODB_URI;
  console.log(databaseUri)
  try {
    if (!databaseUri) {
      return;
    }
    await connect(databaseUri);
  } catch (error) {
    throw new Error('connection failed');
  }
};
