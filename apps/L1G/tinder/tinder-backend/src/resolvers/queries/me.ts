import { QueryResolvers } from 'src/generated';
import { Usermodel } from 'src/models/user';

export const getMe: QueryResolvers['getMe'] = async (_parent, _args, context, _info) => {
  const userId = context.userId;

  if (!userId) {
    throw new Error('Not authenticated');
  }

  const user = await Usermodel.findById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};
