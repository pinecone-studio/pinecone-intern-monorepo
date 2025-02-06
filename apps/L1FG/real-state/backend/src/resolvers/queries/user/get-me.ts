import { QueryResolvers } from '../../../generated';
import { UserModel } from '../../../models';

export const getMe: QueryResolvers['getMe'] = async (_, __, { userId }) => {
  if (!userId) throw new Error('Зөвшөөрөлгүй');

  const user = await UserModel.findById(userId);

  return user;
};
