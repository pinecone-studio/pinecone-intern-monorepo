import { QueryResolvers } from '../../../generated';
import { UserModel } from '../../../models';

export const getUser: QueryResolvers['getUser'] = async (_, _n, { userId }) => {
  if (!userId) throw new Error('Unauthorized');
  const user = await UserModel.findById(userId);
  return user;
};
