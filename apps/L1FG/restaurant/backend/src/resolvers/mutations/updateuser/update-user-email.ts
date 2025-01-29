import { MutationResolvers } from '../../../generated';
import { UserModel } from '../../../models';

export const updateEmailUser: MutationResolvers['updateEmailUser'] = async (_, { input }) => {
  const { _id, newEmail } = input;

  const user = await UserModel.findByIdAndUpdate(_id, { email: newEmail }, { new: true });
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};
