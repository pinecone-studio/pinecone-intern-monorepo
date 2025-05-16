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

  console.log('updatedUser', updatedUser);

  if (!updatedUser) {
    throw new Error('User not found');
  }

  console.log('!updatedUser', !updatedUser);

  return updatedUser;
};
