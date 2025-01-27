import { QueryResolvers } from '../../../generated';
import { UserModel } from '../../../models';

export const getUserTogether: QueryResolvers['getUserTogether'] = async (_, { searchingUserId }, { userId }) => {
  if (!userId) throw new Error('Unauthorized');
  const searchingUser = await UserModel.findById(searchingUserId);
  const viewer = await UserModel.findById(userId);
  return {
    user: searchingUser,
    viewer: viewer,
  };
};
