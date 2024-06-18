import { UserModel } from '@/graphql/models/user.models';
import { GraphQLError } from 'graphql';

export const updateUser = async (_, { id, input }) => {
  try {
    const result = await UserModel.findByIdAndUpdate(id, input, { new: true });
    if (!result) {
      throw new GraphQLError('failed to update user');
    }
    return result;
  } catch (error) {
    throw new GraphQLError('failed to update user');
  }
};
