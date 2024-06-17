import { UserModel } from '@/graphql/models/user.models';
import { GraphQLError } from 'graphql';

export const createUser = async (_, { input }) => {
  try {
    const result = await UserModel.create(input);
    return result;
  } catch (error) {
    throw new GraphQLError('there was a problem creating a new user');
  }
};
