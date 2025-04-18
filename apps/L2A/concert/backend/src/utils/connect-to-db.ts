import { connect } from 'mongoose';

export const connectToDb = async () => {
  if (!process.env.MONGO_URI) throw new Error('NO ENV');
  await connect(process.env.MONGO_URI);
};
