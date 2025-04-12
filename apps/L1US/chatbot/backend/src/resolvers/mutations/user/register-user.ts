import bcrypt from 'bcryptjs';
import { UserModel } from '../../../models';
import { catchError, generateToken, validateRegisterUserInput } from '../../../utils';
import { MutationResolvers, User } from '../../../generated';

export const registerUser: MutationResolvers['registerUser'] = async (_, { input }) => {
  const { email, password, username } = input;

  validateRegisterUserInput(email, password);

  try {
    const existingUser = await UserModel.findOne<User>({ $or: [{ email }, { username }] });
    if (existingUser) {
      throw new Error('User already exists with this email or username!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({ username, email, password: hashedPassword });

    const token = generateToken(user._id);

    return { user, sessionToken: token };
  } catch (error) {
    throw catchError(error);
  }
};
