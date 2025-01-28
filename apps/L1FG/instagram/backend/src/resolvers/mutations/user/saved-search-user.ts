import { MutationResolvers } from '../../../generated';
import { UserModel } from '../../../models';

export const savedSearchUser: MutationResolvers['savedSearchUser'] = async (_, { searchedUserId }, { userId }) => {
  const existSearchedUser = await UserModel.findOne({ savedUsers: { $in: [searchedUserId] } });

  if (!existSearchedUser) {
    const savedUser = await UserModel.findOneAndUpdate({ _id: userId }, { $push: { savedUsers: searchedUserId } }, { new: true });
    return savedUser;
  }
};
