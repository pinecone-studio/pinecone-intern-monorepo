import { QueryResolvers } from '../../../generated';
import { userModel } from '../../../models';

export const getMe: QueryResolvers['getMe'] = async (_, __, { user }) => {
  if (!user.userId) {
    throw new Error('error');
  }
  const userRecord = await userModel.findById(user.userId);

  if (!userRecord) {
    throw new Error('User not found.');
  }

  return userRecord;
};
