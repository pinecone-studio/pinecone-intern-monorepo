import { MutationResolvers } from '../../../generated';
import { userModel } from '../../../models';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const signUpUser: MutationResolvers['signUpUser'] = async (_, { input }) => {
  const { email, password, phone } = input;

  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    throw new Error('User with this email already exists');
  }
  const existingPhone = await userModel.findOne({ phone });
  if (existingPhone) {
    throw new Error('User with this phone already exists');
  }

  try {
    const saltRounds = parseInt(process.env.SALTROUNDS as string, 10);
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);

    const newUser = await userModel.create({ ...input, password: hash });

    const token = jwt.sign(
      {
        userId: newUser._id,
      },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );

    return {
      user: newUser,
      token,
    };
  } catch (error) {
    throw new Error('Error during user signup');
  }
};
