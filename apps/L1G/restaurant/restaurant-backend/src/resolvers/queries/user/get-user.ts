import { QueryResolvers } from '../../../generated';
import { UserModel } from 'src/models/user.model';

export const getUser: QueryResolvers['getUser'] = async (_, { _id }) => {
  const user = await UserModel.findById(_id);

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};
