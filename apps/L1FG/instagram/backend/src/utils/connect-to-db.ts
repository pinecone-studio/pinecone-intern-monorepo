import { connect } from 'mongoose';

export const connectToDb = async () => {
  await connect(process.env.MONGO_URL! as string);
  console.log('connection successful')
};
