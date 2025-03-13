import { RegisterUserInput } from '../../generated';
import { User } from '../../models';
import bcrypt from 'bcrypt';
import { catchError, validateRegisterUserInput, generateToken } from '../../utils';

export const registerUser = async (_: unknown, { input }: { input: RegisterUserInput }) => {
  const { email, password, username } = input;
 validateRegisterUserInput(email, password);

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      throw new Error('User already exists with this email or username');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });

    const token = generateToken(user._id);

    return { user, sessionToken: token };
  } catch (error) {
    throw catchError(error);
  }
};
