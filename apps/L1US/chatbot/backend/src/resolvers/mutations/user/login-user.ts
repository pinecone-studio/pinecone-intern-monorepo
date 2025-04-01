import bcrypt from 'bcryptjs';
import { UserModel } from '../../../models';
import { catchError, generateToken } from '../../../utils';
import { MutationResolvers, User } from '../../../generated';

export const loginUser: MutationResolvers['loginUser'] = async (_, { input }) => {
  const { email, password } = input;

  try {
    const user = await UserModel.findOne<User>({ email });
    if (!user) {
      throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Incorrect password!');
    }
    const sessionToken = generateToken(user._id);

    return { user, sessionToken };
  } catch (err) {
    throw catchError(err);
  }
};
