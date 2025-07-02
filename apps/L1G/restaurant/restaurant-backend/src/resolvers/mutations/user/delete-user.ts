import { MutationResolvers } from 'src/generated';
import { UserModel } from 'src/models/user.model';

export const deleteUser: MutationResolvers['deleteUser'] = async (_, { userId }) => {
  const deletedUser = await UserModel.findByIdAndDelete(userId);

  if (!deletedUser) {
    throw new Error(`User with ID ${userId} not found`);
  }

  return deletedUser;
};
