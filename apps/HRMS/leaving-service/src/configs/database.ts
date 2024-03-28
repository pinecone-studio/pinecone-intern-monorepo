import mongoose, { connect } from 'mongoose';

// const databaseUrl = process.env.MONGODB_URL;

export const connectToDatabase = async () => {
  try {
    await mongoose.connect('mongodb+srv://sara:sarangoo@clusters.z54htmq.mongodb.net/graphqlTest?retryWrites=true&w=majority');

    console.log('Connected to database GRAPHQL');
  } catch (error) {
    console.error('Error connecting to database', error);
  }
};
