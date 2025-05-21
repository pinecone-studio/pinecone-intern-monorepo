import { MutationResolvers } from '../../generated';
import { userModel } from '../../models';
import { catchError } from '../../utils/catch-error';

export const updateUserInfo: MutationResolvers['updateUserInfo'] = async (_, { id, email, phone }) => {
  try {
    const updatedUser = await userModel.findByIdAndUpdate(id, { email, phone }, { new: true });
    return updatedUser;
  } catch (error) {
    catchError(error);
  }
};
