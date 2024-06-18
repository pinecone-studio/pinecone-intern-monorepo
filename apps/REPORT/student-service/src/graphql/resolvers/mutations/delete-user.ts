import { UserModel } from '@/graphql/models/user.models';
import { GraphQLError } from 'graphql';

export const deleteUser = async (_, { _id }) => {
  try {
    const result = await UserModel.findByIdAndDelete(_id);
    if (!result) {
      throw new GraphQLError("Couldn't find specific user");
    }
  } catch (error) {
    throw new GraphQLError('Internal System Error');
  }
};
