import { MutationResolvers } from '../../../generated';
import { UserModel } from '../../../models';

export const updateNumberUser: MutationResolvers['updateNumberUser'] = async (_, { input }) => {
  const { _id, newPhoneNumber } = input;

  if (!/^\d{8}$/.test(newPhoneNumber)) {
    throw new Error('Phone number must be exactly 8 digits and contain only numbers');
  }

  const user = await UserModel.findByIdAndUpdate(_id, { phoneNumber: newPhoneNumber }, { new: true });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};
