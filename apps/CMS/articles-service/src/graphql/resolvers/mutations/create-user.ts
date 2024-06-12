import { GraphQLError } from 'graphql';
import { UserModel } from '@/model';

export const createUser = async (_, { input }) => {
  try {
    console.log(input);
    const user = UserModel.create(input);
    if (!user) {
      throw new GraphQLError("Couldn't create user");
    }
  } catch (error) {
    console.log(error);
    throw new GraphQLError('Create failed');
  }
};
