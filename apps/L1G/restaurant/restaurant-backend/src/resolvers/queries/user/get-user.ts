import { QueryResolvers } from '../../../generated';
import { UserModel } from 'src/models/user.model';

export const getUser: QueryResolvers['getUser'] = async (_, { input: { userId } }) => {
  const user = await UserModel.findById(userId);

  if (!user) {
    throw new Error(`User with ${userId} Id is not found`);
  }

  return user;
};
