import { MutationResolvers } from '../../../generated';
import { UserModel } from '../../../models';

export const deleteUser: MutationResolvers['deleteUser'] = async (_, { _id }) => {
  const user = await UserModel.findByIdAndDelete(_id);

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};
