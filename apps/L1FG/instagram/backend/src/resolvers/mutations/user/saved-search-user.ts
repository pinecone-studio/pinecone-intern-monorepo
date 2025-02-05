import { MutationResolvers } from '../../../generated';
import { UserModel } from '../../../models';

export const savedSearchUser: MutationResolvers['savedSearchUser'] = async (_, { searchedUserId }, { userId }) => {
  const existSearchedUser = await UserModel.findOne({ savedUsers: { $in: [searchedUserId] } });

  if (!existSearchedUser) {
    const updatedUser = await UserModel.findOneAndUpdate({ _id: userId }, { $push: { savedUsers: { $each: [searchedUserId], $position: 0 } } }, { new: true });

    // if (updatedUser.savedUsers.length >= 10) {
    //   await UserModel.updateOne({ _id: userId }, { $pop: { savedUsers: 1 } });
    // }

    return updatedUser;
  }
};
