import { QueryResolvers } from '../../../generated';
import { UserModel } from '../../../models';

export const getUsers: QueryResolvers['getUsers'] = async (_, __, { userId }) => {
  if (!userId) throw new Error('Unauthorized');
  const users = await UserModel.find();
  return users;
};
