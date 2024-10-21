import { connect } from 'mongoose';

export const connectToDb = async () => {
  console.log(process.env.MONGO_URI);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  await connect(process.env.MONGO_URI!);
};
