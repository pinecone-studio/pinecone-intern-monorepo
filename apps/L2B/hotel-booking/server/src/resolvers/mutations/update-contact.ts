import { MutationResolvers } from '../../generated';
import { userModel } from '../../models';

export const updateContact: MutationResolvers['updateContact'] = async (_, { _id, input }) => {
  const updatedUser = await userModel.findByIdAndUpdate(_id, { $set: { ...input } }, { new: true });

  if (!updatedUser) {
    throw new Error('User not found');
  }

  return updatedUser;
};
