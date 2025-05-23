import { userModel } from '../../models';
import { MutationResolvers } from '../../generated';
import { findUserByEmail } from '../../utils/find-user-by-email';
import { checkPassword } from '../../utils/check-password';
import { hashPassword } from '../../utils/hash-password';
import { catchError } from '../../utils/catch-error';

export const changeCurrentPassword: MutationResolvers['changeCurrentPassword'] = async (_, { currentPassword, newPassword, email }) => {
  try {
    const user = await findUserByEmail(email);

    await checkPassword(currentPassword, user.password);
    const hashed = await hashPassword(newPassword);

    const updatedUser = await userModel.findByIdAndUpdate(user.id, {
      password: hashed,
    });

    return updatedUser;
  } catch (err) {
    catchError(err);
  }
};
