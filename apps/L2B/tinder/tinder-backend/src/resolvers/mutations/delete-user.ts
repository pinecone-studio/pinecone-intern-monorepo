import { userModel } from '../../models';

export const deleteUser = async () => {
  try {
    await userModel.deleteMany({ email: /test/i });
    return true;
  } catch (error) {
    throw new Error('failed to delete user');
  }
};
