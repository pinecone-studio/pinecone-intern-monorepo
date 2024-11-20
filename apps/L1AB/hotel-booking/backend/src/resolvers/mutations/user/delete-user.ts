import { MutationResolvers } from '../../../generated';
import { userModel } from '../../../models';

export const deleteUser: MutationResolvers['deleteUser'] = async (_: unknown, { _id }) => {
  try {
    const user = await userModel.findByIdAndDelete(_id);

    if (!user) {
      return {
        success: false,
        message: 'User not found',
      };
    }

    return {
      success: true,
      message: 'User successfully deleted',
    };
  } catch (error) {
    throw new Error(`Failed to delete user`);
  }
};
