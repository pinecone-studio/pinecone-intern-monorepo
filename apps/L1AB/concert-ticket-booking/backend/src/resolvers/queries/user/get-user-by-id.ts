import { QueryResolvers } from '../../../generated';
import { userModel } from '../../../models';

export const getUserById: QueryResolvers['getUserById'] = async (_, { _id }) => {
  const userId = await userModel.findById(_id);

  if (!userId) throw new Error('userId not found');
  return userId;
};
