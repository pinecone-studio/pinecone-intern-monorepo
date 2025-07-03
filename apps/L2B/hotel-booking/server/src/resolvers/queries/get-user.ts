import { QueryResolvers } from '../../generated';
import { userModel } from '../../models';

export const getUser: QueryResolvers['getUser'] = async (_, { _id }) => {
  const user = await userModel.findById(_id);

  if (!user) {
    throw new Error('User not found');
  }
  return user;
};
