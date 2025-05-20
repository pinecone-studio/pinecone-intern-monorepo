import { MutationResolvers } from '../../generated';
import { userModel } from '../../models';
import { hashPassword } from '../../utils/auth';

export const updatePassword: MutationResolvers['updatePassword'] = async (_, { _id, password }) => {
  const hashedPassword = await hashPassword(password);

  const updatedUser = await userModel.findByIdAndUpdate(_id, { $set: { password: hashedPassword } }, { new: true });

  if (!updatedUser) throw new Error('User not found');

  return updatedUser;
};
