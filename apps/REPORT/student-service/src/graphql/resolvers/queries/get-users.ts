import { UserModel } from '@/graphql/models/user.models';
import { GraphQLError } from 'graphql';

export const getUsers = async () => {
  try {
    const results = await UserModel.find();
    if (!results) {
      throw new GraphQLError('can not find users');
    }
    return results;
  } catch (error) {
    throw new GraphQLError('can not find users');
  }
};
