import { QueryResolvers } from '../../generated';
import { userModel } from '../../models';

export const getAllUsers: QueryResolvers['getAllUsers'] = async () => {
  const users = await userModel.find({});

  if (!users.length) {
    throw new Error('There is no user');
  }
  return users;
};
