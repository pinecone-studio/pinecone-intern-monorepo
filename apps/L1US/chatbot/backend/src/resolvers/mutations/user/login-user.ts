import { MutationResolvers } from '../../../generated';
import { User } from '../../../models';
import bcrypt from 'bcrypt';
import { catchError, generateToken } from '../../../utils';

export const loginUser: MutationResolvers['loginUser'] = async (_, { input }) => {
  const { email, password } = input;
  try {
    const user = await User.findOne({ email });
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
