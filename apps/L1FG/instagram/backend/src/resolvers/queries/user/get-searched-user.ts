import { QueryResolvers } from '../../../generated';
import { UserModel } from '../../../models';

export const getSearchedUser: QueryResolvers['getSearchedUser'] = async (_, __, { userId }) => {
  const savedUserDoc = await UserModel.findOne({ _id: userId });

  const savedUseIds = savedUserDoc.savedUsers;

  const users = await UserModel.find({ _id: { $in: savedUseIds } });

  return users;
};
