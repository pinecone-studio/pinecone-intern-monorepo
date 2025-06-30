import { MutationResolvers } from 'src/generated';
import { UserModel } from 'src/models/user.model';

export const deleteUser: MutationResolvers['deleteUser'] = async (_, { input: { userId } }) => {
  const deletedUser = await UserModel.findOneAndDelete({ userId }, { new: true });

  return deletedUser;
};
