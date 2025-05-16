import { MutationResolvers } from '../../generated';
import { userModel } from '../../models';

export const updateContact: MutationResolvers['updateContact'] = async (_, { _id, phone, email, emergencyPhone, relation }) => {
  const updatedUser = await userModel.findByIdAndUpdate(
    _id,
    {
      $set: {
        phone,
        email,
        emergencyPhone,
        relation,
      },
    },
    { new: true }
  );

  if (!updatedUser) {
    throw new Error('User not found');
  }

  return updatedUser;
};
