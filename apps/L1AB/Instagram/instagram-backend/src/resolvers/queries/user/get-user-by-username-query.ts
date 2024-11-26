import { QueryResolvers } from '../../../generated';
import { userModel } from '../../../models';

export const getUserByUsername: QueryResolvers['getUserByUsername'] = async (_, { username }) => {
  const user = await userModel.findOne({ username });

  if (!user) {
    throw new Error('There is no user with this username');
  }
  return user;
};
