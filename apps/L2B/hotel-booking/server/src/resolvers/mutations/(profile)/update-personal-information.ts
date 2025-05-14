import { MutationResolvers } from '../../../generated';
import { userModel } from '../../../models';

export const updatePersonalInformation: MutationResolvers['updatePersonalInformation'] = async (_, { _id, firstName, lastName, birth }) => {
  try {
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
  } catch (error: unknown) {
    const err = error as Error;
    throw new Error(err.message || 'Failed to update user info');
  }
};
