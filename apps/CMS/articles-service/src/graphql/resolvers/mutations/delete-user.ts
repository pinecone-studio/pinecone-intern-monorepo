import { GraphQLError } from 'graphql';
import { UserModel } from '@/model';

export const deleteUser = async (_, { _id }) => {
  try {
    console.log(`User succesfully deleted`);
    const deleteUser = UserModel.deleteOne({ _id });
    if (!deleteUser) {
      throw new GraphQLError("Couldn't delete user");
    }
    return deleteUser;
  } catch (error) {
    console.log(error);
    throw new GraphQLError('Delete failed');
  }
};
