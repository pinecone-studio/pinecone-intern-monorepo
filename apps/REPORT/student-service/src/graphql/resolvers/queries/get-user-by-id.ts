import { QueryResolvers } from '@/graphql/generated';
import { UserModel } from '@/graphql/models';
import { GraphQLError } from 'graphql';

export const getUserById: QueryResolvers['getUserById'] = async (_, { _id }) => {
  try {
    const user = await UserModel.findById(_id);

    if (!user) {
      throw new GraphQLError('User not found');
    }

    return user;
  } catch (err) {
    throw new GraphQLError('User not found');
  }
};
