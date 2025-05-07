import { MutationResolvers } from '../../generated';
import { userModel } from '../../models';
import { catchError } from '../../utils/catch-error';
import { checkPassword } from '../../utils/check-password';
import { findUserById } from '../../utils/find-user-by-id';

export const updateUserInfo: MutationResolvers['updateUserInfo'] = async (_, { id, email, password, phone }) => {
  try {
    if (!password) {
      throw new Error('Нууц үг оруулна уу!');
    }
    const user = await findUserById(id);
    await checkPassword(password, user.password);
    const updatedUser = await userModel.findByIdAndUpdate(id, { email, phone }, { new: true });
    return updatedUser;
  } catch (error) {
    catchError(error);
  }
};
