import mongoose from 'mongoose';

const connectDataBase = async () => {
  try {
    await mongoose.connect('mongodb+srv://Munkhjin:99279353Aa!@cluster0.dhvxd3q.mongodb.net/test1?retryWrites=true&w=majority');
  } catch (error: unknown) {
    console.log(error);
    throw new Error('unsuccess');
  }
};
export { connectDataBase };
