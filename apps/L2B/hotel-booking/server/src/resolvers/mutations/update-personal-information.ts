import { MutationResolvers } from '../../generated';
import { userModel } from '../../models';

export const updatePersonalInformation: MutationResolvers['updatePersonalInformation'] = async (_, { _id, firstName, lastName, birth }) => {
  const updatedUser = await userModel.findByIdAndUpdate(
    _id,
    {
      $set: {
        firstName,
        lastName,
        birth,
      },
    },
    { new: true }
  );

  if (!updatedUser) {
    throw new Error('User not found');
  }

  return updatedUser;
};
