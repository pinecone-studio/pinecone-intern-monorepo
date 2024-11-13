import { QueryResolvers } from '../../../generated';
import { userModel } from '../../../models';

export const getUserById: QueryResolvers['getUserById'] = async (_, { _id }) => {
  const user = await userModel.findById(_id);

  if (!user) {
    throw new Error('There is no user with this ID');
  }
  return user;
};
