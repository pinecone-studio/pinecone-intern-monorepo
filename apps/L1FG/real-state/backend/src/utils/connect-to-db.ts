import { connect } from 'mongoose';

export const connectToDb = async () => {
  await connect(process.env.MONGO_URI!);
};

export const JWT_SECRET = '85ce9b7e20c2d1d0c4ab7e239a2866d1398926c18fe6a92af7263d93d68438f3';
