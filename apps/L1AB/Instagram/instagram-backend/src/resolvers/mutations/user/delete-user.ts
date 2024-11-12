import { MutationResolvers } from '../../../generated';
import { userModel } from '../../../models';

export const deleteUser: MutationResolvers['deleteUser'] = async (_, { _id }) => {
  const user = await userModel.findByIdAndDelete(_id);

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};
