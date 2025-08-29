import { MutationResolvers } from 'src/generated';

import bcrypt from 'bcryptjs';
import { UserModel } from 'src/models/user.model';
import jwt from 'jsonwebtoken';

export const signIn: MutationResolvers['signIn'] = async (_, { input: { email, password } }) => {
  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new Error(`User with ${email} email is not found`);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign({ user: user }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '1d',
  });

  return { token, user };
};
