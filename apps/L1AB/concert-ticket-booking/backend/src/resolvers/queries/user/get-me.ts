import { QueryResolvers } from '../../../generated';
import { userModel } from '../../../models';

export const getMe: QueryResolvers['getMe'] = async (_, __, { user }) => {
  if (!user?.userId) {
    throw new Error('Unauthorized: No user found in context.');
  }

  const userId = await userModel.findById(user.userId);

  if (!userId) throw new Error('User not found.');
  return userId;
};
