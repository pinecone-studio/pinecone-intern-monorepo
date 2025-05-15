import { userModel } from '../../models';

export const deleteUser = async (_: unknown, { email }: { email: string }) => {
  try {
    const deletedUser = await userModel.deleteMany({ email: /test/i });
    return true;
  } catch (error) {
    throw new Error('failed to delete user');
  }
};
