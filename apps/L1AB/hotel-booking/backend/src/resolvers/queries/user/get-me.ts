import { QueryResolvers } from '../../../generated';
import { userModel } from '../../../models';

export const getMe: QueryResolvers['getMe'] = async (_, __, { user }) => {
  if (!user.user) {
    throw new Error('Unauthorized: No user found in context.');
  }

  const userId = await userModel.findById(user.user);

  if (!userId) throw new Error('User not found.');
  return userId;
};
