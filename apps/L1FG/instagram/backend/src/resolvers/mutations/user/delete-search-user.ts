import { MutationResolvers } from '../../../generated';
import { UserModel } from '../../../models';

export const deleteSearchUser: MutationResolvers['deleteSearchUser'] = async (_, { searchedUserId }, { userId }) => {
  const updateUser = await UserModel.findByIdAndUpdate({ _id: userId }, { $pull: { savedUsers: searchedUserId } });

  return updateUser;
};
