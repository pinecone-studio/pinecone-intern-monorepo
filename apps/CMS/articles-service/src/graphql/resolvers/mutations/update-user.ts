import { GraphQLError } from 'graphql';
import { UserModel } from '@/model';

export const updateUser = async (_, { id, input }) => {
  try {
    console.log(`User succesfully updated`);
    const editUser = UserModel.updateOne({ id }, input);
    if (!editUser) {
      throw new GraphQLError("Couldn't update user");
    }
    return editUser;
  } catch (error) {
    console.log(error);
    throw new GraphQLError('Update failed');
  }
};
