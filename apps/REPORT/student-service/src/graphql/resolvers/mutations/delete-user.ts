import { MutationResolvers } from '@/graphql/generated';
import { UserModel } from '@/graphql/models';
import { GraphQLError } from 'graphql';

export const deleteUser: MutationResolvers['deleteUser'] = async (_, { _id }) => {
  try {
    const result = await UserModel.findByIdAndDelete(_id);
    if (!result) {
      throw new GraphQLError('Could not delete user');
    }
    return result;
  } catch (error) {
    throw new GraphQLError('Could not delete user');
  }
};
